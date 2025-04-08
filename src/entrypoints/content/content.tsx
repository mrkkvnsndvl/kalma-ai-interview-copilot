import { AudioLinesIcon } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

const Content = () => {
  return (
    <section className="grid grid-cols-3 gap-2">
      <div className="grid auto-rows-auto">
        <ScrollArea className="p-4 h-[346px] overflow-hidden">
          <div className="flex flex-col gap-2">
            <p className="p-2 text-sm text-secondary bg-primary/40">
              Transcribing...
            </p>
            <p className="p-2 text-sm text-secondary bg-primary/40">
              What is your strength and weaknesses?&nbsp;
              <span className="px-1 text-xs bg-primary">Q1</span>
            </p>
            <p className="p-2 text-sm text-secondary/40 bg-primary/40">
              Okay, okay... You answered the question very professionally and
              clearly<span className="px-1">(Skip)</span>
            </p>
            <p className="p-2 text-sm text-secondary bg-primary/40">
              Transcribing...
            </p>
          </div>
        </ScrollArea>
        <div className="px-4 pb-4">
          <p className="flex flex-row p-2 text-xs bg-primary text-secondary">
            <AudioLinesIcon className="w-4 h-4 mr-1" />
            Audio source:&nbsp;<span>Current page</span>
          </p>
        </div>
      </div>
      <ScrollArea className="col-span-2 p-4 h-[400px] overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-x-2">
            <span className="px-1 text-xs text-secondary bg-primary">Q1</span>
            <p className="text-sm text-secondary">
              What is your strength and weaknesses?
            </p>
          </div>
          <p className="text-sm text-secondary">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum ab
            commodi quos, enim corrupti obcaecati hic soluta, expedita
            distinctio deserunt odio sed quisquam! Inventore hic dolores ex
            iusto assumenda, harum provident animi quaerat delectus reiciendis,
            nisi laudantium neque cum dolore ducimus, tempore tenetur aperiam
            quae. Laudantium nostrum quidem illo consequatur.
          </p>
        </div>
      </ScrollArea>
    </section>
  );
};

export default Content;
