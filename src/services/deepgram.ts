export const deepgram = async (
  apiKey: string,
  onTranscript: (text: string) => void,
  onError: (error: Error) => void
) => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: {
        autoGainControl: false,
        echoCancellation: false,
        noiseSuppression: false,
      },
    });

    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0) {
      throw new Error("No audio track found in the screen share");
    }

    const audioStream = new MediaStream(audioTracks);

    const mediaRecorder = new MediaRecorder(audioStream, {
      mimeType: "audio/webm",
    });

    const socket = new WebSocket(
      "wss://api.deepgram.com/v1/listen?model=nova-3&language=en&smart_format=true",
      ["token", apiKey]
    );

    mediaRecorder.ondataavailable = async (event) => {
      if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
        socket.send(await event.data.arrayBuffer());
      }
    };

    socket.onmessage = (event) => {
      try {
        const transcript = JSON.parse(event.data).channel?.alternatives?.[0]
          ?.transcript;
        transcript && onTranscript(transcript);
      } catch (error) {
        onError(new Error("Failed to parse transcript"));
      }
    };

    socket.onopen = () => mediaRecorder.start(250);

    return () => {
      mediaRecorder.stop();
      socket.close();
      stream.getTracks().forEach((track) => track.stop());
    };
  } catch (error) {
    onError(error as Error);
    return () => {};
  }
};
