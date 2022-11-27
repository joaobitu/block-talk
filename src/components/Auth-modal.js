import React from "react";

export const AuthModal = (props) => {
  return (
    <div className="auth-modal">
      <div>
        <h1>BlockTalk</h1>
      </div>
      <form>
        <h3>Sign Up:</h3>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" />
        </label>

        <label htmlFor="password">
          Password:
          <input type="password" name="password" />
        </label>

        <label htmlFor="confirm-password">
          Confirm Password:
          <input type="password" name="confirm-password" />
        </label>

        <button>{">"}</button>
      </form>

      <form>
        <h3>Log In:</h3>
        <label htmlFor="email">
          Email:
          <input type="email" name="email" />
        </label>

        <label htmlFor="password">
          Password:
          <input type="password" name="password" />
        </label>
        <button>{">"}</button>
      </form>
      <button id="auth-modal-close" onClick={() => props.toggleRegisterLogIn()}>
        x
      </button>
    </div>
  );
};
