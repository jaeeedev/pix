import CartItem from "./CartItem";
import { CartData } from "../../types/cart";
import { BsFillTrash3Fill } from "react-icons/bs";
import { DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import useCart from "../../hooks/useCart";

type Props = {
  cartData: DocumentData[];
  userInfo: User | null;
  setNeedRefetch: Dispatch<SetStateAction<boolean>>;
};

const CartList = ({ cartData, userInfo }: Props) => {
  const { allDeleteMutate } = useCart();

  return (
    <div className="flex-[2.5]">
      <div className="flex gap-4 justify-between items-center py-4 font-bold text-lg text-slate-400">
        <button onClick={() => allDeleteMutate(cartData)}>
          <BsFillTrash3Fill className="active:text-slate-600" />
        </button>
        <span className="flex-1">product</span>
        <span className="min-w-[150px]">quantity</span>
        <span>price</span>
      </div>
      <hr />
      {cartData.length === 0 && (
        <div className="py-4">장바구니가 비었습니다.</div>
      )}
      {cartData.map((cart) => (
        <CartItem
          key={cart.productId}
          cartList={cartData as CartData[]}
          data={cart as CartData}
          userInfo={userInfo}
        />
      ))}
    </div>
  );
};

export default CartList;
