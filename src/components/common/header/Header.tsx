import { Link } from "react-router-dom";
import ContentContainer from "../ContentContainer";
import HeaderMenuList from "./HeaderMenuList";

import {
  BsFillCartFill,
  BsThreeDotsVertical,
  BsFillGearFill,
} from "react-icons/bs";
import HeaderMenuBoxList from "./HeaderMenuBoxList";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import authAtom from "../../../recoil/auth/authAtom";
import { getAuth, signOut } from "firebase/auth";
import useGlobalModal from "../modal/useGlobalModal";

const Header = () => {
  const auth = getAuth();
  const { setModal } = useGlobalModal();
  const [open, setOpen] = useState(false);
  const { isLogin, isAdmin } = useRecoilValue(authAtom);

  const logoutHandle = async () => {
    try {
      await signOut(auth);
      setModal("로그아웃 되었습니다.");
    } catch (err) {
      console.log(err);
      setModal("로그아웃에 실패했습니다. 잠시 후 다시 실행해주세요.");
    }
  };

  return (
    <div className="sticky top-0 bg-slate-800 text-white shadow-sm z-10">
      <ContentContainer>
        <div className="flex gap-16">
          <Link to="/" className="font-bold text-lg">
            pix
          </Link>
          <nav className="flex justify-between  grow">
            <div>
              <Link to="/products">products</Link>
            </div>
            <ul className="flex items-center gap-4 ">
              {!isLogin && (
                <HeaderMenuList>
                  <Link to="/login">로그인</Link>
                </HeaderMenuList>
              )}
              {!isLogin && (
                <HeaderMenuList>
                  <Link to="/signup">회원가입</Link>
                </HeaderMenuList>
              )}
              {isLogin && (
                <HeaderMenuList onClick={logoutHandle}>로그아웃</HeaderMenuList>
              )}
              {isLogin && (
                <HeaderMenuList>
                  <Link to="/mypage">마이페이지</Link>
                </HeaderMenuList>
              )}

              {isLogin && isAdmin && (
                <HeaderMenuList>
                  <Link to="/admin">
                    <BsFillGearFill />
                  </Link>
                </HeaderMenuList>
              )}

              <HeaderMenuList always="on">
                <Link to="/cart">
                  <BsFillCartFill />
                </Link>
              </HeaderMenuList>

              <div className="relative">
                <HeaderMenuList reverse="on">
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
