import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Navbar from "../components/Navbar";
import { Navigate } from 'react-router-dom';
const UserRoute = () => {
  const { token, setToken } = useContext(AuthContext);
  if (token) {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default UserRoute;
