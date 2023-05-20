import { atom } from "recoil";

const authAtom = atom({
  key: "authAtom",
  default: {
    isAdmin: false,
    isLogin: false,
  },
});

export default authAtom;
