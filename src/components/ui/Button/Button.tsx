import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "auth";
};

function Button({ children, variant = "default", ...props }: ButtonProps) {
  const baseStyles =
    "px-8 py-3 text-[16px] font-semibold tracking-wide transition-all duration-300";

  const variants = {
    default: "relative overflow-hidden rounded-full bg-black text-white",

    auth: "w-full bg-[#d40000] text-white rounded-none hover:bg-[#b30000] mt-5 pt-3 pb-3 text-[15px] font-normal",
  };

  return (
    <button {...props} className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}

export default Button;
