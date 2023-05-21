import { useEffect, useState } from "react";
import globalModalAtom from "../../../recoil/globalModal/globalModalAtom";
import { useRecoilState } from "recoil";

const GlobalModal = () => {
  const [visible, setVisible] = useState(false);
  const [modalState, setModalState] = useRecoilState(globalModalAtom);

  useEffect(() => {
    if (modalState.message.length === 0) return;

    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 1500);
  }, [modalState]);

  return (
    <>
      {visible && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-md bg-white/80">
          {modalState.message}
        </div>
      )}
    </>
  );
};

export default GlobalModal;
