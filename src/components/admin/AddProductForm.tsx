import {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import Button from "../common/Button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { TItem } from "../../types/product";
const Input = ({ ...props }) => {
  return (
    <input
      className="block w-full bg-slate-100 p-3 rounded-md mb-4"
      {...props}
    />
  );
};
const Textarea = ({ ...props }) => {
  return (
    <textarea
      className="block w-full  bg-slate-100 p-3 rounded-md mb-4"
      {...props}
    />
  );
};

type InputData = {
  [key: string]: string | number | boolean;
};

const AddProductForm = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleDragEnter = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const { files } = e.dataTransfer;
    // 나중에 메모리에서 지워야 하기 때문에
    fileInputRef.current.file = files[0];

    const imgUrl = URL.createObjectURL(files[0]);

    console.log(imgUrl);
  };

  const addData = async (params: TItem) => {
    try {
      const docRef = await addDoc(collection(db, "products"), params);

      if (docRef) {
        // 데이터를 새로 업데이트해서 위의 그리드도 업데이트 시켜야 함
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as InputData;

    const formData = { ...inputData, soldOut: false, createdAt: new Date() };

    addData(formData as TItem);
  }, []);

  const handleBlockText = (e: SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\.*)\./g, "$1");
  };

  const fileInputRef = useRef<any>(null);

  return (
    <div className="w-full h-full">
      <Button
        onClick={() => {
          setOpenAddModal(true);
        }}
      >
        상품 추가하기
      </Button>
      {openAddModal && (
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded-md shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white"
        >
          <button
            className="absolute right-4 top-4"
            onClick={() => {
              setOpenAddModal(false);
            }}
          >
            x
          </button>
          <label htmlFor="imageUrl">
            상품 이미지
            <div
              className="bg-slate-100 w-full h-20 rounded-md"
              onDrop={handleDrop}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                ref={fileInputRef}
                id="imageUrl"
                name="imageUrl"
                required
                accept="image/*"
                className="opacity-0 -z-1"
              />
            </div>
          </label>
          <label>
            상품명
            <Input type="text" name="title" required />
          </label>
          <label>
            상품 설명
            <Textarea type="text" name="description" />
          </label>
          <label>
            가격
            <Input
              type="text"
              name="price"
              onInput={handleBlockText}
              required
            />
          </label>
          <div />
          <Button full="on">추가</Button>
        </form>
      )}
    </div>
  );
};

export default AddProductForm;
