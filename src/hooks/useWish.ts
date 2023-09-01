import { useRecoilValue } from "recoil";
import useGlobalModal from "../components/common/modal/useGlobalModal";
import authAtom from "../recoil/auth/authAtom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { TItem } from "../types/product";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const useWish = () => {
  const queryClient = useQueryClient();

  const { isLogin, userInfo } = useRecoilValue(authAtom);
  const { setModal } = useGlobalModal();

  const getWishList = useCallback(async () => {
    if (!userInfo) return;

    try {
      const wishlistRef = collection(db, "wish", userInfo.uid, "items");
      const response = await getDocs(wishlistRef);
      return response;
    } catch (err) {
      console.log(err);
      setModal("오류가 발생했습니다. 잠시 후 다시 실행해주세요.");
    }
  }, [userInfo]);

  const { data: wishlist = [] } = useQuery({
    queryFn: getWishList,
    queryKey: [userInfo?.uid, "wishlist"],
    select: (data) => {
      return data?.docs.map((doc) => doc.data());
    },
    enabled: !!userInfo?.uid,
  });

  const addWish = async (data: TItem) => {
    if (!userInfo || !isLogin) {
      setModal("로그인 후 이용해주세요.");
      return;
    }

    const wishRef = doc(db, "wish", userInfo.uid);
    const wishQuery = query(
      collection(db, "wish", userInfo.uid, "items"),
      where("productId", "==", data.productId)
    );

    const wishSnapshot = await getDocs(wishQuery);
    const isExist = wishSnapshot.docs.length !== 0;

    if (isExist) {
      setModal("이미 담은 상품입니다.");
      return;
    } else {
      try {
        const response = await setDoc(doc(wishRef, "items", data.productId), {
          ...data,
        });

        setModal("상품이 위시리스트에 추가되었습니다.");
        return response;
      } catch (err) {
        console.log(err);
        setModal("상품을 추가하지 못했습니다.");
      }
    }
  };

  const { mutate: addWishMutate } = useMutation({
    mutationFn: addWish,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [userInfo?.uid, "wishlist"],
        refetchType: "all",
      }),
  });

  const deleteWishItem = useCallback(
    async (id: string) => {
      if (!userInfo) return;
      try {
        await deleteDoc(doc(db, "wish", userInfo.uid, "items", id));
      } catch (err) {
        console.log(err);
        setModal("오류가 발생했습니다. 잠시 후 다시 실행해주세요.");
        return;
      }
    },
    [userInfo]
  );

  const { mutate: deleteWishMutate } = useMutation({
    mutationFn: deleteWishItem,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [userInfo?.uid, "wishlist"],
      }),
  });

  return { addWishMutate, deleteWishMutate, wishlist };
};

export default useWish;
