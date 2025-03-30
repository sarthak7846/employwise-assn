import { Button } from "./Button";
import CrossIcon from "../icons/CrossIcon";
import axios from "axios";
import { BASE_URL } from "../config";
import { motion } from "motion/react";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  userId: number | null;
  onUserDelete: (id: number | null) => void;
}

export const DeleteModal = ({
  open,
  onClose,
  userId,
  onUserDelete,
}: DeleteModalProps) => {
  const deleteHandler = async (id: number | null) => {
    try {
      await axios.delete(`${BASE_URL}/api/users/${userId}`);
      onUserDelete(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.08 }}
        >
          <div className="h-screen w-screen bg-black opacity-50 text-white fixed top-0 left-0 " />
          <div className="bg-white p-6 rounded-sm fixed inset-0 max-w-fit max-h-fit m-auto flex justify-center items-center w-72">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h1 className="text-xl text-red-600">Delete</h1>
                <span onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </span>
              </div>
              <h1 className="text-xl text-center pb-4">Are you sure?</h1>
              <div className="flex justify-center">
                <Button text="Yes" onClick={() => deleteHandler(userId)} />
                <Button text="No" onClick={onClose} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
