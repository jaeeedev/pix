import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import authAtom from "../../recoil/auth/AuthAtom";
import { useSetRecoilState } from "recoil";

const AuthObserver = () => {
  const auth = getAuth();
  const setLoginStatus = useSetRecoilState(authAtom);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginStatus({
          isLogin: true,
        });
      } else {
        setLoginStatus({
          isLogin: false,
        });
      }
    });
  }, [auth, setLoginStatus]);

  return <div>AuthObserver</div>;
};

export default AuthObserver;
