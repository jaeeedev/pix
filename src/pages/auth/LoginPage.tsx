import { Link, useNavigate } from "react-router-dom";
import AuthDeco from "../../components/auth/AuthDeco";
import AuthInput from "../../components/auth/AuthInput";
import ContentContainer from "../../components/common/ContentContainer";
import PageTitle from "../../components/common/PageTitle";
import Button from "../../components/common/Button";
import AuthBackground from "../../components/auth/AuthBackground";
import { SyntheticEvent, useCallback } from "react";
import useGlobalModal from "../../components/common/modal/useGlobalModal";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth/authAtom";

const emailRegex = "[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,}";
const LoginPage = () => {
  const { setModal } = useGlobalModal();
  const navigate = useNavigate();

  const { isLogin } = useRecoilValue(authAtom);

  if (isLogin) navigate("/");

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      const auth = getAuth();

      const formData = Object.fromEntries(
        new FormData(e.target as HTMLFormElement)
      ) as { [key: string]: string };

      try {
        const response = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        if (response) {
          setModal("로그인 되었습니다.");
          navigate("/", {
            replace: true,
          });
        }
      } catch (err) {
        console.log(err);
        console.log(typeof err);
        setModal("오류가 발생했습니다. /잠시 후 실행해주세요");
      }
    },
    [navigate, setModal]
  );

  return (
    <>
      <AuthBackground />
      <ContentContainer className="p-0">
        <div className="md:flex">
          <AuthDeco />
          <div className="h-screen flex-1 md:flex md:justify-center md:items-center">
            <form
              name="login"
              className="w-4/5 mx-auto py-8 lg:py-0"
              onSubmit={handleSubmit}
            >
              <PageTitle>로그인</PageTitle>
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
                  to="/signup"
                >
                  아직 계정이 없으세요?
                </Link>
              </div>
              <Button full>로그인</Button>
            </form>
          </div>
        </div>
      </ContentContainer>
    </>
  );
};

export default LoginPage;
