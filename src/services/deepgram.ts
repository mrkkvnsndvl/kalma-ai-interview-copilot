const DEEPGRAM_API_URL =
  "wss://api.deepgram.com/v1/listen?model=nova-3&language=en&smart_format=false&filler_words=true&punctuate=true&interim_results=true";
const DEEPGRAM_TOKEN = import.meta.env.WXT_DEEPGRAM_API_KEY;

export async function startDeepgramCapture(
  streamId: string,
  onTranscription: (transcript: string, isFinal: boolean) => void
): Promise<void> {
  try {
    const audioStream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: streamId,
        },
      } as any,
    });
    const audioContext = new AudioContext();
    const sourceNode = audioContext.createMediaStreamSource(audioStream);
    sourceNode.connect(audioContext.destination);
    if (!MediaRecorder.isTypeSupported("audio/webm")) {
      console.error("MediaRecorder type 'audio/webm' is not supported.");
      return;
    }
    const mediaRecorder = new MediaRecorder(audioStream, {
      mimeType: "audio/webm",
    });
    const dgSocket = new WebSocket(DEEPGRAM_API_URL, ["token", DEEPGRAM_TOKEN]);
    dgSocket.onopen = () => {
      mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => {
        if (event.data.size && dgSocket.readyState === WebSocket.OPEN) {
          dgSocket.send(event.data);
        }
      });
      mediaRecorder.start(1000);
    };
    dgSocket.onmessage = (message: MessageEvent) => {
      try {
        const data = JSON.parse(message.data);
        const transcript = data?.channel?.alternatives?.[0]?.transcript || "";
        if (transcript) {
          onTranscription(transcript, data.is_final);
        }
      } catch (error) {
        console.error("Error parsing Deepgram message:", error);
      }
    };
    dgSocket.onerror = (error) => {
      console.error("Deepgram WebSocket error:", error);
    };
  } catch (err) {
    console.error("Deepgram capture failed:", err);
  }
}
