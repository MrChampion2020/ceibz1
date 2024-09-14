import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext';
const LoginRoute = () => {
  const { token, setToken } = useContext(AuthContext);
  if (token) {
    return <Navigate to="/user" />
  } else {
    return (
      <div>
        <Outlet />
      </div>
    )
  }
}

export default LoginRoute