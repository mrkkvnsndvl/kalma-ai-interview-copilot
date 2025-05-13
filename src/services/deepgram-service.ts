const deepgramUrl =
  "wss://api.deepgram.com/v1/listen?model=nova-3&language=en&smart_format=false&filler_words=true&punctuate=true&interim_results=true";
const deepgramApiKey = import.meta.env.WXT_DEEPGRAM_API_KEY;

export const deepgramService = async (
  streamId: string,
  onTranscript: (transcript: string, isFinal?: boolean) => void
) => {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: streamId,
        },
      } as MediaTrackConstraints,
    });

    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(audioContext.destination);

    const socket = new WebSocket(deepgramUrl, ["token", deepgramApiKey]);

    socket.onopen = () => {
      console.log("Connected");
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      mediaRecorder.ondataavailable = async (event: BlobEvent) => {
        if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
          const arrayBuffer = await event.data.arrayBuffer();
          socket.send(arrayBuffer);
        }
      };
      mediaRecorder.start(1000);
    };

    socket.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        const transcript = data?.channel?.alternatives?.[0]?.transcript;
        const isFinal: boolean = data?.is_final;
        console.log(transcript);
        if (transcript) {
          onTranscript(transcript, isFinal);
        }
      } catch (error) {
        console.error(error);
      }
    };
  } catch (error) {
    console.error("Disconnected");
  }
};
