import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../../firebase/initFirebase";
import { useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth/authAtom";
import CartItem from "./CartItem";
import { CartData } from "../../types/cart";

const CartList = () => {
  const { userInfo, isLogin } = useRecoilValue(authAtom);
  const [checked, setChecked] = useState([]); // 이건 내려주면 되고
  const [cartData, setCartData] = useState<DocumentData[]>([]);

  const getData = useCallback(async () => {
    try {
      if (!userInfo || !isLogin) return;
      // userInfo는 변화 관찰이 안돼서 isLogin으로 확인해야함

      const cartRef = collection(db, "cart", userInfo.uid, "items");
      const cartSnapshot = await getDocs(cartRef);

      cartSnapshot.forEach((cartDoc) => {
        setCartData((prev) => [...prev, cartDoc.data()]);
      });
    } catch (err) {
      console.log(err);
    }
  }, [userInfo, isLogin]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex-[2.5]">
      <div className="flex gap-4 justify-between py-4 font-bold text-lg text-slate-400">
        <input type="checkbox" />
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
        />
      ))}
    </div>
  );
};

export default CartList;
