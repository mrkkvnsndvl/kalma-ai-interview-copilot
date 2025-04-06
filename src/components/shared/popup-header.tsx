import { BotIcon } from "lucide-react";

const PopupHeader = () => {
  return (
    <header className="flex flex-row items-center p-4 border-b font-geist gap-x-2">
      <BotIcon className="w-7 h-7" />
      <div className="flex flex-col">
        <span className="text-base font-bold">Kalma</span>
        <span className="text-xs text-muted-foreground leading-2">
          AI Interview Copilot
        </span>
      </div>
    </header>
  );
};

export default PopupHeader;
