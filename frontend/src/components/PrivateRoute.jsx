import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const PrivateRoutes = () => {
  const { currentUser } = useContext(AuthContext);
  return !currentUser && <Navigate to="/login" />
};

export default PrivateRoutes;
