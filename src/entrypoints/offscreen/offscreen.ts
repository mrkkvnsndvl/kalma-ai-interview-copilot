let currentStream: MediaStream | null = null;

browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === "offscreen-start-capture") {
    startCapture(msg.streamId).catch((err) => {
      console.error("Offscreen audio capture failed:", err);
      browser.runtime.sendMessage({
        type: "error",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    });
  }
});

async function startCapture(streamId: string) {
  try {
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
      currentStream = null;
    }

    const constraints: MediaStreamConstraints = {
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: streamId,
        },
      },
      video: false,
    } as MediaStreamConstraints;

    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(currentStream);
    source.connect(audioCtx.destination);
    console.log("Audio capture started.");
  } catch (err) {
    console.error("Failed to start capture:", err);
    throw err;
  }
}
