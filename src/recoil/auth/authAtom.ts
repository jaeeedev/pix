import { atom } from "recoil";

const authAtom = atom({
  key: "authAtom",
  default: {
    isLogin: false,
  },
});

export default authAtom;
