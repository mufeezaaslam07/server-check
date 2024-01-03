// components/PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

function PrivateRoute({ element, ...props }) {
  const { loggedInUser } = useUser();

  return loggedInUser ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
