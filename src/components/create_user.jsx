import React, { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import { userStore } from "../zustand";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const initialState = {
  id: null,
  name: "",
  phone: "",
  email: "",
  age: "",
  error: "",
};

const User = () => {
  const paramsId = new URLSearchParams(useLocation().search).get("q");
  const { users, addUser, updateUser } = userStore();
  const [userData, setUserData] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (paramsId) {
      const user = users.find((u) => u.id === +paramsId);
      if (user) {
        setUserData({ ...user, error: "" });
      }
    }
  }, [paramsId, users]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneWithoutFormat = userData.phone.replace(/[^\d]/g, "");
    if (phoneWithoutFormat.length !== 12) {
      setUserData({ ...userData, error: "Telefon raqamini to'liq kiriting" });
      return;
    }

    if (paramsId) {
      const updatedUserData = {
        id: +paramsId,
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        age: userData.age,
      };
      updateUser(updatedUserData);
      toast.success("User updated successfully!");
      navigate("/");
    } else {
      const isEmailExists = users.some((u) => u.email === userData.email);
      if (isEmailExists) {
        toast.error("User with this email already exists!");
        return;
      }

      const createUser = {
        id: Date.now(),
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        age: userData.age,
      };
      addUser(createUser);
      toast.success("User created successfully!");
      setUserData(initialState);
    }
  };
  return (
    <div className="w-full h-screen">
      <div className="container h-full flex items-center justify-center">
        <div className="w-[500px] min-h-[400px] flex flex-col items-center justify-center gap-4 shadow-lg p-4">
          <h2 className="text-2xl font-normal text-center">
            {paramsId ? "Update" : "Create"} user
          </h2>
          <form onSubmit={handleSubmit} action="#">
            <input
              required
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              type="text"
              placeholder="Name"
              className="border outline-none w-full indent-3 py-2 rounded-md focus:border-indigo-500 mt-5"
            />
            <input
              required
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              type="email"
              placeholder="Email"
              className="border outline-none w-full indent-3 py-2 rounded-md focus:border-indigo-500 mt-5"
            />
            <input
              required
              value={userData.age}
              onChange={(e) =>
                setUserData({ ...userData, age: e.target.value })
              }
              type="number"
              placeholder="Age"
              className="border outline-none w-full indent-3 py-2 rounded-md focus:border-indigo-500 mt-5"
            />
            <div>
              <PatternFormat
                required
                format="+998 ## ### ## ##"
                allowEmptyFormatting
                mask="_"
                placeholder="Phone number"
                type="tel"
                value={userData.phone}
                onValueChange={(values) =>
                  setUserData({ ...userData, phone: values.formattedValue })
                }
                className="border outline-none w-full indent-3 py-2 rounded-md focus:border-indigo-500 mt-5"
              />
              <p className="text-sm text-red-500 indent-3">
                {userData.error && userData.error}
              </p>
            </div>

            <button className="border text-lg outline-none w-full rounded-md border-indigo-500 mt-8 py-3 hover:bg-blue-500 hover:text-white hover:border-none">
              {paramsId ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
