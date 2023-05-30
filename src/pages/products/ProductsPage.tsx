import { useRef } from "react";
import ContentContainer from "../../components/common/ContentContainer";
import PageTop from "../../components/common/PageTop";
import ItemSet from "../../components/products/ItemSet";
import useProducts from "../../hooks/useProducts";

const ProductsPage = () => {
  const intersectionRef = useRef<HTMLDivElement>(null);
  const { items } = useProducts(intersectionRef);
  return (
    <ContentContainer>
      <PageTop>
        <PageTop.Title>상품</PageTop.Title>
      </PageTop>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ItemSet key={item.productId} data={item} />
        ))}
      </div>
      <div
        className="relative -bottom-10 left-0 w-full h-4"
        ref={intersectionRef}
      />
    </ContentContainer>
  );
};

export default ProductsPage;
