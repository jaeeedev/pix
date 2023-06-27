import { useCallback, useState } from "react";
import { TItem } from "../../types/product";
import useCart from "../../hooks/useCart";
import useWish from "../../hooks/useWish";

type Props = {
  currentData: TItem | null;
  productId: string;
};

const ProductInfo = ({ currentData, productId }: Props) => {
  const [count, setCount] = useState<number>(1);
  const countDown = useCallback(() => {
    setCount((prev) => Math.max(1, prev - 1));
  }, []);
  const countUp = useCallback(() => {
    setCount((prev) => Math.min(10, prev + 1));
  }, []);

  const { addMutate } = useCart();
  const { addWishMutate } = useWish();

  return (
    <div className="sm:flex gap-4 sm:mb-4">
      <div className="max-h-[300px] overflow-hidden rounded-md flex-1 mb-4 sm:mb-0">
        <img
          src={currentData?.imageUrl}
          alt={currentData?.title + " 이미지"}
          className="block h-[300px] object-cover mx-auto drop-shadow-md transition duration-150 hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-2xl font-bold mb-2">{currentData?.title}</h3>
        <p>{currentData?.description}</p>
        <div className="text-2xl font-bold my-4">
          {currentData?.price.toLocaleString()}&nbsp;원
        </div>
        <hr />

        <div className="border border-slate-200 border-solid rounded-md w-fit my-4">
          <button className="p-4 px-6 active:bg-slate-200" onClick={countDown}>
            -
          </button>
          <span className="p-4">{count}</span>
          <button className="p-4 px-6 active:bg-slate-200" onClick={countUp}>
            +
          </button>
        </div>

        <div className="flex gap-4">
          <button
            className="flex-1 p-4 border-solid border border-slate-200 rounded-md active:bg-slate-200"
            onClick={() => {
              if (!currentData) return;
              const wishData = { ...currentData, productId };
              addWishMutate(wishData);
            }}
          >
            wish
          </button>
          <button
            className="flex-1 p-4 bg-slate-800 border-solid border border-slate-800 text-white rounded-md"
            onClick={() => {
              if (!currentData) return;

              const cartItemData = {
                ...currentData,
                productId,
              };

              addMutate(cartItemData);
            }}
          >
            cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
