import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CartData } from "../../types/cart";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { User } from "firebase/auth";
import { BsFillTrash3Fill } from "react-icons/bs";

type Props = {
  data: CartData;
  userInfo: User | null;
  setNeedRefetch: Dispatch<SetStateAction<boolean>>;
};

type UpdateParam = "up" | "down";

const CartItem = ({ data, userInfo, setNeedRefetch }: Props) => {
  const [count, setCount] = useState<number>(data.count);

  const updateCount = useCallback(
    async (way: UpdateParam) => {
      if (!userInfo) return;

      const itemQuery = query(
        collection(db, "cart", userInfo.uid, "items"),
        where("productId", "==", data.productId)
      );

      const itemSnapshot = await getDocs(itemQuery);
      const itemRef = itemSnapshot.docs[0].ref;

      try {
        if ((way === "up" && count < 10) || (way === "down" && count > 1)) {
          const incrementCount = way === "up" ? 1 : -1;
          await updateDoc(itemRef, {
            count: increment(incrementCount),
          });
          setCount((prev) => prev + incrementCount);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [count, data.productId, userInfo]
  );

  const deleteItem = async () => {
    if (!userInfo) return;

    try {
      await deleteDoc(doc(db, "cart", userInfo.uid, "items", data.productId));
      setNeedRefetch((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex gap-4 justify-between items-center py-4 border-b">
      <button onClick={deleteItem}>
        <BsFillTrash3Fill />
      </button>
      <div className="flex-1">
        <Link
          className="flex gap-4 items-center "
          to={`/products/${data.productId}`}
        >
          <div className="w-20 h-20 bg-slate-200 rounded-md overflow-hidden">
            <img
              src={data.imageUrl}
              alt={data.title + " 이미지"}
              className="block w-full h-full object-cover"
            />
          </div>
          <p className="text-lg font-semibold">{data.title}</p>
        </Link>
      </div>
      <div className="border border-slate-200 border-solid rounded-md w-fit my-4">
        <button
          className="p-3 px-5 active:bg-slate-200"
          onClick={() => updateCount("down")}
        >
          -
        </button>
        <span className="p-4">{count}</span>
        <button
          className="p-3 px-5 active:bg-slate-200"
          onClick={() => updateCount("up")}
        >
          +
        </button>
      </div>
      <span className="text-lg font-semibold min-w-[50px] text-end">
        {data.price.toLocaleString()}
      </span>
    </div>
  );
};

export default CartItem;
