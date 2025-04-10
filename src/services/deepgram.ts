export const startDeepgramTranscription = async (
  apiKey: string,
  onTranscript: (text: string) => void,
  onError: (error: Error) => void
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
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
