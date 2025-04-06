import PopupFooter from "@/components/shared/popup-footer";
import PopupHeader from "@/components/shared/popup-header";
import Popup from "@/entrypoints/popup/popup";

const PopupLayout = () => {
  return (
    <div className="w-sm">
      <PopupHeader />
      <main>
        <Popup />
      </main>
      <PopupFooter />
    </div>
  );
};

export default PopupLayout;
