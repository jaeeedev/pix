import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { TItem } from "../../types/product";
import useCart from "../../hooks/useCart";
import useWish from "../../hooks/useWish";
import Children from "../../types/children";

type Props = {
  data: TItem;
};

const ItemSet = ({ data }: Props) => {
  const { addCart } = useCart();
  const { addWish } = useWish();

  return (
    <div className="rounded-xl overflow-hidden border border-slate-300 relative h-full">
      <div className="bg-slate-100 w-full h-[200px] overflow-hidden">
        <Link to={`/products/${data.productId}`}>
          <img
            loading="lazy"
            className="block w-full h-full object-cover scale-105 drop-shadow-md"
            src={data.imageUrl}
            alt={`${data.title} 이미지`}
          />
        </Link>
      </div>
      <div className="p-4 flex flex-col justify-between h-[130px]">
        <Link to={`/products/${data.productId}`}>
          <p className="font-bold text-xl truncate">{data.title}</p>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-slate-300 text-sm block">price</span>
            <span className="font-medium">{data.price}</span>
          </div>
          <button
            className="rounded-md p-2 bg-slate-800 text-white"
            onClick={() => addCart(data.productId, data)}
          >
            <BsFillCartFill size={18} />
          </button>
        </div>
      </div>
      <button
        className="absolute right-2 top-2 rounded-full overflow-hidden text-slate-500 p-2 active:text-red-400 active:bg-red-100"
        onClick={() => addWish(data.productId, data)}
      >
        <AiOutlineHeart size={20} />
      </button>
    </div>
  );
};

const Label = ({ children }: Children) => {
  return (
    <span className="absolute left-2 top-2 p-2 px-4 rounded-md bg-slate-800 text-slate-100 font-bold text-sm">
      {children}
    </span>
  );
};

ItemSet.Label = Label;
export default ItemSet;
