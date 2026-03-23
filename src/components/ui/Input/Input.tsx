import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="
        w-full
        border-b
        border-gray-500
        bg-transparent
        py-1
        scale-y-90
        text-[20px]
        font-light
        text-black
        placeholder-gray-400
        outline-none
        focus:border-[#d40000]
        transition-colors
      "
    />
  );
}

export default Input;
