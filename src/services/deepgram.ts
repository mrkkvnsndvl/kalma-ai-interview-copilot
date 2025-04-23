import useDeepgramStore from "@/stores/deepgram-store";

export const deepgram = async (
  apiKey: string,
  onTranscript: (text: string) => void,
  onError: (error: Error) => void
) => {
  const store = useDeepgramStore.getState();
  let stream: MediaStream;

  try {
    // Check if we have an existing active stream
    if (store.mediaStream && store.mediaStream.active) {
      stream = store.mediaStream;
    } else {
      // Get new stream if none exists or the existing one is inactive
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: {
          autoGainControl: false,
          echoCancellation: false,
          noiseSuppression: false,
        },
      });

      // Set up track ended listeners to cleanup the stored stream
      stream.getTracks().forEach((track) => {
        track.onended = () => {
          useDeepgramStore.getState().setMediaStream(null);
        };
      });

      // Store the new stream
      store.setMediaStream(stream);
    }

    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0) {
      throw new Error("No audio track found in the screen share");
    }

    const audioStream = new MediaStream(audioTracks);

    const mediaRecorder = new MediaRecorder(audioStream, {
      mimeType: "audio/webm",
    });

    const socket = new WebSocket(
      "wss://api.deepgram.com/v1/listen?model=nova-3&language=en&smart_format=true&filler_words=true&punctuate=true&",
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
      // Don't automatically stop tracks here - let them be managed by the stream's ended event
      // Only clear if all tracks are ended
      if (!stream.active) {
        useDeepgramStore.getState().setMediaStream(null);
      }
    };
  } catch (error) {
    useDeepgramStore.getState().setMediaStream(null);
    onError(error as Error);
    return () => {};
  }
};
