import { useRef, useEffect } from "react";
import ContentHeader from "@/components/shared/content-header";
import { Separator } from "@/components/ui/separator";
import Content from "@/entrypoints/content/content";
import { useDrag } from "@/hooks/use-drag";
import { useMinimizeStore } from "@/stores/minimize-store";
import { cn } from "@/lib/utils";

const ContentLayout = () => {
  const { setElementRef, ensurePositionInBounds } = useDrag();
  const { isMinimized } = useMinimizeStore();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setElementRef(containerRef.current);
    }
  }, [setElementRef]);

  // Ensure content stays in viewport bounds when maximizing
  useEffect(() => {
    if (!isMinimized) {
      // Small delay to allow the UI to expand first
      setTimeout(ensurePositionInBounds, 50);
    }
  }, [isMinimized, ensurePositionInBounds]);

  // Handle window resize
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
    <div
      ref={containerRef}
      className={cn(
        "w-svh font-geist backdrop-sepia-0 bg-primary/30 fixed transition-all duration-300",
        isMinimized && "w-auto h-auto"
      )}
      style={{
        transform: "translate(0px, 0px)",
        transition: "transform 0.1s ease-out",
      }}
    >
      <ContentHeader />
      {!isMinimized && (
        <>
          <Separator orientation="horizontal" />
          <main>
            <Content />
          </main>
        </>
      )}
    </div>
  );
};

export default ContentLayout;
