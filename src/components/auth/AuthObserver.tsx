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
            isLogin: true,
            isAdmin: true,
          });
        } else {
          setLoginState({
            isLogin: true,
            isAdmin: false,
          });
        }
      } else {
        setLoginState({
          isLogin: false,
          isAdmin: false,
        });
      }
    });
  }, [setLoginState]);

  return <div />;
};

export default AuthObserver;
