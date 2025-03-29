import CrossIcon from "../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import { User } from "../types/user";
import { FormEvent } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  editForm: User;
  editChangeHandler: (e: FormEvent) => void;
  onUserUpdate: (user: User) => void;
}

export const Modal = ({
  open,
  onClose,
  editForm,
  editForm: { first_name, last_name, email, id, avatar },
  editChangeHandler,
  onUserUpdate,
}: ModalProps) => {
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log(first_name, last_name, email, id);

    try {
      const res = await axios.put(`${BASE_URL}/api/users/${id}`, {
        ...editForm,
        avatar,
      });

      onUserUpdate(res.data.editForm);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {open && (
        <form onSubmit={submitHandler}>
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
        </form>
      )}
    </>
  );
};
