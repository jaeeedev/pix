import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import authAtom from "../../recoil/auth/authAtom";
import { useSetRecoilState } from "recoil";
import { auth } from "../../firebase/initFirebase";

const AuthObserver = () => {
  const setLoginState = useSetRecoilState(authAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const userCopy = JSON.parse(JSON.stringify(user));

      if (user) {
        if (user.uid === import.meta.env.VITE_adminUid) {
          setLoginState({
            userInfo: userCopy,
            isLogin: true,
            isAdmin: true,
          });
        } else {
          setLoginState({
            userInfo: userCopy,
            isLogin: true,
            isAdmin: false,
          });
        }
      } else {
        setLoginState({
          userInfo: null,
          isLogin: false,
          isAdmin: false,
        });
      }
    });
  }, [setLoginState]);

  return <div />;
};

export default AuthObserver;
