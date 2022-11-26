import React from "react";
import SearchIcon from "../assets/magnify.png";

export const Header = (props) => {
  //must add the onClick to Login/ Sign Up
  return (
    <div className="header">
      <h1>BlockTalk</h1>
      <form>
        <h4>Find user</h4>
        <input type="text" />
        <button>
          <img src={SearchIcon} alt="magnifying glass" />
        </button>
      </form>
      <div className="header-right">
        <a href="#" className="login-signup">
          <h3>Login/Sign Up</h3>
        </a>
        <h3>User Name</h3>
      </div>
    </div>
  );
};
