import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../firebase/initFirebase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

type UploadStatus = "yet" | "progress" | "end";

const useUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("yet");

  const handleUpload = async (file: File, target: HTMLFormElement) => {
    setUploadProgress(0);
    setUploadStatus("progress");
    const storageRef = ref(storage, `products/${uuidv4()}`);
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
          console.log("이미지 업로드 완료");

          try {
            const formData = Object.fromEntries(new FormData(target));

            const productData = {
              ...formData,
              createdAt: new Date(),
              soldOut: false,
              imageUrl: url,
              price: Number(formData.price),
            };

            const response = await addDoc(
              collection(db, "products"),
              productData
            );

            if (response) console.log("상품 등록 완료");
            setUploadStatus("end");
            target.reset();
          } catch (err) {
            console.log(err);
            setUploadStatus("yet");
          }
        }
      }
    );
  };

  return { uploadProgress, handleUpload, uploadStatus, setUploadStatus };
};

export default useUpload;
