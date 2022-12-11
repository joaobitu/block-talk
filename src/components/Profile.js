import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { isAfter, formatISO, parseISO } from "date-fns";

export const Profile = (props) => {
  const [userResult, setUserResult] = useState([]);
  const [blocksResult, setBlocksResult] = useState([]);

  let params = useParams();

  useEffect(() => {
    let resultObject = props.userData.filter((obj) => {
      return obj.email === params.email;
    });

    let blocksListReference = props.blocksList;
    blocksListReference.sort((a, b) => {
      return isAfter(parseISO(a.date), parseISO(b.date)) ? -1 : 1;
    });

    let ownBlocks = blocksListReference
      // eslint-disable-next-line array-callback-return
      .filter((obj) => {
        if (params.email === obj.userOwner) {
          return true;
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
              {props.profileAuth?.email === obj.userOwner && (
                <button onClick={() => props.deleteSelectedBlock(obj.id)}>
                  Delete
                </button>
              )}
            </h4>

            <h5>{formatISO(new Date(obj.date), { representation: "date" })}</h5>
          </div>
        );
      });
    setBlocksResult(ownBlocks);
    setUserResult(resultObject);
  }, [params, props.userData]);

  return (
    <div className="profile">
      <div className="profile-details">
        <div className="profile-details-left-section">
          <img src={userResult[0]?.pictureURL} alt="pfp" />
          {props.profileAuth?.email === params.email && (
            <button onClick={() => props.profileUpdateToggle()}>edit</button>
          )}
        </div>
        <div className="profile-details-right-section">
          <div>
            <h2>{userResult[0]?.email}</h2>
          </div>
          <p>{userResult[0]?.description}</p>

          <h3>
            Following: {userResult[0]?.following}, Followers:{" "}
            {userResult[0]?.followers}{" "}
            {props.profileAuth?.email !== params.email && (
              <button
                onClick={() =>
                  props.followButton(
                    props.profileAuth?.email,
                    userResult[0]?.email
                  )
                }
              >
                Follow
              </button>
            )}
            {props.profileAuth?.email !== params.email && (
              <button
                onClick={() =>
                  props.unfollowButton(
                    props.profileAuth?.email,
                    userResult[0]?.email
                  )
                }
              >
                Unfollow
              </button>
            )}
            {props.profileAuth?.email && (
              <Link to={`/follows/${params.email}`}>
                <button>See Follows</button>
              </Link>
            )}
          </h3>
        </div>
      </div>

      {props.profileModalValidity && (
        <form
          onSubmit={(e) => {
            props.profileUpdateSubmit(e, userResult[0]?.id, params.email);
            props.profileUpdateToggle();
          }}
        >
          <button type="click" onClick={() => props.profileUpdateToggle()}>
            x
          </button>
          <input
            type="text"
            placeholder="URL for a new profile picture"
            style={{ width: "80%" }}
          />

          <textarea
            placeholder="Description (previous description will be used if you dont type anything)"
            rows="5"
            style={{ resize: "none", width: "80%" }}
          ></textarea>
          <button>Update</button>
        </form>
      )}
      <div className="blocks-section">{blocksResult}</div>
    </div>
  );
};
