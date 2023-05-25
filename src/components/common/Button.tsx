import Children from "../../types/children";
import { twMerge } from "tailwind-merge";

type ButtonProps = Children & {
  className?: string;
  full?: string;
  onClick?: () => void;
};

/**
 * `full="on"` : 버튼의 width가 100%
 */
const Button = ({ children, ...props }: ButtonProps) => {
  const { full } = props;
  return (
    <button
      className={twMerge(
        `px-10 py-3 bg-slate-800 text-white rounded-md active:bg-slate-700 ${
          full === "on" && "w-full"
        }`
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
