import { Link } from "react-router-dom";
import Children from "../../../types/children";
import { BiX } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";
import { useRecoilValue } from "recoil";
import authAtom from "../../../recoil/auth/AuthAtom";
import { getAuth, signOut } from "firebase/auth";
import useGlobalModal from "../modal/useGlobalModal";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const HeaderMenuBoxList = ({ setOpen }: Props) => {
  const auth = getAuth();
  const { setModal } = useGlobalModal();
  const { isLogin } = useRecoilValue(authAtom);

  const logoutHandle = async () => {
    try {
      await signOut(auth);
      setModal("로그아웃 되었습니다.");
    } catch (err) {
      console.log(err);
      setModal("로그아웃에 실패했습니다. 잠시 후 다시 실행해주세요.");
    }
  };

  const closeBox = () => {
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <div
        className="fixed left-0 top-0 bg-slate-400/50 w-screen h-screen backdrop-blur-[2px]"
        onClick={closeBox}
      />
      <ul className="absolute right-2 top-6 p-4 bg-white rounded-md shadow-md min-w-[150px]">
        <button className="absolute right-4 top-4" onClick={closeBox}>
          <BiX size={20} />
        </button>
        {!isLogin && (
          <BoxLi>
            <Link to="/login">로그인</Link>
          </BoxLi>
        )}
        <BoxLi>
          <Link to="/signup">회원가입</Link>
        </BoxLi>
        <BoxLi>
          <Link to="/mypage">마이페이지</Link>
        </BoxLi>
        {isLogin && (
          <BoxLi>
            <button onClick={logoutHandle}>로그아웃</button>
          </BoxLi>
        )}
      </ul>
    </div>
  );
};

const BoxLi = ({ children }: Children) => {
  return <li className="whitespace-nowrap">{children}</li>;
};

export default HeaderMenuBoxList;
