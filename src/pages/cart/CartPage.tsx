import CartContent from "../../components/cart/CartContent";
import PageTop from "../../components/common/PageTop";

const CartPage = () => {
  return (
    <div className="max-w-[1160px] mx-auto px-4 lg:p-0">
      <PageTop>
        <PageTop.Title>장바구니</PageTop.Title>
      </PageTop>

      <CartContent />
    </div>
  );
};

export default CartPage;
