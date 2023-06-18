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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TItem } from "../types/product";

const useCart = () => {
  const { userInfo } = useRecoilValue(authAtom);
  const { setModal } = useGlobalModal();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addCart = useCallback(
    async (data: TItem) => {
      if (!userInfo) {
        setModal("로그인 후 이용해주세요.");
        navigate("/login");
        return;
      }

      const cartRef = doc(db, "cart", userInfo.uid);
      const cartQuery = query(
        collection(db, "cart", userInfo.uid, "items"),
        where("productId", "==", data.productId)
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
          await setDoc(doc(cartRef, "items", data.productId), {
            ...data,
            count: 1,
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

  const { mutate: addMutate } = useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [userInfo?.uid, "cart"],
        refetchType: "all",
      });
    },
  });

  return { addMutate };
};

export default useCart;
