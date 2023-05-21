import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { db } from "../../firebase/initFirebase";
import { useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth/authAtom";

const CartList = () => {
  const { userInfo } = useRecoilValue(authAtom);
  const [checked, setChecked] = useState([]); // 이건 내려주면 되고

  const getData = async () => {
    console.log(userInfo);
    try {
      if (!userInfo) return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex-[2.5]">
      <div className="flex gap-4 justify-between py-4 font-bold text-lg text-slate-400">
        <input type="checkbox" />
        <span className="flex-1">product</span>
        <span className="min-w-[150px]">quantity</span>
        <span>price</span>
      </div>
      <hr />
    </div>
  );
};

export default CartList;
