import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { TItem } from "../../types/product";
import useWish from "../../hooks/useWish";

const WishList = () => {
  const { addMutate } = useCart();
  const { wishlist, deleteWishMutate } = useWish();

  return (
    <div className="flex-1 bg-slate-100 p-4 rounded-md h-[380px] overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">wishlist</h3>
      {wishlist.length === 0 && <div>추가한 상품이 없습니다.</div>}
      {wishlist.map((item) => (
        <div
          key={item.productId}
          className="flex items-center bg-white rounded-md p-2 gap-4 mb-4"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title + "이미지"}
              className="block h-full object-cover mx-auto scale-125"
            />
          </div>
          <div className="flex-1 flex justify-between items-center">
            <Link to={`/products/${item.productId}`} className="font-semibold">
              {item.title}
            </Link>

            <div className="flex gap-4 min-w-[100px]">
              <button
                className="active:bg-slate-800 active:text-white p-2 rounded-md"
                onClick={() => addMutate(item as TItem)}
              >
                장바구니
              </button>
              <button
                className="active:bg-slate-800 active:text-white p-2 rounded-md"
                onClick={() => {
                  deleteWishMutate(item.productId);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
1;

export default WishList;
