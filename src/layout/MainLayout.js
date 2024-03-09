import React, { useState } from "react";
import Header from "../comman/Header/Header";
import Sidebar from "../comman/Sidebar/Sidebar";
export default function MainLayout(props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <div className="mb-auto">{props.children}</div>
      </div>
    </>
  );
}
