import React from "react";
import SearchIcon from "../assets/magnify.png";
import { Link } from "react-router-dom";

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
        <h3>{props.profileAuth?.email}</h3>

        {props.profileAuth ? (
          <Link to="/">
            <h3 onClick={() => props.logoutAction()} className="logout-button">
              Logout
            </h3>
          </Link>
        ) : (
          <h3 onClick={() => props.toggleRegisterLogIn()}>Login/Sign Up</h3>
        )}
      </div>
    </div>
  );
};
