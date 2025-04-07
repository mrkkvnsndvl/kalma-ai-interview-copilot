import { BotIcon, GripHorizontalIcon, MinusIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDrag } from "@/hooks/use-drag";

const ContentHeader = () => {
  const { startDragging } = useDrag();

  return (
    <header className="flex flex-row items-center justify-between p-4 border-b">
      <div className="flex items-center gap-x-2">
        <BotIcon className="w-7 h-7 text-secondary" />
        <div className="flex flex-col">
          <span className="text-base font-bold text-secondary">Kalma</span>
          <span className="text-xs text-muted-foreground leading-2 text-secondary">
            AI Interview Copilot
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          className="hover:bg-transparent active:bg-primary cursor-grab active:cursor-grabbing"
          variant="ghost"
          onMouseDown={startDragging}
        >
          <GripHorizontalIcon className="w-6 h-6 text-secondary" />
        </Button>
        <Button
          className="cursor-pointer hover:bg-transparent active:bg-primary"
          variant="ghost"
        >
          <MinusIcon className="w-6 h-6 text-secondary" />
        </Button>
        <Button
          className="cursor-pointer hover:bg-transparent active:bg-primary"
          variant="ghost"
        >
          <XIcon className="w-6 h-6 text-secondary" />
        </Button>
      </div>
    </header>
  );
};

export default ContentHeader;
