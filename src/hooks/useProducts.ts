import React, { useEffect, useState } from "react";
import { TItem } from "../types/product";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

const useProducts = () => {
  const [items, setItems] = useState<TItem[]>([]);
  const getData = async () => {
    const test = await getDocs(collection(db, "products"));

    const itemArr: TItem[] = [];

    test.forEach((doc) => {
      const data: TItem = {
        productId: doc.id,
        ...(doc.data() as Omit<TItem, "productId">),
        createdAt: doc.data().createdAt.toDate(),
      };
      itemArr.push(data);
    });

    setItems(itemArr);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    items,
    setItems,
  };
};

export default useProducts;
