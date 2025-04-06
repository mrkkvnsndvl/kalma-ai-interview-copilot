import PopupFooter from "@/components/shared/popup-footer";
import PopupHeader from "@/components/shared/popup-header";
import Popup from "@/entrypoints/popup/popup";

const PopupLayout = () => {
  return (
    <>
      <PopupHeader />
      <main>
        <Popup />
      </main>
      <PopupFooter />
    </>
  );
};

export default PopupLayout;
