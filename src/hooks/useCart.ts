import React, { useCallback } from "react";
import authAtom from "../recoil/auth/authAtom";
import { useRecoilValue } from "recoil";
import useGlobalModal from "../components/common/modal/useGlobalModal";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/initFirebase";

type OriginalData = {
  [key: string]: unknown;
};

const useCart = () => {
  const { userInfo } = useRecoilValue(authAtom);
  const { setModal } = useGlobalModal();
  const navigate = useNavigate();

  const addCart = useCallback(
    async (productId: string, originalData: OriginalData) => {
      if (!userInfo) {
        setModal("로그인 후 이용해주세요.");
        navigate("/login");
        return;
      }

      const cartRef = doc(db, "cart", userInfo.uid);
      const cartQuery = query(
        collection(db, "cart", userInfo.uid, "items"),
        where("productId", "==", productId)
      );

      const cartSnapshot = await getDocs(cartQuery);
      const isExist = cartSnapshot.docs.length !== 0;

      if (isExist) {
        try {
          const duplicateCheck = confirm(
            "이미 추가된 상품입니다. 추가하시겠습니까?"
          );

          if (!duplicateCheck) return;

          await updateDoc(cartSnapshot.docs[0].ref, {
            count: increment(1),
          });

          setModal("상품이 장바구니에 추가되었습니다.");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await setDoc(doc(cartRef, "items", productId), {
            ...originalData,
            count: 1,
            productId,
          });

          setModal("상품이 장바구니에 추가되었습니다.");
        } catch (err) {
          console.log(err);
          setModal("상품을 추가하지 못했습니다.");
        }
      }
    },
    [navigate, setModal, userInfo]
  );

  return { addCart };
};

export default useCart;
