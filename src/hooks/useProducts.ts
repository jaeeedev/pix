import React, { useEffect, useState } from "react";
import { TItem } from "../types/product";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/initFirebase";

const useProducts = () => {
  const [items, setItems] = useState<TItem[]>([]);
  const getData = async () => {
    const productsRef = collection(db, "products");
    const sortQuery = query(
      productsRef,
      orderBy("createdAt", "desc"),
      limit(10)
    );
    const products = await getDocs(sortQuery);
    console.log(sortQuery);

    const itemArr = products.docs.map((doc) => {
      return {
        productId: doc.id,
        ...(doc.data() as Omit<TItem, "productId">),
        createdAt: doc.data().createdAt.toDate(),
      };
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
