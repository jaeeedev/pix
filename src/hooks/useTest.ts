import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { TItem } from "../types/product";
import { LIMIT } from "../utills/constants";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const useTest = () => {
  const productsRef = collection(db, "products");
  const queryClient = useQueryClient();

  const getData = async (pageParam = "") => {
    const startSnapshot =
      pageParam.length !== 0 ? await getDoc(doc(productsRef, pageParam)) : "";
    const productQuery = pageParam
      ? query(
          productsRef,
          orderBy("createdAt", "desc"),
          startAfter(startSnapshot),
          limit(LIMIT)
        )
      : query(productsRef, orderBy("createdAt", "desc"), limit(LIMIT));
    const productsSnapshot = await getDocs(productQuery);

    const itemArr = productsSnapshot.docs.map((doc) => {
      return {
        productId: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      } as TItem;
    });
    return itemArr;
  };

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: ({ pageParam = "" }) => getData(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.at(-1)?.productId;
      },
    });

  return { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading };
};

export default useTest;
