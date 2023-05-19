import { SyntheticEvent, useCallback } from "react";

const Input = ({ ...props }) => {
  return <input className="block bg-slate-100 p-3 rounded-md " {...props} />;
};

type InputData = {
  [key: string]: string | number | boolean;
};

const AddProductForm = () => {
  const handleSubmit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    const inputData = Object.fromEntries(
      new FormData(e.target as HTMLFormElement)
    ) as InputData;

    const formData = { ...inputData, soldOut: false, createdAt: new Date() };

    console.log(formData);
  }, []);

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
          <Input type="text" name="price" required />
        </label>
        <label>
          이미지
          <Input type="text" name="imageUrl" required />
        </label>
        <button>추가</button>
      </form>
    </div>
  );
};

export default AddProductForm;
