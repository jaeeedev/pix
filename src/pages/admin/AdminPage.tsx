import ContentContainer from "../../components/common/ContentContainer";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth/authAtom";
import { useEffect } from "react";
import PageTitle from "../../components/common/PageTitle";
import AdminSortSection from "../../components/admin/AdminSortSection";

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
      <PageTitle>관리자 페이지</PageTitle>

      <AdminSortSection />
    </ContentContainer>
  );
};

export default AdminPage;
