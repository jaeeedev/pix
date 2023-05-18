import { Link, useNavigate } from "react-router-dom";
import AuthDeco from "../../components/auth/AuthDeco";
import AuthInput from "../../components/auth/AuthInput";
import ContentContainer from "../../components/common/ContentContainer";
import PageTitle from "../../components/common/PageTitle";
import Button from "../../components/common/Button";
import AuthBackground from "../../components/auth/AuthBackground";
import { SyntheticEvent, useCallback } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import useGlobalModal from "../../components/common/modal/useGlobalModal";

const emailRegex = "[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,}";
const SignupPage = () => {
  const { setModal } = useGlobalModal();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();

      const auth = getAuth();

      const formData = Object.fromEntries(
        new FormData(e.target as HTMLFormElement)
      ) as { [key: string]: string };

      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        if (response) {
          setModal("회원가입 되었습니다.");
          navigate("/");
        }
      } catch (err) {
        console.log(err);
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
              name="signup"
              className="w-4/5 mx-auto py-8 lg:py-0"
              onSubmit={handleSubmit}
            >
              <PageTitle>회원가입</PageTitle>
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
              <Button full>회원가입</Button>
            </form>
          </div>
        </div>
      </ContentContainer>
    </>
  );
};

export default SignupPage;
