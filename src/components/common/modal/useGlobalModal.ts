import globalModalAtom from "../../../recoil/globalModal/globalModalAtom";
import { useSetRecoilState } from "recoil";

const useGlobalModal = () => {
  const setModalState = useSetRecoilState(globalModalAtom);

  const setMessage = (message: string) => {
    return setModalState({
      open: true,
      message,
    });
  };

  return {
    setModal: setMessage,
  };
};

export default useGlobalModal;
