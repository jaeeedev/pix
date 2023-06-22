import { useCallback, useEffect, useState } from "react";
import authAtom from "../../recoil/auth/authAtom";
import { useRecoilValue } from "recoil";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { TItem } from "../../types/product";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import useGlobalModal from "../common/modal/useGlobalModal";

const WishList = () => {
  const { userInfo } = useRecoilValue(authAtom);
  const { addMutate } = useCart();
  const { setModal } = useGlobalModal();

  const queryClient = useQueryClient();
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

  return (
    <div className="flex-1 bg-slate-100 p-4 rounded-md h-[380px] overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">wishlist</h3>
      {wishlist.length === 0 && <div>추가한 상품이 없습니다.</div>}
      {wishlist.map((item) => (
        <div
          key={item.productId}
          className="flex items-center bg-white rounded-md p-2 gap-4 mb-4"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title + "이미지"}
              className="block h-full object-cover mx-auto scale-125"
            />
          </div>
          <div className="flex-1 flex justify-between">
            <Link to={`/products/${item.productId}`} className="font-semibold">
              {item.title}
            </Link>

            <div className="flex gap-4 min-w-[100px]">
              <button onClick={() => addMutate(item as TItem)}>장바구니</button>
              <button onClick={() => deleteWishMutate(item.productId)}>
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
1;

export default WishList;
