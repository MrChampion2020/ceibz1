import React from "react";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav>
      <div className="flex flex-row items-center justify-evenly bg-black text-gray-200 text-xl p-[1%]">
        <NavLink
          to="/user"
          className="flex flex-row justify-center items-center gap-2 hover:text-white transition-all ease-in-out duration-300"
        >
          <FaHome />
          <div> Home </div>
        </NavLink>
        <NavLink
          to="/user/likes"
          className="flex flex-row justify-center items-center gap-2 hover:text-white transition-all ease-in-out duration-300"
        >
          <FaHeart /> <div> Likes </div>
        </NavLink>
        <NavLink
          to="/user/chat"
          className="flex flex-row justify-center items-center gap-2 hover:text-white transition-all ease-in-out duration-300"
        >
          <IoChatbox /> <div> Chat </div>
        </NavLink>
        <NavLink
          to="/user/profile"
          className="flex flex-row justify-center items-center gap-2 hover:text-white transition-all ease-in-out duration-300"
        >
          <CgProfile /> <div> Profile </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
