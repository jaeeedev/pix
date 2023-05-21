import CartList from "./CartList";
import CartBill from "./CartBill";

const CartContent = () => (
  /* 여기서 데이터 관리하고 데이터는 밑으로 내리기*/
  <div className="flex flex-col gap-8 justify-between md:flex-row">
    <CartList />
    <CartBill />
  </div>
);

export default CartContent;
