import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
};

const ContentContainer = ({ children, ...props }: Props) => {
  const { className } = props;
  return (
    <div className={twMerge("max-w-5xl mx-auto p-4 lg:px-0 ", className)}>
      {children}
    </div>
  );
};

export default ContentContainer;
