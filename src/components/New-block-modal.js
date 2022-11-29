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
      <img src={userResult[0]?.pictureURL} alt="profile" />
      <form
        onSubmit={(e) => {
          props.addNewBlock(e, props.profileAuth.email);
          props.updateBlocksList();
        }}
      >
        <textarea rows="4" cols="60" maxLength="280"></textarea>
        {props.profileAuth?.email && <button>Submit Block</button>}
      </form>
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
