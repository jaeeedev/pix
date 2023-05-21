import React from "react";

const CartBill = () => {
  return (
    <div className="w-full m-0 md:flex-[1] p-4 rounded-md border border-solid border-slate-200 h-fit">
      <div className="flex justify-between py-2">
        <span className="font-medium text-slate-400 text-lg">상품 합계</span>
        <span className="font-medium text-lg">250,000</span>
      </div>
      <div className="flex justify-between py-2">
        <span className="font-medium text-slate-400 text-lg">배송비</span>
        <span className="font-medium text-slate-400 text-lg">3,000</span>
      </div>
      <hr />

      <div className="flex justify-between py-4">
        <span className="font-medium text-lg">total</span>
        <span className="font-medium text-xl">253,000</span>
      </div>

      <button className="w-full p-3 bg-slate-200 rounded-md">구매하기</button>
    </div>
  );
};

export default CartBill;
