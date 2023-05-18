import React from "react";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";

const ItemSet = () => {
  return (
    <div className="rounded-md overflow-hidden border border-slate-300">
      <div className="bg-slate-200 w-full h-[200px]"></div>
      <div className="p-4">
        <Link to="/">
          <span className="font-bold text-xl">제품명</span>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-slate-200 text-sm block">price</span>
            <span>28000</span>
          </div>
          <button className="rounded-md p-2 bg-slate-500 text-white">
            <BsFillCartFill size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemSet;
