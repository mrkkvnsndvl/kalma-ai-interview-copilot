let currentStream: MediaStream | null = null;

browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === "offscreen-start-capture") {
    startCapture(msg.streamId).catch((err) => {
      console.error("Offscreen audio capture failed:", err);
    });
  }
});

async function startCapture(streamId: string) {
  try {
    // Clean up any existing stream
    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
      currentStream = null;
    }

    // Define constraints with proper type casting
    const constraints = {
      audio: {
        mandatory: {
          chromeMediaSource: "tab",
          chromeMediaSourceId: streamId,
        },
      },
      video: false,
    } as MediaStreamConstraints;

    // Get the media stream
    currentStream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log("Audio capture started successfully");

    // Set up audio processing
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(currentStream);

    // Create an analyzer to process the audio
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    // Uncomment this line if you want to hear the audio through speakers
    // source.connect(audioCtx.destination);

    // Log audio detection for debugging
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Simple audio level detection for testing
    function checkAudio() {
      if (!currentStream) return;

      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;

      if (average > 10) {
        console.log("Audio detected, level:", average.toFixed(2));
      }

      requestAnimationFrame(checkAudio);
    }

    checkAudio();
  } catch (err) {
    console.error("Failed to start capture:", err);
    throw err;
  }
}
