import React from "react";
import Children from "../../types/children";
import { CartData } from "../../types/cart";

const BillTextWrapper = ({ children }: Children) => {
  return <div className="flex justify-between py-2">{children}</div>;
};

type Props = {
  cartData: CartData[];
};

const CartBill = ({ cartData }: Props) => {
  const cartSum = cartData.reduce((acc, cur) => acc + cur.price * cur.count, 0);
  const fee = 3000;
  const total = (cartSum + fee).toLocaleString();
  return (
    <div className="w-full m-0 md:flex-[1] p-4 rounded-md border border-solid border-slate-200 h-fit">
      <BillTextWrapper>
        <span className="font-medium text-slate-400 text-lg">상품 합계</span>
        <span className="font-medium text-lg">{cartSum.toLocaleString()}</span>
      </BillTextWrapper>
      <BillTextWrapper>
        <span className="font-medium text-slate-400 text-lg">배송비</span>
        <span className="font-medium text-slate-400 text-lg">
          {fee.toLocaleString()}
        </span>
      </BillTextWrapper>
      <hr />

      <div className="flex justify-between py-4">
        <span className="font-medium text-lg">total</span>
        <span className="font-medium text-xl">{total}</span>
      </div>

      <button className="w-full p-3 bg-slate-800 rounded-md text-white">
        구매하기
      </button>
    </div>
  );
};

export default CartBill;
