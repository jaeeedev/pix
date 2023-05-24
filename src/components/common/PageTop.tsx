import Children from "../../types/children";
import { twMerge } from "tailwind-merge";

const PageTop = ({ children }: Children) => {
  return <div className={twMerge("mt-12 mb-4")}>{children}</div>;
};

const Title = ({ children, ...props }: Children) => {
  return (
    <h2 {...props} className="text-3xl font-bold mb-2">
      {children}
    </h2>
  );
};

const Description = ({ children }: Children) => {
  return <p>{children}</p>;
};

export default PageTop;

PageTop.Title = Title;
PageTop.Description = Description;
