import React from "react";
import { useRecoilValue } from "recoil";
import useGlobalModal from "../components/common/modal/useGlobalModal";
import authAtom from "../recoil/auth/authAtom";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { TItem } from "../types/product";

type AddWish = (productId: string, originalData: TItem) => void;

const useWish = () => {
  const { isLogin, userInfo } = useRecoilValue(authAtom);
  const { setModal } = useGlobalModal();

  const addWish: AddWish = async (productId, originalData) => {
    if (!userInfo || !isLogin) {
      setModal("로그인 후 이용해주세요.");
      return;
    }

    const wishRef = doc(db, "wish", userInfo.uid);
    const wishQuery = query(
      collection(db, "wish", userInfo.uid, "items"),
      where("productId", "==", productId)
    );

    const wishSnapshot = await getDocs(wishQuery);
    const isExist = wishSnapshot.docs.length !== 0;

    if (isExist) {
      setModal("이미 담은 상품입니다.");

      return;
    } else {
      try {
        await setDoc(doc(wishRef, "items", productId), {
          ...originalData,
          productId,
        });

        setModal("상품이 위시리스트에 추가되었습니다.");
      } catch (err) {
        console.log(err);
        setModal("상품을 추가하지 못했습니다.");
      }
    }
  };

  return { addWish };
};

export default useWish;
