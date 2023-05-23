import { Link, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { TItem } from "../../types/product";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth/authAtom";
import useGlobalModal from "../common/modal/useGlobalModal";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import useCart from "../../hooks/useCart";

type Props = {
  data: TItem;
};

const ItemSet = ({ data }: Props) => {
  const { addCart } = useCart();

  return (
    <div className="rounded-xl overflow-hidden border border-slate-300 relative">
      <div className="bg-slate-200 w-full h-[200px] overflow-hidden">
        <Link to={`/products/${data.productId}`}>
          <img src={data.imageUrl} alt={`${data.title} 이미지`} />
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/products/${data.productId}`}>
          <p className="font-bold text-xl">{data.title}</p>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-slate-300 text-sm block">price</span>
            <span>{data.price}</span>
          </div>
          <button
            className="rounded-md p-2 bg-slate-500 text-white"
            onClick={() => addCart(data.productId, data)}
          >
            <BsFillCartFill size={18} />
          </button>
        </div>
      </div>
      <button className="absolute right-4 top-4 text-slate-500">
        <AiOutlineHeart size={20} />
      </button>
    </div>
  );
};

export default ItemSet;
