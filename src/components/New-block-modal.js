import React, { useEffect, useState } from "react";

export const NewBlock = (props) => {
  const [userResult, setUserResult] = useState([]);

  useEffect(() => {
    let resultObject = props.userData.filter((obj) => {
      return obj.email === props.profileAuth?.email;
    });
    setUserResult(resultObject);
  }, [props.profileAuth]);
  return (
    <div className="new-block-modal">
      {props.profileAuth?.email && (
        <img src={userResult[0]?.pictureURL} alt="profile" />
      )}
      {(props.profileAuth?.email && (
        <form
          onSubmit={(e) => {
            props.addNewBlock(e, props.profileAuth.email);
            props.updateBlocksList();
            props.toggleNewBlock();
          }}
        >
          <textarea rows="4" cols="60" maxLength="280"></textarea>
          {props.profileAuth?.email && <button>Submit Block</button>}
        </form>
      )) || (
        <h2 className="new-block-login-error">
          You must be logged in to create a new block!
        </h2>
      )}
      <div>
        <button
          id="new-block-close-button"
          onClick={() => props.toggleNewBlock()}
        >
          x
        </button>
      </div>
    </div>
  );
};
