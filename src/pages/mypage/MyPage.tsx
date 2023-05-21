import ContentContainer from "../../components/common/ContentContainer";
import authAtom from "../../recoil/auth/authAtom";
import { useRecoilValue } from "recoil";

const MyPage = () => {
  const { userInfo } = useRecoilValue(authAtom);

  return (
    <ContentContainer>
      <div>
        <p>{userInfo?.displayName}</p>
        <p>{userInfo?.email}</p>
      </div>
    </ContentContainer>
  );
};

export default MyPage;
