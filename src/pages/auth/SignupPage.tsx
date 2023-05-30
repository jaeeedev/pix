import { Link, useNavigate } from "react-router-dom";
import AuthDeco from "../../components/auth/AuthDeco";
import AuthInput from "../../components/auth/AuthInput";
import ContentContainer from "../../components/common/ContentContainer";
import Button from "../../components/common/Button";
import AuthBackground from "../../components/auth/AuthBackground";
import { SyntheticEvent, useCallback } from "react";
import { auth } from "../../firebase/initFirebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import useGlobalModal from "../../components/common/modal/useGlobalModal";
import authAtom from "../../recoil/auth/authAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { minNicknameLength, maxNicknameLength } from "../../utills/constants";
import { FirebaseError } from "firebase/app";
import authErrorCodeMessages from "../../utills/authErrorCodeMessages";

const emailRegex = "[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,}";

const SignupPage = () => {
  const { setModal } = useGlobalModal();
  const navigate = useNavigate();
  const { isLogin } = useRecoilValue(authAtom);
  const setAuthAtom = useSetRecoilState(authAtom);

  if (isLogin) navigate("/");

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      const formData = Object.fromEntries(
        new FormData(e.target as HTMLFormElement)
      ) as { [key: string]: string };

      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        if (response && auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: formData.nickname,
          });

          setModal("회원가입 되었습니다.");
          setAuthAtom((prev) => {
            const userCopy = JSON.parse(JSON.stringify(auth.currentUser));
            return { ...prev, userInfo: userCopy };
          });
          navigate("/", {
            replace: true,
          });
        }
      } catch (err) {
        if (err instanceof FirebaseError && err.code) {
          console.log(err);
          setModal(
            authErrorCodeMessages[err.code] || authErrorCodeMessages.default
          );
          return;
        }
        setModal(authErrorCodeMessages.default);
      }
    },
    [navigate, setAuthAtom, setModal]
  );

  return (
    <>
      <AuthBackground />
      <ContentContainer className="p-0">
        <div className="md:flex">
          <AuthDeco />
          <div className="h-screen flex-1 md:flex md:justify-center md:items-center">
            <form
              name="signup"
              className="w-4/5 mx-auto py-8 lg:py-0"
              onSubmit={handleSubmit}
            >
              <h3 className="mb-4 font-bold text-3xl">회원가입</h3>
              <AuthInput
                name="nickname"
                placeholder="닉네임"
                type="text"
                minLength={minNicknameLength}
                maxLength={maxNicknameLength}
              />
              <AuthInput
                name="email"
                type="email"
                pattern={emailRegex}
                placeholder="이메일"
              />
              <AuthInput
                name="password"
                placeholder="비밀번호"
                type="password"
                minLength="6"
                maxLength="16"
              />
              <div>
                <Link
                  className="block w-fit ml-auto mb-4 text-slate-500"
                  to="/login"
                >
                  이미 계정이 있으세요?
                </Link>
              </div>
              <Button full="on">회원가입</Button>
            </form>
          </div>
        </div>
      </ContentContainer>
    </>
  );
};

export default SignupPage;
