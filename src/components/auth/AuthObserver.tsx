import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import authAtom from "../../recoil/auth/authAtom";
import { useRecoilState } from "recoil";
import { auth } from "../../firebase/initFirebase";

const AuthObserver = () => {
  const [loginState, setLoginState] = useRecoilState(authAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid === import.meta.env.VITE_adminUid) {
          setLoginState({
            userInfo: user,
            isLogin: true,
            isAdmin: true,
          });
        } else {
          setLoginState({
            userInfo: user,
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
