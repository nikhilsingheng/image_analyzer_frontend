import React, { useState } from "react";
import "./App.css";
import Header from "./comman/Header/Header";
import Sidebar from "./comman/Sidebar/Sidebar";
import Home from "./component/Home/Home";
import Imageupload from "./component/Imageupload/Imageupload";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Image_listing from "./component/Image_listing/Image_listing";
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="grid-container">
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Imageupload" element={<Imageupload />} />
          <Route path="/Image_listing" element={<Image_listing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
