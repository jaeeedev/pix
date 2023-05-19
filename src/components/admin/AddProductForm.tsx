import { FormEvent, SyntheticEvent, useCallback } from "react";
import Button from "../common/Button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/initFirebase";
import { TItem } from "../../types/product";

const Input = ({ ...props }) => {
  return <input className="block bg-slate-100 p-3 rounded-md " {...props} />;
};

type InputData = {
  [key: string]: string | number | boolean;
};

const AddProductForm = () => {
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          상품명
          <Input type="text" name="title" required />
        </label>
        <label>
          상품 설명
          <Input type="text" name="description" />
        </label>
        <label>
          가격
          <Input type="text" name="price" onInput={handleBlockText} required />
        </label>
        <label>
          이미지
          <Input type="text" name="imageUrl" required />
        </label>
        <Button>추가</Button>
      </form>
    </div>
  );
};

export default AddProductForm;
