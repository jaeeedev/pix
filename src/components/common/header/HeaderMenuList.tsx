import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  always?: boolean;
  reverse?: boolean;
};

/**
 * `always` : 너비 관계없이 `display: block`
 *
 * `reverse` : 기본 설정의 반대(md 이상의 너비부터 안보이게)
 *  */
const HeaderMenuList = ({ children, ...props }: Props) => {
  const { always, reverse } = props;
  console.log(props);

  return (
    <li
      className={twMerge(
        `cursor-pointer hidden md:block 
        ${!!always && "block"}
        ${!!reverse && "block md:hidden"}
        `
      )}
    >
      {children}
    </li>
  );
};

export default HeaderMenuList;
