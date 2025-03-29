import { FormEvent } from "react";

interface InputProps {
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: FormEvent) => void;
}

export const Input = ({
  placeholder,
  value,
  type,
  name,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      className="px-3 py-2 border my-2 rounded-sm border-slate-300"
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    ></input>
  );
};
