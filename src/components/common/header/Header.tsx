import { Link } from "react-router-dom";
import ContentContainer from "../ContentContainer";
import HeaderMenuList from "./HeaderMenuList";

import { BsFillCartFill, BsThreeDotsVertical } from "react-icons/bs";
import HeaderMenuBoxList from "./HeaderMenuBoxList";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
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

              <div className="relative">
                <HeaderMenuList reverse>
                  <BsThreeDotsVertical
                    onClick={() => setOpen((prev) => !prev)}
                  />
                </HeaderMenuList>
                {open && <HeaderMenuBoxList setOpen={setOpen} />}
              </div>
            </ul>
          </nav>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Header;
