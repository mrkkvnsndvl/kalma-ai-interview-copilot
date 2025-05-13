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
      className={`flex flex-row justify-end ${isMinimized ? "p-0" : "p-1"}`}
    >
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
