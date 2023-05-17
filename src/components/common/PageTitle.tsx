import Children from "../../types/children";

const PageTitle = ({ children }: Children) => {
  return <h2 className="text-2xl font-bold mb-4">{children}</h2>;
};

export default PageTitle;
