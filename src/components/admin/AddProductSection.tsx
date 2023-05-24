import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { BsFileEarmarkArrowUp } from "react-icons/bs";
import { storage } from "../../firebase/initFirebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

type Metadata = {
  name: string;
  size: number;
};

const AddProductSection = () => {
  const [tempUrl, setTempUrl] = useState<string>("");
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const uploadImage = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const maxSize = 5 * 1024 * 1024;
      const fileSize = file.size;

      if (fileSize > maxSize) {
        alert("파일은 최대 5MB까지 등록 가능합니다.");
        return;
      }

      const storageRef = ref(storage, `temp/${file.name}`);
      await uploadBytes(storageRef, file);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (err) => {
          // 업로드 중 에러
          console.log(err);
        },
        async () => {
          // 업로드 완료 시 콜백
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          if (url) {
            setTempUrl(url);
            setMetadata({
              name: file.name,
              size: file.size,
            });
            console.log("uploaded!");
          }
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      e.target.value = "";
    }
  }, []);

  const handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const { files } = e.dataTransfer;

    console.log(files[0]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form name="addProduct" onSubmit={handleSubmit}>
        <div className="h-[150px] w-full rounded-md border-dashed border-2 relative hover:border-solid hover:border-blue-400">
          <input
            type="file"
            id="fileImage"
            name="fileImage"
            accept="image/png, image/jpeg"
            className="block w-full h-full cursor-pointer opacity-0"
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onChange={uploadImage}
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

        <div className="p-4 border border-solid mt-4 flex items-center gap-4">
          <progress max="100" value={uploadProgress} />
          <span className="text-sm">{uploadProgress} %</span>
        </div>

        <div className="mt-4 flex gap-4 items-center">
          <div className="w-20 h-20 overflow-hidden rounded-full ">
            <img
              className="block w-full h-full object-cover"
              src={tempUrl}
              alt="첨부파일 썸네일"
            />
          </div>
          <div>
            <span>{metadata?.name}</span>
            <p className="text-sm">
              {(metadata?.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start gap-4 mt-4">
          <div className="w-full flex-1">
            <label className="block font-semibold mb-2" htmlFor="productTitle">
              상품명
            </label>
            <input
              id="productTitle"
              className="block w-full bg-slate-100 p-2 rounded-md"
              type="text"
            />

            <label className="block font-semibold mb-2" htmlFor="productPrice">
              가격
            </label>
            <input
              id="productPrice"
              className="block w-full bg-slate-100 p-2 rounded-md"
              type="text"
            />
          </div>

          <div className="w-full flex-1 mb-4">
            <label
              className="block `flex-1 font-semibold mb-2"
              htmlFor="productDescription"
            >
              상품 설명
            </label>
            <textarea
              id="productDescription"
              className="block w-full bg-slate-100 rounded-md"
            />
          </div>
        </div>
        <button className="p-2 px-6 bg-slate-400">등록</button>
      </form>
    </div>
  );
};

export default AddProductSection;
