import ContentContainer from "../../components/common/ContentContainer";
import PageTitle from "../../components/common/PageTitle";
import ItemSet from "../../components/products/ItemSet";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../main";
import { TItem } from "../../types/product";

const ProductsPage = () => {
  const [items, setItems] = useState<TItem[]>([]);
  const getData = async () => {
    const test = await getDocs(collection(db, "products"));

    const itemArr: TItem[] = [];

    test.forEach((doc) => {
      const data: TItem = {
        productId: doc.id,
        ...(doc.data() as Omit<TItem, "productId">),
      };
      console.log(data);
      itemArr.push(data);
    });

    setItems(itemArr);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ContentContainer>
      <div className="mt-10" />
      <PageTitle>상품</PageTitle>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ItemSet key={item.productId} data={item} />
        ))}
      </div>
    </ContentContainer>
  );
};

export default ProductsPage;
