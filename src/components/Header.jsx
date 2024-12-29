import React from "react";
import { useStore } from "../zustand";
import { NavLink } from "react-router-dom";

const Header = () => {
  // const { count } = useStore();
  return (
    <div id="header" className=" shadow-lg h-14">
      <div className=" container h-full flex items-center justify-center text-2xl font-medium gap-5">
        <NavLink className={"hover:text-indigo-400 cursor-pointer"} to={"/"}>
          All user
        </NavLink>
        <NavLink
          className={"hover:text-indigo-400 cursor-pointer"}
          to={"/create-user"}
        >
          Create user
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
