import React from "react";
import PageTop from "../common/PageTop";

const ReviewSection = () => {
  const writeReview = async () => {
    try {
      await setDoc(doc(db, "reviews", productId, userInfo.uid, "review"), {
        createdAt: new Date(),
        writer: userInfo.uid,
        text: "폼에있는 텍스트 옮기고",
        productId,
      });
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
        <div>
          <div className="flex items-start justify-between gap-16 py-3 border-b border-slate-200 mb-4">
            <div className="flex gap-4">
              <span className="font-semibold ">박 닉네임</span>
              <span className="flex-1">
                이건 정말 멋집니다. 정말 정말 멋져요! 이건 정말 멋집니다. 정말
                정말 멋져요!이건 정말 멋집니다. 정말 정말 멋져요!이건 정말
                멋집니다. 정말 정말 멋져요!이건 정말 멋집니다. 정말 정말
                멋져요!이건 정말 멋집니다. 정말 정말 멋져요!이건 정말 멋집니다.
                정말 정말 멋져요!
              </span>
            </div>
            <span className="text-slate-400 text-sm mt-1 min-w-fit">
              1 weeks ago
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-start justify-between gap-16 py-3 border-b border-slate-200 mb-4">
            <div className="flex gap-4">
              <span className="font-semibold max-w-[100px]">
                ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
              </span>
              <span className="flex-1">
                지금은8시28분 엄청잠온다 그리고 나는 생각해야한다 시간을 어떻게
                띄울지,,
              </span>
            </div>
            <span className="text-slate-400 text-sm mt-1 min-w-fit">
              1 weeks ago
            </span>
          </div>
        </div>

        <form>
          <textarea
            className="block w-full bg-slate-100 rounded-md p-4 mb-4"
            placeholder="리뷰를 입력해주세요."
          />
          <button className="bg-slate-800 text-white rounded-md p-3 px-8">
            리뷰 달기
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
