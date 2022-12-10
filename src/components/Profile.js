import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const Profile = (props) => {
  const [userResult, setUserResult] = useState([]);

  let params = useParams();

  useEffect(() => {
    let resultObject = props.userData.filter((obj) => {
      return obj.email === params.email;
    });

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
            props.profileUpdateSubmit(e, userResult[0]?.id);
            props.profileUpdateToggle();
          }}
        >
          <button type="click" onClick={() => props.profileUpdateToggle()}>
            x
          </button>
          <input
            type="text"
            placeholder="picture URL"
            value={userResult[0]?.pictureURL}
          />

          <input type="text" placeholder="description" />
          <button>Update</button>
        </form>
      )}
    </div>
  );
};
