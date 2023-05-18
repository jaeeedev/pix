import { useEffect, useState } from "react";
import globalModalAtom from "../../../recoil/globalModal/globalModalAtom";
import { useRecoilValue } from "recoil";

const GlobalModal = () => {
  const [visible, setVisible] = useState(false);
  const modalState = useRecoilValue(globalModalAtom);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 1500);
  }, [modalState]);

  return (
    visible && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md shadow-md bg-white/50">
        {modalState}
      </div>
    )
  );
};

export default GlobalModal;
