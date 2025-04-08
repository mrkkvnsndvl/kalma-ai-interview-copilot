import {
  BotIcon,
  GripHorizontalIcon,
  MaximizeIcon,
  MinimizeIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDrag } from "@/hooks/use-drag";
import { useMinimizeStore } from "@/stores/minimize-store";

const ContentHeader = () => {
  const { startDragging } = useDrag();
  const { isMinimized, setIsMinimized } = useMinimizeStore();

  return (
    <header
      className={`flex flex-row items-center justify-between ${
        isMinimized ? "p-0" : "p-4"
      }`}
    >
      {!isMinimized && (
        <div className="flex items-center gap-x-2">
          <BotIcon className="w-7 h-7 text-secondary" />
          <div className="flex flex-col">
            <span className="text-base font-bold text-secondary">Kalma</span>
            <span className="text-xs leading-2 text-secondary">
              AI Interview Copilot
            </span>
          </div>
        </div>
      )}
      <div className={`flex flex-row ${isMinimized ? "gap-0" : "gap-2"}`}>
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
        >
          <XIcon className="w-4 h-4 text-secondary" />
        </Button>
      </div>
    </header>
  );
};

export default ContentHeader;
