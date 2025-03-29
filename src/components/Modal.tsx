import { useRef, useState } from "react";
import CrossIcon from "../icons/CrossIcon";
import { Input } from "./Input";
import { Button } from "./Button";

export const Modal = ({ open, onClose, editData }) => {
  const [firstName, setFirstName] = useState(editData.firstName);
  const [lastName, setLastName] = useState(editData.lastName);
  const [email, setEmail] = useState(editData.email);

  const firstNameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameChangeHandler = (e) => {
    setLastName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      {open && (
        <div>
          <div className="h-screen w-screen bg-black opacity-50 text-white fixed top-0 left-0 "></div>
          <div className="bg-white p-6 rounded-sm fixed inset-0 max-w-fit max-h-fit m-auto flex justify-center items-center">
            <div>
              <div
                className="flex justify-between items-center cursor-pointer mb-3"
                onClick={() => {}}
              >
                <h1 className="text-xl">Edit</h1>
                <CrossIcon />
              </div>
              <div className="flex flex-col">
                <Input
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  onChange={firstNameChangeHandler}
                />
                <Input
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  onChange={lastNameChangeHandler}
                />
                <Input
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={emailChangeHandler}
                />
              </div>
              <div className="flex justify-center">
                <Button text="Save" onClick={() => {}} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
