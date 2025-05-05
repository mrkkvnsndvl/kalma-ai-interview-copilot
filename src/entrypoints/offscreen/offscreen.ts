import { browser } from "#imports";

let currentStream: MediaStream | null = null;
let mediaRecorder: MediaRecorder | null = null;
let dgSocket: WebSocket | null = null;
let output: AudioContext | null = null;

browser.runtime.onMessage.addListener(async (msg) => {
  if (msg.type !== "offscreen-start-capture") return;
  try {
    currentStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: msg.streamId,
        },
      } as any,
    });
    output = new AudioContext();
    const source = output.createMediaStreamSource(currentStream);
    source.connect(output.destination);

    if (!MediaRecorder.isTypeSupported("audio/webm")) return;

    mediaRecorder = new MediaRecorder(currentStream, {
      mimeType: "audio/webm",
    });
    dgSocket = new WebSocket(
      "wss://api.deepgram.com/v1/listen?model=nova-3&language=en&smart_format=true&filler_words=true&punctuate=true&interim_results=true",
      ["token", "063621f91bc389b334455c70503469632f0447ac"]
    );

    dgSocket.onopen = () => {
      mediaRecorder?.addEventListener("dataavailable", (event: BlobEvent) => {
        if (event.data.size && dgSocket?.readyState === WebSocket.OPEN) {
          dgSocket.send(event.data);
        }
      });
      mediaRecorder?.start(1000);
    };

    dgSocket.onmessage = (message: MessageEvent) => {
      try {
        const data = JSON.parse(message.data);
        const transcript = data?.channel?.alternatives?.[0]?.transcript || "";
        if (transcript) {
          browser.runtime.sendMessage({
            type: "transcription-update",
            transcript,
            isFinal: data.is_final,
          });
        }
      } catch (error) {
        console.error("Error parsing Deepgram message:", error);
      }
    };
  } catch (err) {
    console.error("Offscreen audio capture failed:", err);
  }
});
