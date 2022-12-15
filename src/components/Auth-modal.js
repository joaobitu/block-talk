import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthModal = (props) => {
  const navigate = useNavigate();
  return (
    <div className="auth-modal">
      <div>
        <h1>BlockTalk</h1>
      </div>
      <form
        onSubmit={(e) => {
          if (e.target.elements[0].value.length < 100) {
            props.registerSubmit(e);
            props.toggleRegisterLogIn();
            navigate(`/profile/${e.target.elements[0].value}`);
          }
        }}
      >
        <h3>Sign Up:</h3>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            maxLength="40"
            onChange={(e) => props.emailRegisterValue(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => props.passwordRegisterValue(e.target.value)}
            minLength="6"
            maxLength="20"
            required
          />
        </label>

        <button>{">"}</button>
      </form>

      <form
        onSubmit={(e) => {
          props.loginSubmit(e);
          props.toggleRegisterLogIn();
          navigate(`/profile/${e.target.elements[0].value}`);
        }}
      >
        <h3>Log In:</h3>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) => props.emailLoginValue(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => props.passwordLoginValue(e.target.value)}
          />
        </label>
        <button>{">"}</button>
      </form>
      <button id="auth-modal-close" onClick={() => props.toggleRegisterLogIn()}>
        x
      </button>
    </div>
  );
};
