import { useEffect } from "react";
import ContentContainer from "../../components/common/ContentContainer";
import PageTop from "../../components/common/PageTop";

import Profile from "../../components/mypage/Profile";
import WishList from "../../components/mypage/WishList";

const MyPage = () => {
  return (
    <ContentContainer>
      <PageTop>
        <PageTop.Title>마이페이지</PageTop.Title>
      </PageTop>

      <div className="flex flex-col md:flex-row gap-4">
        <Profile />
        <WishList />
      </div>
    </ContentContainer>
  );
};

export default MyPage;
