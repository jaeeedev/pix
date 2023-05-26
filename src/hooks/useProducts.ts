import React, { RefObject, useCallback, useEffect, useState } from "react";
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

const useProducts = (targetRef: RefObject<HTMLDivElement>) => {
  const [items, setItems] = useState<TItem[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData>>();
  const [intersection, setIntersection] = useState(false);
  const [end, setEnd] = useState(false);

  const productsRef = collection(db, "products");
  const LIMIT = 12;

  const getFirstData = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  const getMoreData = useCallback(async () => {
    try {
      const nextQuery = query(
        productsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(LIMIT)
      );

      const nextSnapshot = await getDocs(nextQuery);
      if (nextSnapshot.empty === true) {
        setEnd(true);
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
    } catch (err) {
      console.log(err);
    }
  }, [lastVisible, productsRef]);

  useEffect(() => {
    if (!targetRef.current) return;

    const callback: IntersectionObserverCallback = ([entry], observer) => {
      if (entry.isIntersecting) {
        setIntersection(true);
      } else {
        setIntersection(false);
      }
    };
    const observer = new IntersectionObserver(callback);
    observer.observe(targetRef.current);
  }, [targetRef]);

  useEffect(() => {
    getFirstData();
  }, []);

  useEffect(() => {
    if (items.length === 0 || end) return;
    getMoreData();
  }, [intersection, end]);

  return {
    items,
    setItems,
  };
};

export default useProducts;
