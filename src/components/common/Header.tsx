import { Link } from "react-router-dom";
import ContentContainer from "./ContentContainer";
import { BsFillCartFill, BsThreeDotsVertical } from "react-icons/bs";
import HeaderMenuList from "./header/HeaderMenuList";

const Header = () => {
  return (
    <div className="sticky top-0 bg-slate-100">
      <ContentContainer>
        <div className="flex gap-16">
          <Link to="/">pix</Link>
          <nav className="flex justify-between  grow">
            <div>
              <Link to="/">products</Link>
            </div>
            <ul className="flex items-center gap-4 ">
              <HeaderMenuList>
                <Link to="/login">로그인</Link>
              </HeaderMenuList>

              <HeaderMenuList>로그아웃</HeaderMenuList>

              <HeaderMenuList>
                <Link to="/signup">회원가입</Link>
              </HeaderMenuList>

              <HeaderMenuList always>
                <Link to="/cart">
                  <BsFillCartFill />
                </Link>
              </HeaderMenuList>

              <HeaderMenuList reverse>
                <BsThreeDotsVertical />
              </HeaderMenuList>
            </ul>
          </nav>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Header;
