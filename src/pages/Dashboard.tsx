import { ChangeEvent, useEffect, useState } from "react";
import { Card } from "../components/Card";
import { BASE_URL } from "../config";
import axios from "axios";
import { motion } from "motion/react";
import { RightArrow } from "../icons/RightArrow";
import { LeftArrow } from "../icons/LeftArrow";
import { Modal } from "../components/Modal";
import { User } from "../types/user";
import { DeleteModal } from "../components/DeleteModal";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [editForm, setEditForm] = useState<User>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null);

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

  const captureEdit = (clickedUser: User) => {
    setEditModalOpen(true);
    const filtered = users.filter((user) => user.id === clickedUser.id);
    setEditForm(filtered[0]);
  };

  const captureDelete = (id: number) => {
    setDeleteModalOpen(true);
    const filteredUser = users.filter((user) => user.id === id);
    setDeletedUserId(filteredUser[0].id);
  };

  const editChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const userUpdateHandler = (updatedUser: User) => {
    setEditModalOpen(!editModalOpen);
    const updatedUsers = users.map((user) => {
      if (user.id === updatedUser.id) {
        return updatedUser;
      } else {
        return user;
      }
    });

    setUsers(updatedUsers);
  };

  const userAfterDeletionHandler = (id: number | null) => {
    setDeleteModalOpen(false);
    const updatedUsers = users.filter((user) => {
      return user.id !== id;
    });
    setUsers(updatedUsers);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="bg-slate-950 w-screen h-screen text-gray-200">
        <div className="flex flex-col mx-10">
          <div className="flex justify-between items-center h-10 my-6">
            <h1 className="text-4xl  font-semibold">All Users</h1>
            <Button text="Log out" onClick={logoutHandler} variant="warn" />
          </div>
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
              captureDelete={captureDelete}
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
        onClose={() => setEditModalOpen(false)}
        open={editModalOpen}
        editForm={editForm}
        editChangeHandler={editChangeHandler}
        onUserUpdate={userUpdateHandler}
      />
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onUserDelete={userAfterDeletionHandler}
        userId={deletedUserId}
      />
    </>
  );
};
