import { User } from "firebase/auth";
import { atom } from "recoil";

type AuthDefault = {
  userInfo: User | null;
  isAdmin: boolean;
  isLogin: boolean;
};

const authAtom = atom<AuthDefault>({
  key: "authAtom",
  default: {
    userInfo: null,
    isAdmin: false,
    isLogin: false,
  },
});

export default authAtom;
