import React, { useCallback, useState } from "react";

const CartItem = () => {
  const [count, setCount] = useState<number>(1); // 분리해야됨
  const countDown = useCallback(() => {
    setCount((prev) => Math.max(1, prev - 1));
  }, []);
  const countUp = useCallback(() => {
    setCount((prev) => Math.min(10, prev + 1));
  }, []);

  return (
    <div className="flex gap-4 justify-between items-center py-4 border-b">
      <input type="checkbox" />
      <div className="flex gap-2 items-center flex-1">
        <div className="w-20 h-20 bg-slate-200 rounded-md" />
        <p className="text-lg font-semibold">cardigan</p>
      </div>
      <div className="border border-slate-200 border-solid rounded-md w-fit my-4">
        <button className="p-3 px-5 active:bg-slate-200" onClick={countDown}>
          -
        </button>
        <span className="p-4">{count}</span>
        <button className="p-3 px-5 active:bg-slate-200" onClick={countUp}>
          +
        </button>
      </div>
      <span className="text-lg font-semibold">50,000</span>
    </div>
  );
};

export default CartItem;
