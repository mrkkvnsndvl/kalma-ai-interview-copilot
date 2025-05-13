import { useEffect, useRef } from "react";

import ContentHeader from "@/components/shared/content-header";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Separator } from "@/components/ui/separator";
import Content from "@/entrypoints/content/content";
import { useDrag } from "@/hooks/use-drag";
import { useMinimize } from "@/hooks/use-minimize";
import { cn } from "@/lib/utils";

const ContentLayout = ({ onClose }: ContentHeaderI) => {
  const { setElementRef, ensurePositionInBounds } = useDrag();
  const { isMinimized } = useMinimize();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setElementRef(containerRef.current);
    }
  }, [setElementRef]);

  useEffect(() => {
    if (!isMinimized) {
      setTimeout(ensurePositionInBounds, 50);
    }
  }, [isMinimized, ensurePositionInBounds]);

  useEffect(() => {
    const handleResize = () => {
      if (!isMinimized) {
        ensurePositionInBounds();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMinimized, ensurePositionInBounds]);

  return (
    <ThemeProvider>
      <div
        ref={containerRef}
        className={cn(
          "w-[664px] font-geist backdrop-sepia-0 bg-primary/50 fixed transition-all duration-300",
          isMinimized && "w-auto h-auto"
        )}
        style={{
          transform: "translate(0px, 0px)",
          transition: "transform 0.1s ease-out",
        }}
      >
        <ContentHeader onClose={onClose} />
        {!isMinimized && (
          <>
            <Separator orientation="horizontal" />
            <main>
              <Content />
            </main>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ContentLayout;
