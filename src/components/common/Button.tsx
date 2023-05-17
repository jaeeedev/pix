import Children from "../../types/children";
import { twMerge } from "tailwind-merge";

type ButtonProps = Children & {
  className?: string;
  full?: boolean;
};

/**
 * `full` : 버튼의 width가 100%
 */
const Button = ({ children, ...props }: ButtonProps) => {
  const { full } = props;
  return (
    <button
      className={twMerge(
        `px-8 py-4 bg-slate-500 text-white rounded-md ${!!full && "w-full"}`
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
