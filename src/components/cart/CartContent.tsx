import { DocumentData, collection, getDocs } from "firebase/firestore";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";

import CartList from "./CartList";
import CartBill from "./CartBill";
import authAtom from "../../recoil/auth/authAtom";
import { db } from "../../firebase/initFirebase";
import { CartData } from "../../types/cart";
import { useQuery } from "@tanstack/react-query";

const CartContent = () => {
  const { userInfo, isLogin } = useRecoilValue(authAtom);

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

      return cartDataList;
    } catch (err) {
      console.log(err);
    }
  }, [userInfo, isLogin]);

  const {
    data = [],
    status,
    fetchStatus,
  } = useQuery({
    queryFn: getData,
    queryKey: [userInfo?.uid, "cart"],
    enabled: !!userInfo?.uid,
  });

  if (!userInfo) return <div>로그인 후 사용할 수 있습니다.</div>;

  if (status === "loading" && fetchStatus === "fetching")
    return <p>로딩중입니다.</p>;

  return (
    <div className="flex flex-col gap-8 justify-between md:flex-row">
      <CartList cartData={data} userInfo={userInfo} />
      <CartBill cartData={data as CartData[]} />
    </div>
  );
};

export default CartContent;
