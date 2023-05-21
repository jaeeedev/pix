import CartItem from "./CartItem";
import { CartData } from "../../types/cart";
import { BsFillTrash3Fill } from "react-icons/bs";
import { DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

type Props = {
  cartData: DocumentData[];
  userInfo: User | null;
  setNeedRefetch: Dispatch<SetStateAction<boolean>>;
};

const CartList = ({ cartData, userInfo, setNeedRefetch }: Props) => {
  return (
    <div className="flex-[2.5]">
      <div className="flex gap-4 justify-between items-center py-4 font-bold text-lg text-slate-400">
        <BsFillTrash3Fill />
        <span className="flex-1">product</span>
        <span className="min-w-[150px]">quantity</span>
        <span>price</span>
      </div>
      <hr />

      {cartData.map((cart) => (
        <CartItem
          key={cart.productId}
          data={cart as CartData}
          userInfo={userInfo}
          setNeedRefetch={setNeedRefetch}
        />
      ))}
    </div>
  );
};

export default CartList;
