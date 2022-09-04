import React from "react";
import Content from "./Content";
import Navbar from "./Navbar";

const Layout = ({ auth }) => {
  return (
    <React.Fragment>
      <Content auth={auth} />
    </React.Fragment>
  );
};

export default Layout;
