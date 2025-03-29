import { motion } from "motion/react";
import { Button } from "./Button";

export const Card = ({
  email,
  firstName,
  lastName,
  imgURL,
  inx,
  len,
  onOpenModal,
}: {
  email: string;
  firstName: string;
  lastName: string;
  imgURL: string;
  inx: number;
  len: number;
  onOpenModal: ({ firstName, lastName, email }) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`grid grid-cols-5 items-center justify-items-center bg-slate-900 hover:bg-slate-800 border-b border-l border-r border-slate-800   py-3 ${
        inx === len - 1 && "rounded-b-xl"
      }`}
    >
      <h1 className="text-xl">{email}</h1>
      <h1 className="text-xl">{firstName}</h1>
      <h1 className="text-xl">{lastName}</h1>

      <img src={imgURL} width={40} height={40} className="rounded-full" />

      <div>
        <Button
          text="Edit"
          onClick={() => onOpenModal({ firstName, lastName, email })}
        />
        <Button text="Delete" onClick={() => {}} />
      </div>
    </motion.div>
  );
};
