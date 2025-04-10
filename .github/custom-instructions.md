### General

Rules:

- For any changes you make, summarize in the changelog.md file.

### State Management

Rules:

- Always use Zustand.
- Always use stores folder to store the store file.

### Hooks

Rules:

- Always use hooks folder to use store file.

### Deepgram Implementation

Rules:

- Separate the logic on the content.tsx on services, hooks, and stores folder.
- Automatically transcribing don't use button.
- Capture audio from the browser tab (like Google Meet) instead of your microphone
  <!--
    <p className="p-1 text-xs text-secondary bg-primary/30">
      Transcribing...
    </p>
   -->
- Display the transcript on the content. If the transript is question automatically add a span on it with a Q#.
  <!--
    <p className="p-1 text-xs text-secondary bg-primary/30">
      What is your strength and weaknesses?&nbsp;
      <span className="px-1 text-[10px] bg-primary">Q1</span>
    </p>
   -->
- If the transcript is not a question put a skip.
  <!--
    <p className="p-1 text-xs text-secondary/70 bg-primary/30">
      Okay, okay... You answered the question very professionally and
      clearly<span className="px-1">(Skip)</span>
    </p>
   -->
- Audio capture the current page. If not capturing the audio current page display an errot text on it.
  <!--
    <p className="flex flex-row items-center p-1 text-[10px] bg-primary text-secondary">
      <AudioLinesIcon className="w-3 h-3 mr-1" />
      Audio:&nbsp;<span>Current page</span>
    </p>
   -->
