import ContentContainer from "../../components/common/ContentContainer";
import authAtom from "../../recoil/auth/authAtom";
import { useRecoilValue } from "recoil";

const MyPage = () => {
  const { userInfo, isLogin } = useRecoilValue(authAtom);

  console.log(isLogin);

  return <ContentContainer>MyPage</ContentContainer>;
};

export default MyPage;
