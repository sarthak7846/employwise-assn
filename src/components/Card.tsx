import { motion } from "motion/react";
import { Button } from "./Button";
import { User } from "../types/user";

interface CardProps {
  user: User;
  inx: number;
  len: number;
  captureEdit: (user: User) => void;
  captureDelete: (id: number) => void;
}

export const Card = ({
  user: { email, first_name, last_name, avatar },
  user,
  inx,
  len,
  captureEdit,
  captureDelete,
}: CardProps) => {
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
      <h1 className="text-xl">{first_name}</h1>
      <h1 className="text-xl">{last_name}</h1>

      <img src={avatar} width={40} height={40} className="rounded-full" />

      <div>
        <Button
          text="Edit"
          onClick={() => {
            captureEdit(user);
          }}
        />
        <Button
          text="Delete"
          variant="delete"
          onClick={() => {
            captureDelete(user.id);
          }}
        />
      </div>
    </motion.div>
  );
};
