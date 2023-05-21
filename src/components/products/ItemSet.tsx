import { Link, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { TItem } from "../../types/product";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth/authAtom";
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
  data: TItem;
};

const ItemSet = ({ data }: Props) => {
  const { isLogin, userInfo } = useRecoilValue(authAtom);
  const { setModal } = useGlobalModal();
  const navigate = useNavigate();

  const addCart = useCallback(async () => {
    if (!userInfo || !isLogin) {
      setModal("로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }

    const cartRef = doc(db, "cart", userInfo.uid);
    const cartQuery = query(
      collection(db, "cart", userInfo.uid, "items"),
      where("param", "==", data.productId)
    );

    const cartSnapshot = await getDocs(cartQuery);
    const isExist = cartSnapshot.docs.length !== 0;

    if (isExist) {
      try {
        const duplicateCheck = confirm(
          "이미 추가된 상품입니다. 추가하시겠습니까?"
        );

        if (!duplicateCheck) return;

        await updateDoc(cartSnapshot.docs[0].ref, {
          count: increment(1),
        });

        setModal("상품이 장바구니에 추가되었습니다.");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await addDoc(collection(cartRef, "items"), {
          ...data,
          count: 1,
          param: data.productId,
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
  }, [data, isLogin, navigate, setModal, userInfo]);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-300 relative">
      <div className="bg-slate-200 w-full h-[200px] overflow-hidden">
        <Link to={`/products/${data.productId}`}>
          <img src={data.imageUrl} alt={`${data.title} 이미지`} />
        </Link>
      </div>
      <div className="p-4">
        <Link to={`/products/${data.productId}`}>
          <p className="font-bold text-xl">{data.title}</p>
        </Link>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-slate-300 text-sm block">price</span>
            <span>{data.price}</span>
          </div>
          <button
            className="rounded-md p-2 bg-slate-500 text-white"
            onClick={addCart}
          >
            <BsFillCartFill size={18} />
          </button>
        </div>
      </div>
      <button className="absolute right-4 top-4 text-slate-500">
        <AiOutlineHeart size={20} />
      </button>
    </div>
  );
};

export default ItemSet;
