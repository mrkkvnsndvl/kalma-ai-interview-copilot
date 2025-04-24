import {
  BotIcon,
  GripHorizontalIcon,
  MaximizeIcon,
  MinimizeIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDrag } from "@/hooks/use-drag";
import { useMinimize } from "@/hooks/use-minimize";

const ContentHeader = ({ onClose }: ContentHeaderI) => {
  const { startDragging } = useDrag();
  const { isMinimized, setIsMinimized } = useMinimize();

  return (
    <header
      className={`flex flex-row items-center justify-between ${
        isMinimized ? "p-0" : "p-1"
      }`}
    >
      {!isMinimized && (
        <div className="flex items-center gap-x-1">
          <BotIcon className="w-5 h-5 text-secondary" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-secondary">Kalma</span>
            <span className="text-[10px] leading-2 text-muted-foreground">
              Copilot
            </span>
          </div>
        </div>
      )}
      <div className={`flex flex-row ${isMinimized ? "gap-0" : "gap-1"}`}>
        <Button
          className="hover:bg-transparent active:bg-primary cursor-grab active:cursor-grabbing"
          variant="ghost"
          onMouseDown={startDragging}
        >
          <GripHorizontalIcon className="w-4 h-4 text-secondary" />
        </Button>
        <Button
          className="cursor-pointer hover:bg-transparent active:bg-primary"
          variant="ghost"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? (
            <MaximizeIcon className="w-4 h-4 text-secondary" />
          ) : (
            <MinimizeIcon className="w-4 h-4 text-secondary" />
          )}
        </Button>
        <Button
          className="cursor-pointer hover:bg-transparent active:bg-primary"
          variant="ghost"
          onClick={onClose}
        >
          <XIcon className="w-4 h-4 text-secondary" />
        </Button>
      </div>
    </header>
  );
};

export default ContentHeader;
