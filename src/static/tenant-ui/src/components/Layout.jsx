import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { AuthContext } from "../AuthContext";

const Layout = (props) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="d-flex flex-row h-100">
      {isAuthenticated ? <Sidebar /> : null}
      <div className="main-content p-2" style={{ flex: 1 }}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
