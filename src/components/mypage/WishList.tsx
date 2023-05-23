import React, { useCallback, useEffect, useState } from "react";
import authAtom from "../../recoil/auth/authAtom";
import { useRecoilValue } from "recoil";
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { Link } from "react-router-dom";

const WishList = () => {
  const { userInfo } = useRecoilValue(authAtom);
  const [wishlist, setWishlist] = useState<DocumentData[]>([]);

  const getWishList = useCallback(async () => {
    if (!userInfo) return;

    try {
      const wishlistRef = collection(db, "wish", userInfo.uid, "items");
      const response = await getDocs(wishlistRef);

      const tempList = response.docs.map((doc) => doc.data());
      setWishlist(tempList);
    } catch (err) {
      console.log(err);
    }
  }, [userInfo]);

  useEffect(() => {
    getWishList();
  }, [getWishList]);

  return (
    <div className="flex-1 bg-slate-100 p-4 rounded-md h-[380px] overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">wishlist</h3>
      {wishlist.map((item) => (
        <div
          key={item.productId}
          className="flex items-center bg-white rounded-md p-2 gap-4 mb-4"
        >
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img src={item.imageUrl} alt={item.title + "이미지"} />
          </div>
          <div className="flex-1 flex justify-between">
            <Link to={`/products/${item.productId}`} className="font-semibold">
              {item.title}
            </Link>

            <div className="flex gap-4">
              <button>장바구니</button>
              <button>삭제</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
1;

export default WishList;
