import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  always?: string;
  reverse?: string;
  onClick?: () => void;
};

/**
 * `always` : `on`: 너비 관계없이 `display: block`
 *
 * `reverse` : `on`: 기본 설정의 반대(md 이상의 너비부터 안보이게)
 *  */
const HeaderMenuList = ({ children, ...props }: Props) => {
  const { always, reverse } = props;

  return (
    <li
      className={twMerge(
        `cursor-pointer hidden md:block 
        ${always === "on" && "block"}
        ${reverse === "on" && "block md:hidden"}
        `
      )}
      {...props}
    >
      {children}
    </li>
  );
};

export default HeaderMenuList;
