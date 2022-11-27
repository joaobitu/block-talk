import React from "react";

export const AuthModal = (props) => {
  return (
    <div className="auth-modal">
      <div>
        <h1>BlockTalk</h1>
      </div>
      <form onSubmit={(e) => props.registerSubmit(e)}>
        <h3>Sign Up:</h3>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) => props.emailRegisterValue(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            onChange={(e) => props.passwordRegisterValue(e.target.value)}
          />
        </label>

        <label htmlFor="confirm-password">
          Confirm Password:
          <input type="password" name="confirm-password" />
        </label>

        <button>{">"}</button>
      </form>

      <form onSubmit={(e) => props.loginSubmit(e)}>
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
