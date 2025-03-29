import { MouseEvent } from "react";

export const Button = ({
  text,
  onClick,
  type,
}: {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  type: "submit" | "reset" | "button";
}) => {
  return (
    <button
      className="bg-slate-700 hover:bg-slate-900 px-6 py-2 mx-2 rounded-sm cursor-pointer"
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};
