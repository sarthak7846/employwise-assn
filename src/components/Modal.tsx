import CrossIcon from "../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import { User } from "../types/user";
import { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { BASE_URL } from "../config";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  editForm: User;
  editChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onUserUpdate: (user: User) => void;
}

export const Modal = ({
  open,
  onClose,
  editForm,
  editForm: { first_name, last_name, email, id },
  editChangeHandler,
  onUserUpdate,
}: ModalProps) => {
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${BASE_URL}/api/users/${id}`, {
        editForm,
      });

      onUserUpdate(res.data.editForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {open && (
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.08 }}
        >
          <div className="h-screen w-screen bg-black opacity-50 text-white fixed top-0 left-0 "></div>
          <div className="bg-white p-6 rounded-sm fixed inset-0 max-w-fit max-h-fit m-auto flex justify-center items-center">
            <div>
              <div className="flex justify-between items-center cursor-pointer mb-3">
                <h1 className="text-xl">Edit</h1>
                <span onClick={onClose}>
                  <CrossIcon />
                </span>
              </div>
              <div className="flex flex-col">
                <Input
                  placeholder="First Name"
                  type="text"
                  value={first_name}
                  name="first_name"
                  onChange={editChangeHandler}
                />
                <Input
                  placeholder="Last Name"
                  type="text"
                  value={last_name}
                  name="last_name"
                  onChange={editChangeHandler}
                />
                <Input
                  placeholder="Email"
                  type="text"
                  value={email}
                  name="email"
                  onChange={editChangeHandler}
                />
              </div>
              <div className="flex justify-center">
                <Button text="Save" onClick={submitHandler} type="submit" />
              </div>
            </div>
          </div>
        </motion.form>
      )}
      {}
    </>
  );
};
