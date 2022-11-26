import React from "react";

export const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <a href="" className="sidebar-menu-options">
            <h2>Homepage</h2>
          </a>
        </li>
        <li>
          <a href="" className="sidebar-menu-options">
            <h2>Profile</h2>
          </a>
        </li>
        <li>
          <a href="" className="sidebar-menu-options">
            <h2>Follows</h2>
          </a>
        </li>
      </ul>
      <button>New Block</button>
    </div>
  );
};
