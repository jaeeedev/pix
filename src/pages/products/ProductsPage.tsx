import ContentContainer from "../../components/common/ContentContainer";
import PageTitle from "../../components/common/PageTitle";
import ItemSet from "../../components/products/ItemSet";

const ProductsPage = () => {
  return (
    <ContentContainer>
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
