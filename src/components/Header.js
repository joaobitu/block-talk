import React from "react";
import SearchIcon from "../assets/magnify.png";
import { Link, useNavigate } from "react-router-dom";

export const Header = (props) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h1>BlockTalk</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/profile/${e.target.elements[0].value}`);
        }}
      >
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
