import { useRef, useEffect } from "react";
import ContentHeader from "@/components/shared/content-header";
import { Separator } from "@/components/ui/separator";
import Content from "@/entrypoints/content/content";
import { useDrag } from "@/hooks/use-drag";

const ContentLayout = () => {
  const { setElementRef } = useDrag();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setElementRef(containerRef.current);
    }
  }, [setElementRef]);

  return (
    <div
      ref={containerRef}
      className="w-svh font-geist backdrop-sepia-0 bg-primary/30 fixed"
      style={{
        transform: "translate(0px, 0px)",
        transition: "transform 0.1s ease-out",
      }}
    >
      <ContentHeader />
      <Separator orientation="horizontal" />
      <main>
        <Content />
      </main>
    </div>
  );
};

export default ContentLayout;
