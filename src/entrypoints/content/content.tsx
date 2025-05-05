import { ScrollArea } from "@/components/ui/scroll-area";

const Content = () => {
  return (
    <section className="grid grid-cols-3">
      <ScrollArea className="p-1 h-[346px] overflow-hidden">
        <div className="flex flex-col gap-1">
          <p className="p-1 text-xs text-secondary bg-primary/30">
            Transcribing...
          </p>
          <p className="p-1 text-xs text-secondary bg-primary/30">
            What is your strength and weaknesses?&nbsp;
            <span className="px-1 text-[10px] bg-primary">Q1</span>
          </p>
          <p className="p-1 text-xs text-secondary/70 bg-primary/30">
            Okay, okay... You answered the question very professionally and
            clearly<span className="px-1">(Skip)</span>
          </p>
          <p className="p-1 text-xs text-secondary bg-primary/30">
            Transcribing...
          </p>
        </div>
      </ScrollArea>
      <ScrollArea className="col-span-2 p-1 h-[346px] overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-x-1">
            <span className="px-1 text-[10px] text-secondary bg-primary">
              Q1
            </span>
            <p className="text-xs text-secondary">
              What is your strength and weaknesses?
            </p>
          </div>
          <p className="text-sm text-balance text-secondary">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima,
            perferendis saepe! Dolorem nulla expedita tempore ullam tempora
            provident deleniti nobis.
          </p>
        </div>
      </ScrollArea>
    </section>
  );
};

export default Content;
