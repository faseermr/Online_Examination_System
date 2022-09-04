import React from "react";
import { Route, Redirect, Navigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ auth, element: Component, ...rest }) => {
  return (
    <Routes>
      <Route
        {...rest}
        render={(props) => {
          if (auth) return <Component {...props} />;
          if (!auth)
            return (
              // <Redirect to={{ path: "/", state: { from: props.location } }} />
              <Route path="/login" element={<Navigate replace to="/" />} />
            );
        }}
      />
    </Routes>
  );
};

export default ProtectedRoute;
