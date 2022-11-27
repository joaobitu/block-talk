import React from "react";
import placeholderImage from "../assets/placeholderProfileImage.jpg";

export const NewBlock = (props) => {
  return (
    <div className="new-block-modal">
      <img src={placeholderImage} alt="profile" />
      <textarea rows="4" cols="60"></textarea>

      <button>Submit Block</button>
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
