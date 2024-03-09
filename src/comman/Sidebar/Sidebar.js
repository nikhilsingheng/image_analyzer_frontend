import React from "react";
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
} from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <FontAwesomeIcon
            icon={faImage}
            style={{ fontSize: "24px", color: "gray" }}
          />{" "}
          Image
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/">
            <a>
              <BsGrid1X2Fill className="icon" /> Dashboard
            </a>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/Imageupload">
            <a>
              <BsFillArchiveFill className="icon" /> Image Upload
            </a>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/Image_listing">
            <a>
              <BsFillGrid3X3GapFill className="icon" /> Image listing
            </a>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
