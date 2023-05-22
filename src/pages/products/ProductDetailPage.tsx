import React, { useCallback, useEffect, useState } from "react";
import ContentContainer from "../../components/common/ContentContainer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { useParams } from "react-router-dom";
import { TItem } from "../../types/product";
import ReviewSection from "../../components/products/ReviewSection";
import ProductInfo from "../../components/products/ProductInfo";
import PageTop from "../../components/common/PageTop";

const ProductDetailPage = () => {
  const { id: productId = "" } = useParams();
  const [currentData, setCurrentData] = useState<TItem | null>(null);

  const getData = useCallback(async () => {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    setCurrentData(docSnap.data() as TItem);
  }, [productId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <ContentContainer>
      <PageTop>
        <PageTop.Title>상품 상세</PageTop.Title>
      </PageTop>
      <ProductInfo currentData={currentData} productId={productId} />
      <ReviewSection />
    </ContentContainer>
  );
};

export default ProductDetailPage;
