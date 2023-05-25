import CartItem from "./CartItem";
import { CartData } from "../../types/cart";
import { BsFillTrash3Fill } from "react-icons/bs";
import { DocumentData, deleteDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { db } from "../../firebase/initFirebase";

type Props = {
  cartData: DocumentData[];
  userInfo: User | null;
  setNeedRefetch: Dispatch<SetStateAction<boolean>>;
};

const CartList = ({ cartData, userInfo, setNeedRefetch }: Props) => {
  const deleteAllItem = async () => {
    if (!userInfo) return;
    try {
      for (const cart of cartData) {
        await deleteDoc(
          doc(db, "cart", userInfo?.uid, "items", cart.productId)
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setNeedRefetch((prev) => !prev);
    }
  };

  return (
    <div className="flex-[2.5]">
      <div className="flex gap-4 justify-between items-center py-4 font-bold text-lg text-slate-400">
        <button onClick={deleteAllItem}>
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
          data={cart as CartData}
          userInfo={userInfo}
          setNeedRefetch={setNeedRefetch}
        />
      ))}
    </div>
  );
};

export default CartList;
