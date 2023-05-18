import ContentContainer from "../../components/common/ContentContainer";
import PageTitle from "../../components/common/PageTitle";
import ItemSet from "../../components/products/ItemSet";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../main";

const ProductsPage = () => {
  const getData = async () => {
    const test = await getDocs(collection(db, "products"));

    test.forEach((doc) => {
      console.log(doc.data());
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContentContainer>
      <div className="mt-10" />
      <PageTitle>상품</PageTitle>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <ItemSet />
        <ItemSet />
        <ItemSet />
        <ItemSet />
        <ItemSet />
        <ItemSet />
        <ItemSet />
      </div>
    </ContentContainer>
  );
};

export default ProductsPage;
