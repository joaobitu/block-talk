import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to={`/${props.profileAuth?.email}`}>
            <h2>Homepage</h2>
          </Link>
        </li>
        <li>
          <Link to={`/profile/${props.profileAuth?.email}`}>
            <h2>Profile</h2>
          </Link>
        </li>
        <li>
          <Link to={`/follows/${props.profileAuth?.email}`}>
            <h2>Follows</h2>
          </Link>
        </li>
      </ul>
      <button onClick={() => props.toggleNewBlock()}>New Block</button>
    </div>
  );
};
