export const Input = ({
  placeholder,
  value,
  type,
  onChange,
}: {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: any) => void;
}) => {
  return (
    <input
      type={type}
      className="px-3 py-2 border my-2 rounded-sm border-slate-300"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
};
