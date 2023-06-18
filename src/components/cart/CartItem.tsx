import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { CartData } from "../../types/cart";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { User } from "firebase/auth";
import { BsFillTrash3Fill } from "react-icons/bs";
import useGlobalModal from "../common/modal/useGlobalModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  data: CartData;
  userInfo: User | null;
  cartList: CartData[];
};

type UpdateParam = "up" | "down";

const CartItem = ({ data, userInfo, cartList }: Props) => {
  const { setModal } = useGlobalModal();

  const queryClient = useQueryClient();

  const updateCount = useCallback(
    async (info: { way: UpdateParam; currentCount: number }) => {
      if (!userInfo) return;

      const itemQuery = query(
        collection(db, "cart", userInfo.uid, "items"),
        where("productId", "==", data.productId)
      );

      const itemSnapshot = await getDocs(itemQuery);
      const itemRef = itemSnapshot.docs[0].ref;

      if (
        (info.way === "up" && info.currentCount < 10) ||
        (info.way === "down" && info.currentCount > 1)
      ) {
        const incrementCount = info.way === "up" ? 1 : -1;
        try {
          const response = await updateDoc(itemRef, {
            count: increment(incrementCount),
          });

          return response;
        } catch (err) {
          console.log(err);
          setModal("수량 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
          return;
        }
      }
    },
    [data.productId, setModal, userInfo]
  );

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateCount,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [userInfo?.uid, "cart"],
      }),
  });

  const deleteItem = async () => {
    if (!userInfo) return;

    try {
      await deleteDoc(doc(db, "cart", userInfo.uid, "items", data.productId));
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteItem,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [userInfo?.uid, "cart"] });

      const prevCartList = queryClient.getQueryData([userInfo?.uid, "cart"]);
      const targetIndex = cartList.findIndex(
        (cart) => cart.productId === data.productId
      );
      const alterList = [...cartList];
      alterList.splice(targetIndex, 1);

      queryClient.setQueryData([userInfo?.uid, "cart"], alterList);

      return { prevCartList };
    },
    onError: (err, val, context) => {
      queryClient.setQueryData([userInfo?.uid, "cart"], context?.prevCartList);
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [userInfo?.uid, "cart"],
      }),
  });

  return (
    <div className="flex gap-4 justify-between items-center py-4 border-b">
      <button onClick={() => deleteMutate()}>
        <BsFillTrash3Fill />
      </button>
      <div className="flex-1">
        <Link
          className="flex gap-4 items-center "
          to={`/products/${data.productId}`}
        >
          <div className="min-w-[80px] w-20 h-20 bg-slate-200 rounded-md overflow-hidden">
            <img
              src={data.imageUrl}
              alt={data.title + " 이미지"}
              className="block w-full h-full object-cover"
            />
          </div>
          <p className="text-lg font-semibold">{data.title}</p>
        </Link>
      </div>
      <div className="border border-slate-200 border-solid rounded-md w-fit my-4">
        <button
          className="p-3 px-5 active:bg-slate-200"
          onClick={() =>
            updateMutate({ way: "down", currentCount: data.count })
          }
        >
          -
        </button>
        <span className="p-4">{data.count}</span>
        <button
          className="p-3 px-5 active:bg-slate-200"
          onClick={() => updateMutate({ way: "up", currentCount: data.count })}
        >
          +
        </button>
      </div>
      <span className="text-lg font-semibold min-w-[50px] text-end">
        {data.price.toLocaleString()}
      </span>
    </div>
  );
};

export default CartItem;
