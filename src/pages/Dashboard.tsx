import { ChangeEvent, useEffect, useState } from "react";
import { Card } from "../components/Card";
import { BASE_URL } from "../config";
import axios from "axios";
import { motion } from "motion/react";
import { RightArrow } from "../icons/RightArrow";
import { LeftArrow } from "../icons/LeftArrow";
import { Modal } from "../components/Modal";
import { User } from "../types/user";

export const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${BASE_URL}/api/users`, {
        params: {
          page,
        },
      });

      console.log(res);
      setTotalPages(res.data.total_pages);
      setUsers(res.data.data);
    };

    fetchUsers();
  }, [page]);

  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  const captureEdit = (clickedUser: User) => {
    setModalOpen(true);
    const filtered = users.filter((user) => user.id === clickedUser.id);
    setEditForm(filtered[0]);
  };

  const editChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const userUpdateHandler = (updatedUser: User) => {
    setModalOpen(!modalOpen);
    const updatedUsers = users.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      } else {
        return user;
      }
    });

    setUsers(updatedUsers);
  };

  return (
    <>
      <div className="bg-slate-950 w-screen h-screen text-gray-200">
        <div className="flex flex-col mx-10">
          <h1 className="text-4xl  font-semibold py-6">All Users</h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-5 bg-slate-800 border border-slate-800 rounded-t-xl py-4 text-center"
          >
            <h1 className="text-xl ">Email</h1>
            <h1 className="text-xl ">First Name</h1>
            <h1 className="text-xl ">Last Name</h1>
            <h1 className="text-xl ">Avatar</h1>
            <h1 className="text-xl ">Action</h1>
          </motion.div>
          {users.map((user, inx) => (
            <Card
              key={inx}
              inx={inx}
              user={user}
              len={users.length}
              captureEdit={captureEdit}
            />
          ))}
          <div className="flex justify-end items-center mt-2">
            <h1 className="text-lg mr-2">Page {page}</h1>
            {page > 1 && (
              <div
                className="p-2 bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-full mx-2"
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <LeftArrow />
              </div>
            )}
            {page < totalPages && (
              <div
                className="p-2 bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-full mx-2"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                <RightArrow />
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setModalOpen(!modalOpen)}
        open={modalOpen}
        editForm={editForm}
        editChangeHandler={editChangeHandler}
        onUserUpdate={userUpdateHandler}
      />
    </>
  );
};
