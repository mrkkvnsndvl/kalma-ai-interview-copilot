import PopupForm from "@/components/shared/popup-form";
import { ScrollArea } from "@/components/ui/scroll-area";

const Popup = () => {
  return (
    <section className="flex flex-col">
      <ScrollArea className="h-96">
        <PopupForm />
      </ScrollArea>
    </section>
  );
};

export default Popup;
