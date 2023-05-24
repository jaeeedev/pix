import ContentContainer from "../../components/common/ContentContainer";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth/authAtom";
import { useEffect } from "react";
import PageTop from "../../components/common/PageTop";
import AddProductSection from "../../components/admin/AddProductSection";

const AdminPage = () => {
  const { isLogin, isAdmin } = useRecoilValue(authAtom);
  const navigate = useNavigate();

  // 로그아웃 상태 or 비관리자는 바로 리다이렉트

  useEffect(() => {
    if (!isLogin || !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, isLogin, navigate]);

  return (
    <ContentContainer>
      <PageTop>
        <PageTop.Title>관리자 페이지</PageTop.Title>
        <PageTop.Description>상품을 추가할 수 있습니다.</PageTop.Description>
      </PageTop>
      <AddProductSection />
    </ContentContainer>
  );
};

export default AdminPage;
