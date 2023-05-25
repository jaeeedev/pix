import { BiX } from "react-icons/bi";

type Props = {
  thumbnailUrl: string;
  currentFile: File | null;
  deleteFile: () => void;
};

const ThumbnailSection = ({ thumbnailUrl, currentFile, deleteFile }: Props) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div className="w-20 h-20 overflow-hidden rounded-full">
          <img
            className="block w-full h-full object-cover"
            src={thumbnailUrl}
            alt="첨부파일 썸네일"
          />
        </div>
        <div>
          <span>{currentFile?.name}</span>
          <p className="text-sm">
            {((currentFile?.size || 0) / (1024 * 1024)).toFixed(2) + "MB"}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="overflow-hidden rounded-full hover:bg-slate-200 active:bg-slate-100"
        onClick={deleteFile}
      >
        <BiX size={30} color="#333" />
      </button>
    </div>
  );
};

export default ThumbnailSection;
