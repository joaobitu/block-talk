import React, { useEffect, useState } from "react";

import { isAfter, formatISO, parseISO } from "date-fns";
import { Link } from "react-router-dom";

export const Homepage = (props) => {
  const [blocksResultGlobal, setBlocksResultGlobal] = useState([]);
  const [blocksResultFollowing, setBlocksResultFollowing] = useState([]);
  const [toggleGlobalOrFollowing, setToggleGlobalOrFollowing] = useState(false);

  useEffect(() => {
    let blocksListReference = props.blocksList;
    blocksListReference.sort((a, b) => {
      return isAfter(parseISO(a.date), parseISO(b.date)) ? -1 : 1;
    });
    let globalBlocks = blocksListReference.map((obj, index) => {
      return (
        <div className="block" key={index}>
          <Link to={`/profile/${obj.userOwner}`}>
            <h3>{obj.userOwner}</h3>
          </Link>
          <p>{obj.content}</p>
          <h4>
            Comments: {obj.commentsCount}{" "}
            <Link to={`/posts/${obj.id}`}>
              <button>Comment</button>
            </Link>
          </h4>

          <h5>{formatISO(new Date(obj.date), { representation: "date" })}</h5>
        </div>
      );
    });
    let followingBlocks = blocksListReference
      .filter((obj) => {
        if (props.profileAuth?.email) {
          props.validateFollowing(props.profileAuth?.email, obj.userOwner);
        }
      })
      .map((obj, index) => {
        return (
          <div className="block" key={index}>
            <Link to={`/profile/${obj.userOwner}`}>
              <h3>{obj.userOwner}</h3>
            </Link>
            <p>{obj.content}</p>
            <h4>
              Comments: {obj.commentsCount}{" "}
              <Link to={`/posts/${obj.id}`}>
                <button>Comment</button>
              </Link>
            </h4>

            <h5>{formatISO(new Date(obj.date), { representation: "date" })}</h5>
          </div>
        );
      });
    setBlocksResultFollowing(followingBlocks);
    setBlocksResultGlobal(globalBlocks);
  }, [props.blocksList]);

  useEffect(() => {}, []);
  return (
    <div className="homepage">
      <div className="sorting-buttons">
        <button
          onClick={() => setToggleGlobalOrFollowing(!toggleGlobalOrFollowing)}
        >
          {(!toggleGlobalOrFollowing && "Following Only") || "Global Blocks"}
        </button>
      </div>
      <div className="blocks-section">
        {!toggleGlobalOrFollowing && blocksResultGlobal}
        {toggleGlobalOrFollowing && blocksResultFollowing}
      </div>
    </div>
  );
};
