import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import PageTop from "../common/PageTop";
import { useRecoilValue } from "recoil";
import authAtom from "../../recoil/auth/authAtom";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { useParams } from "react-router-dom";
import ReviewItem from "./ReviewItem";
import type { Review } from "../../types/review";

const ReviewSection = () => {
  const { id: productId = "" } = useParams();
  const { userInfo } = useRecoilValue(authAtom);
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [refetch, setRefetch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getReviews = useCallback(async () => {
    try {
      if (!userInfo) return;

      const reviewRef = collection(db, "reviews", productId, "review");
      const reviewSnapshot = await getDocs(reviewRef);

      const tempReviewData: Review[] = reviewSnapshot.docs.map((rv) =>
        rv.data()
      );

      setReviewData(tempReviewData);
    } catch (err) {
      console.log(err);
    }
  }, [productId, userInfo]);

  useEffect(() => {
    getReviews();
  }, [getReviews, refetch]);

  const writeReview = async (e: FormEvent) => {
    e.preventDefault();
    const { review: reviewText } = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    );

    try {
      if (!userInfo) return;

      await setDoc(doc(db, "reviews", productId, "review", userInfo.uid), {
        createdAt: new Date(),
        uid: userInfo.uid,
        writer: userInfo.displayName,
        text: reviewText,
        productId,
      });

      setRefetch((prev) => !prev);
      if (!textareaRef.current) return;
      textareaRef.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-44">
      <PageTop>
        <h3 className="text-2xl font-bold mb-4 mt-24">리뷰</h3>
      </PageTop>
      <div className="p-4 border border-solid border-slate-200 rounded-md">
        <ul>
          {reviewData.map((review) => (
            <ReviewItem key={review.uid} data={review} />
          ))}
        </ul>

        <form onSubmit={writeReview}>
          <textarea
            ref={textareaRef}
            className="block w-full bg-slate-100 rounded-md p-4 mb-4"
            name="review"
            placeholder="리뷰를 입력해주세요."
          />
          <button
            className="bg-slate-800 text-white rounded-md p-3 px-8"
            disabled={userInfo ? false : true}
          >
            리뷰 달기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
