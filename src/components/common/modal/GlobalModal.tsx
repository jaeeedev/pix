import { useEffect, useState } from "react";
import globalModalAtom from "../../../recoil/globalModal/globalModalAtom";
import { useRecoilValue } from "recoil";
import { createPortal } from "react-dom";

const GlobalModal = () => {
  const [visible, setVisible] = useState(false);
  const modalState = useRecoilValue(globalModalAtom);
  const modalRef = document.getElementById("modal") as HTMLElement;

  useEffect(() => {
    if (modalState.message.length === 0) return;

    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 1500);
  }, [modalState]);

  return (
    <>
      {visible &&
        createPortal(
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-md bg-white/95">
            {modalState.message}
          </div>,
          modalRef
        )}
    </>
  );
};

export default GlobalModal;
