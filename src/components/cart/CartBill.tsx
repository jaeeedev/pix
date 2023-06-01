import Children from "../../types/children";
import { CartData } from "../../types/cart";
import Button from "../common/Button";
import { twMerge } from "tailwind-merge";

const BillTextWrapper = ({ children }: Children) => {
  return <div className="flex justify-between py-2">{children}</div>;
};

type Props = {
  cartData: CartData[];
};

const CartBill = ({ cartData }: Props) => {
  const cartSum = cartData.reduce((acc, cur) => acc + cur.price * cur.count, 0);
  const fee = 3000;
  const total = (cartSum + fee).toLocaleString();
  return (
    <div className="w-full m-0 md:flex-[1] p-4 rounded-md border border-solid border-slate-200 h-fit">
      <BillTextWrapper>
        <Span light="on">상품 합계</Span>
        <Span>{cartSum.toLocaleString()}</Span>
      </BillTextWrapper>
      <BillTextWrapper>
        <Span light="on">배송비</Span>
        <Span light="on">{fee.toLocaleString()}</Span>
      </BillTextWrapper>
      <hr />

      <div className="flex justify-between py-4">
        <Span>total</Span>
        <Span extend="text-xl">{total}</Span>
      </div>

      <Button full="on">구매하기</Button>
    </div>
  );
};

export default CartBill;

type TSpan = Children & {
  light?: "on" | "off";
  extend?: string;
};

const Span = ({ children, light, extend }: TSpan) => {
  return (
    <span
      className={twMerge(
        `font-medium text-lg  ${light === "on" && "text-slate-400"}`,
        extend
      )}
    >
      {children}
    </span>
  );
};
