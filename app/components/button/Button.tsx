import { ButtonHTMLAttributes, ReactNode } from "react";
import { Oval } from "react-loader-spinner";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
};

const Button = ({
  children,
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`
        w-full rounded-xl px-4 py-3
        font-bold text-white
        transition-all duration-200

        ${
          isDisabled
            ? "cursor-not-allowed bg-gradient-to-r from-indigo-300 to-fuchsia-300 hover:from-indigo-300 hover:to-fuchsia-300"
            : "bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-600 hover:to-fuchsia-600 cursor-pointer"
        }

        ${className}
      `}
      {...props}
    >
      <span className="inline-flex items-center justify-center gap-2">
        <span>{children}</span>

        {loading &&
          <Oval
            visible={true}
            height="30"
            width="30"
            color="#fff"
            secondaryColor="#fff"
            strokeWidth="4"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        }
      </span>
    </button>
  );
};

export default Button;
