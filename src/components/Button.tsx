export const Button = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="bg-slate-700 hover:bg-slate-900 px-6 py-2 mx-2 rounded-sm cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
};
