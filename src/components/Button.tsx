import { MouseEvent } from "react";

export const Button = ({
  text,
  onClick,
  type,
  variant,
}: {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "reset" | "button";
  variant?: "delete";
}) => {
  return (
    <button
      className={`  px-6 py-2 mx-2 rounded-sm cursor-pointer text-white ${
        variant === "delete"
          ? "bg-red-600 hover:bg-red-700"
          : "bg-blue-500 hover:bg-blue-700"
      }`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};
