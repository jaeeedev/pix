import React from "react";
import type { Review } from "../../types/review";
import dayjs from "dayjs";

type Props = {
  data: Review;
};
const ReviewItem = ({ data }: Props) => {
  return (
    <li>
      <div className="flex items-start justify-between gap-16 py-3 border-b border-slate-200 mb-4">
        <div className="flex gap-4">
          <span className="font-semibold ">{data.writer}</span>
          <span className="flex-1">{data.text}</span>
        </div>
        <span className="text-slate-400 text-sm mt-1 min-w-fit">
          {dayjs(data.createdAt.toDate()).format("YYYY/MM/DD")}
        </span>
      </div>
    </li>
  );
};

export default ReviewItem;
