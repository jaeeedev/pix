import globalModalAtom from "../../../recoil/globalModal/globalModalAtom";
import { useSetRecoilState } from "recoil";

const useGlobalModal = () => {
  const setModalState = useSetRecoilState(globalModalAtom);
  return {
    setModal: setModalState,
  };
};

export default useGlobalModal;
