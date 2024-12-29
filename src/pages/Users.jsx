import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { userStore } from "../zustand";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const Users = () => {
  const navigate = useNavigate();
  const { users, removeUser } = userStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  if (!users || users.length === 0) {
    return (
      <div className="text-center text-gray-500 my-4 text-2xl">
        No users found
      </div>
    );
  }

  const handleDelete = (id) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete !== null) {
      removeUser(userToDelete);
      setIsModalOpen(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };
  const handleEdit = (id) => {
    return navigate(`/create-user?q=${id}`);
  };

 
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
        >
          <div key={user.id} className="flex flex-col items-center">
            <div className="mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-3xl text-gray-500">
                  {user.name?.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                {user.email}
              </p>
              <p className="text-sm text-gray-500">Age: {user.age}</p>
              <p className="text-sm text-gray-500">Phone: {user.phone}</p>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 mr-4 py-1 px-5 text-white hover:opacity-85 rounded-md mt-3"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(user.id)}
                className="bg-blue-500 mr-4 py-1 px-5 text-white hover:opacity-85 rounded-md mt-3"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={cancelDelete}
        className="bg-white p-6 rounded-lg shadow-lg w-80 mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-semibold mb-4">
          Are you sure you want to delete?
        </h2>
        <div className="flex justify-between">
          <button
            onClick={confirmDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:opacity-85"
          >
            Yes
          </button>
          <button
            onClick={cancelDelete}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:opacity-85"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
