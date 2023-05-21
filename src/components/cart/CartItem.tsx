import { useCallback, useState } from "react";
import { CartData } from "../../types/cart";
import { Link } from "react-router-dom";
import {
  collection,
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

type Props = {
  data: CartData;
  userInfo: User;
};

type UpdateParam = "up" | "down";

const CartItem = ({ data, userInfo }: Props) => {
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

  return (
    <div className="flex gap-4 justify-between items-center py-4 border-b">
      <input type="checkbox" />
      <div className="flex-1">
        <Link
          className="flex gap-2 items-center "
          to={`/products/${data.productId}`}
        >
          <div className="w-20 h-20 bg-slate-200 rounded-md overflow-hidden">
            <img src={data.imageUrl} alt={data.title + " 이미지"} />
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
      <span className="text-lg font-semibold">
        {data.price.toLocaleString()}
      </span>
    </div>
  );
};

export default CartItem;
