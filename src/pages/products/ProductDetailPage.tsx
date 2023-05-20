import React, { useCallback, useEffect, useState } from "react";
import ContentContainer from "../../components/common/ContentContainer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { useParams } from "react-router-dom";
import { TItem } from "../../types/product";
import ReviewSection from "../../components/products/ReviewSection";
import ProductInfo from "../../components/products/ProductInfo";

const ProductDetailPage = () => {
  const { id: productId = "" } = useParams();
  const [currentData, setCurrentData] = useState<TItem | null>(null);
  const [currentParam, setCurrentParam] = useState<string>("");

  const getData = useCallback(async () => {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    setCurrentData(docSnap.data() as TItem);
    setCurrentParam(docSnap.id);
  }, [productId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <ContentContainer>
      <ProductInfo currentData={currentData} currentParam={currentParam} />
      <ReviewSection />
    </ContentContainer>
  );
};

export default ProductDetailPage;
