import React from "react";
import { TItem } from "../../types/product";
import { BiX } from "react-icons/bi";

type Props = {
  data: TItem;
};

const AdminProductLi = ({ data }: Props) => {
  return (
    <li className="p-4 border-slate-100 flex justify-between items-center">
      <span>{data.productId}</span>
      <span className="flex items-center">
        <div className="w-10 h-10 rounded-3xl bg-slate-100"></div>
        {data.title}
      </span>
      <span>{data.price}</span>
      <span>{data.createdAt.toString()}</span>
      <span>{data.soldOut.toString()}</span>
      <button>
        <BiX size={20} />
      </button>
    </li>
  );
};

export default AdminProductLi;
