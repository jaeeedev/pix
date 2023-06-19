import { useEffect, useState } from "react";
import ContentContainer from "../../components/common/ContentContainer";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { TItem } from "../../types/product";
import PageTop from "../../components/common/PageTop";
import ItemSet from "../../components/products/ItemSet";
import monetAvif from "../../assets/image/monet.avif";
import monetWebp from "../../assets/image/monet.webp";
import monetPng from "../../assets/image/monet.png";
import { Link } from "react-router-dom";
const MainPage = () => {
  const productsRef = collection(db, "products");
  // 상품 4개 가져오기
  const [newProduct, setNewProduct] = useState<TItem[]>([]);

  const LIMIT = 4;
  const getData = async () => {
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
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        } as TItem;
      });
      setNewProduct(itemArr);
    } catch (err) {
      console.log(err);
      return;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <ContentContainer>
        <div className="h-[250px] bg-slate-200 rounded-md mb-8 overflow-hidden relative">
          <Link to="/products/dSLryNGGqZqCdfNTdHdN">
            <picture>
              <source srcSet={monetAvif} type="image/avif" />
              <source srcSet={monetWebp} type="image/webp" />
              <img
                src={monetPng}
                alt="모네 이미지"
                className="block w-full h-full object-cover"
              />
            </picture>
            <div className="absolute top-0 left-0 w-full h-full p-4 flex flex-col justify-end text-white bg-gradient-to-t from-slate-800/70">
              <span className="font-bold text-xl mb-2">
                Berges De La Seine Près De Vétheuil (1881)
              </span>
              <p>모네의 작품을 폰케이스로 만나보세요.</p>
            </div>
          </Link>
        </div>

        <div className="mb-8">
          <PageTop>
            <PageTop.Title>신상품</PageTop.Title>
            <PageTop.Description>
              새로 들어온 상품들을 확인해보세요.
            </PageTop.Description>
          </PageTop>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {newProduct.map((product) => {
              return (
                <div className="relative" key={product.productId}>
                  <ItemSet data={product} />
                  <ItemSet.Label>NEW</ItemSet.Label>
                </div>
              );
            })}
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default MainPage;
