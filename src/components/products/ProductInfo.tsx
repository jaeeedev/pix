import { useCallback, useState } from "react";
import { TItem } from "../../types/product";
import authAtom from "../../recoil/auth/authAtom";
import { useRecoilValue } from "recoil";
import useGlobalModal from "../common/modal/useGlobalModal";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/initFirebase";

type Props = {
  currentData: TItem | null;
  currentParam: string;
};

const ProductInfo = ({ currentData, currentParam }: Props) => {
  const { isLogin, userInfo } = useRecoilValue(authAtom);
  const { setModal } = useGlobalModal();

  const [count, setCount] = useState<number>(1);
  const countDown = useCallback(() => {
    setCount((prev) => Math.max(1, prev - 1));
  }, []);
  const countUp = useCallback(() => {
    setCount((prev) => Math.min(10, prev + 1));
  }, []);

  const addCart = async () => {
    if (!userInfo || !isLogin) {
      setModal("로그인 후 이용해주세요.");
      return;
    }

    const cartRef = doc(db, "cart", userInfo.uid);
    const cartQuery = query(
      collection(db, "cart", userInfo.uid, "items"),
      where("param", "==", currentParam)
    );

    const cartSnapshot = await getDocs(cartQuery);
    const isExist = cartSnapshot.docs.length !== 0;

    // cart(컬)/[uid](문)/items(컬)/상품 데이터들(문)

    if (isExist) {
      try {
        await updateDoc(cartSnapshot.docs[0].ref, {
          count: increment(count),
        });

        setModal("상품이 장바구니에 추가되었습니다.");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await addDoc(collection(cartRef, "items"), {
          ...currentData,
          count,
        });

        console.log(response);
        if (response) {
          setModal("상품이 장바구니에 추가되었습니다.");
        }
      } catch (err) {
        console.log(err);
        setModal("상품을 추가하지 못했습니다.");
      }
    }
  };

  const addWish = async () => {
    if (!userInfo || !isLogin) {
      setModal("로그인 후 이용해주세요.");
      return;
    }

    const wishRef = doc(db, "wish", userInfo.uid);
    const wishQuery = query(
      collection(db, "wish", userInfo.uid, "items"),
      where("param", "==", currentParam)
    );

    const wishSnapshot = await getDocs(wishQuery);
    const isExist = wishSnapshot.docs.length !== 0;

    if (isExist) {
      setModal("이미 담은 상품입니다.");

      return;
    } else {
      try {
        const response = await addDoc(collection(wishRef, "items"), {
          ...currentData,
        });

        if (response) {
          setModal("상품이 위시리스트에 추가되었습니다.");
        }
      } catch (err) {
        console.log(err);
        setModal("상품을 추가하지 못했습니다.");
      }
    }
  };

  return (
    <div className="sm:flex gap-4 sm:mb-4">
      <div className="max-h-[300px] overflow-hidden rounded-md flex-1 mb-4 sm:mb-0">
        <img src={currentData?.imageUrl} alt={currentData?.title + " 이미지"} />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-2xl font-bold mb-2">{currentData?.title}</h3>
        <p>{currentData?.description}</p>
        <div className="text-2xl font-bold my-4">{currentData?.price}</div>
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
            onClick={addWish}
          >
            wish
          </button>
          <button
            className="flex-1 p-4 border-solid border border-slate-200 rounded-md active:bg-slate-200"
            onClick={addCart}
          >
            cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
