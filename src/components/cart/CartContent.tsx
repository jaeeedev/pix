import { DocumentData, collection, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import CartList from "./CartList";
import CartBill from "./CartBill";
import authAtom from "../../recoil/auth/authAtom";
import { db } from "../../firebase/initFirebase";
import { CartData } from "../../types/cart";

const CartContent = () => {
  /* 여기서 데이터 관리하고 데이터는 밑으로 내리기*/
  const { userInfo, isLogin } = useRecoilValue(authAtom);
  const [cartData, setCartData] = useState<DocumentData[]>([]);
  const [needRefetch, setNeedRefetch] = useState(false);

  const getData = useCallback(async () => {
    try {
      if (!userInfo || !isLogin) return;
      // userInfo는 변화 관찰이 안돼서 isLogin으로 확인해야함

      const cartRef = collection(db, "cart", userInfo.uid, "items");
      const cartSnapshot = await getDocs(cartRef);

      const cartDataList: DocumentData[] = [];
      cartSnapshot.forEach((cartDoc) => {
        cartDataList.push(cartDoc.data());
      });

      setCartData(cartDataList);
    } catch (err) {
      console.log(err);
    }
  }, [userInfo, isLogin]);

  useEffect(() => {
    getData();
  }, [getData, needRefetch]);

  return (
    <div className="flex flex-col gap-8 justify-between md:flex-row">
      <CartList
        cartData={cartData}
        userInfo={userInfo}
        setNeedRefetch={setNeedRefetch}
      />
      <CartBill cartData={cartData as CartData[]} />
    </div>
  );
};

export default CartContent;
