import { useEffect, useRef } from "react";
import ContentContainer from "../../components/common/ContentContainer";
import PageTop from "../../components/common/PageTop";
import ItemSet from "../../components/products/ItemSet";
import useIntersection from "../../hooks/useIntersection";
import { LIMIT } from "../../utills/constants";
import Skeleton from "../../components/products/Skeleton";
import useProducts from "../../hooks/useProducts";

const ProductsPage = () => {
  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(intersectionRef);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useProducts();

  useEffect(() => {
    if (intersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [intersecting, hasNextPage]);

  return (
    <ContentContainer>
      <PageTop>
        <PageTop.Title>상품</PageTop.Title>
      </PageTop>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: LIMIT }).map((_, i) => <Skeleton key={i} />)}
        {!isLoading &&
          data?.pages &&
          data?.pages
            .flat()
            .map((item) => <ItemSet key={item.productId} data={item} />)}
      </div>
      <div
        className="relative w-full h-4 bg-slate-200 opacity-0"
        ref={intersectionRef}
      />
    </ContentContainer>
  );
};

export default ProductsPage;
