import { atom } from "recoil";

const globalModalAtom = atom({
  key: "globalModalAtom",
  default: {
    open: false,
    message: "",
  },
});

export default globalModalAtom;
