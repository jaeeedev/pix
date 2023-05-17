import { Link } from "react-router-dom";
import Children from "../../../types/children";
import { BiX } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const HeaderMenuBoxList = ({ setOpen }: Props) => {
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
        <BoxLi>
          <Link to="/login">로그인</Link>
        </BoxLi>
        <BoxLi>
          <Link to="/login">로그아웃</Link>
        </BoxLi>
        <BoxLi>
          <Link to="/login">마이페이지</Link>
        </BoxLi>
      </ul>
    </div>
  );
};

const BoxLi = ({ children }: Children) => {
  return <li className="whitespace-nowrap">{children}</li>;
};

export default HeaderMenuBoxList;
