import ContentContainer from "../../components/common/ContentContainer";
import PageTitle from "../../components/common/PageTitle";
import ItemSet from "../../components/products/ItemSet";
import useProducts from "../../hooks/useProducts";

const ProductsPage = () => {
  const { items } = useProducts();
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
