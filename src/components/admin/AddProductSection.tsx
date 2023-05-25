import {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import ProgressBar from "./ProgressBar";
import Button from "../common/Button";
import ThumbnailSection from "./ThumbnailSection";
import useUpload from "../../hooks/useUpload";

const AddProductSection = () => {
  const { handleUpload, uploadProgress, uploadStatus, setUploadStatus } =
    useUpload();

  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const deleteFile = useCallback(() => {
    URL.revokeObjectURL(thumbnailUrl);
    setCurrentFile(null);
    setThumbnailUrl("");
  }, [thumbnailUrl]);

  const uploadThumbnail = useCallback((file: File) => {
    const imgUrl = URL.createObjectURL(file);

    setCurrentFile(file);
    setThumbnailUrl(imgUrl);
    setUploadStatus("yet");
    const maxSize = 5 * 1024 * 1024;
    const fileSize = file.size;

    if (fileSize > maxSize) {
      alert("파일은 최대 5MB까지 등록 가능합니다.");
      return;
    }
  }, []);

  const handleBlockText = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\.*)\./g, "$1");
  };

  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      try {
        const file = e.target.files?.[0];
        if (!file) return;

        uploadThumbnail(file);
      } catch (err) {
        console.log(err);
      } finally {
        e.target.value = "";
      }
    },
    [uploadThumbnail]
  );

  const handleDragEnter = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragOver = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop = async (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer?.files;

    try {
      if (!files) return;
      const file = files[0];
      uploadThumbnail(file);
    } catch (err) {
      console.log(err);
    } finally {
      const target = e.target as HTMLInputElement;
      target.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const target = e.target as HTMLFormElement;

    if (!currentFile) return;

    await handleUpload(currentFile, target);
    URL.revokeObjectURL(thumbnailUrl);
  };

  return (
    <div>
      <form name="addProduct" onSubmit={handleSubmit}>
        <div className="h-[150px] w-full rounded-md border-dashed border-2 relative hover:border-solid hover:border-blue-400">
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            accept="image/png, image/jpeg"
            className="block w-full h-full cursor-pointer opacity-0"
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onChange={handleChange}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
            <BsFileEarmarkArrowUp
              size={50}
              color={"#ccc"}
              className="mx-auto mb-2"
            />
            <p className="text-slate-400">이미지를 드래그하거나 선택하세요.</p>
          </div>
        </div>
        {thumbnailUrl && (
          <div className="p-4 border border-solid mt-4 flex items-center gap-4 rounded-md">
            <ThumbnailSection
              deleteFile={deleteFile}
              thumbnailUrl={thumbnailUrl}
              currentFile={currentFile}
            />
          </div>
        )}

        {uploadStatus === "progress" && (
          <div className="p-4 border border-solid mt-4 flex items-center gap-4 rounded-md">
            <ProgressBar progress={uploadProgress} />
          </div>
        )}

        {uploadStatus === "end" && (
          <div className="p-4 border border-solid mt-4 flex items-center gap-4 rounded-md">
            <p className="text-sm font-semibold text-teal-400">업로드 완료</p>
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-start gap-4 mt-4">
          <div className="w-full flex-1 mb-4">
            <label className="block font-semibold mb-2" htmlFor="title">
              상품명
            </label>
            <input
              id="title"
              name="title"
              className="block w-full bg-slate-100 p-2 rounded-md"
              type="text"
              required
            />

            <label className="block font-semibold mb-2" htmlFor="price">
              가격
            </label>
            <input
              id="price"
              name="price"
              className="block w-full bg-slate-100 p-2 rounded-md"
              type="text"
              onInput={handleBlockText}
              required
            />
          </div>

          <div className="w-full flex-1 mb-4">
            <label
              className="block `flex-1 font-semibold mb-2"
              htmlFor="description"
            >
              상품 설명
            </label>
            <textarea
              id="description"
              name="description"
              className="block w-full bg-slate-100 rounded-md p-2 min-h-[110px]"
              required
            />
          </div>
        </div>
        <Button>등록</Button>
      </form>
    </div>
  );
};

export default AddProductSection;
