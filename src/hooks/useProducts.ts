import { RefObject, useCallback, useEffect, useState } from "react";
import { TItem } from "../types/product";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/initFirebase";
import { LIMIT } from "../utills/constants";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  targetRef?: RefObject<HTMLDivElement>;
};

const useProducts = ({ targetRef }: Props) => {
  const [items, setItems] = useState<TItem[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);

  const queryClient = useQueryClient();
  const productsRef = collection(db, "products");

  const getFirstData = async () => {
    try {
      setLoading(true);
      const sortQuery = query(
        productsRef,
        orderBy("createdAt", "desc"),
        limit(LIMIT)
      );
      const productsSnapshot = await getDocs(sortQuery);

      const itemArr = productsSnapshot.docs.map((doc) => {
        return {
          productId: doc.id,
          ...(doc.data() as Omit<TItem, "productId">),
          createdAt: doc.data().createdAt.toDate(),
        };
      });

      setLastVisible(productsSnapshot.docs[productsSnapshot.docs.length - 1]);
      setItems(itemArr);
      setLoading(false);

      return itemArr;
    } catch (err) {
      console.log(err);
    }
  };

  const getMoreData = useCallback(async () => {
    try {
      if (loading || !lastVisible) return;

      setLoading(true);
      const nextQuery = query(
        productsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(LIMIT)
      );

      const nextSnapshot = await getDocs(nextQuery);
      if (nextSnapshot.empty) {
        // 가져올 다음 스냅샷이 없으면 리턴 -> 다시 요청하면 계속 여기서 반복됨 -> disconnect로 관찰 중지
        setEnd(true);
        setLoading(false);
        return;
      }

      const nextArr = nextSnapshot.docs.map((doc) => {
        return {
          productId: doc.id,
          ...(doc.data() as Omit<TItem, "productId">),
          createdAt: doc.data().createdAt.toDate(),
        };
      });

      setItems((prev) => prev.concat(nextArr));
      setLastVisible(nextSnapshot.docs[nextSnapshot.docs.length - 1]);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, [loading, lastVisible, productsRef]);

  useEffect(() => {
    if (!targetRef?.current) return;

    const callback: IntersectionObserverCallback = ([entry]) => {
      if (entry.isIntersecting && !loading && !end) {
        getMoreData();
      }
    };
    const observer = new IntersectionObserver(callback);
    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, loading, end]);

  useEffect(() => {
    getFirstData();
  }, []);

  return {
    items,
    setItems,
    getFirstData,
  };
};

export default useProducts;
