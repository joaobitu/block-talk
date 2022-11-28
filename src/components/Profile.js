import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Profile = (props) => {
  const [userResult, setUserResult] = useState([]);

  let params = useParams();

  useEffect(() => {
    console.log(props.userData);
    console.log(params.email);
    let resultObject = props.userData.filter((obj) => {
      return obj.email == params.email;
    });

    setUserResult(resultObject);
  }, [params, props.userData]);

  return (
    <div className="profile">
      <div className="profile-details">
        <div className="profile-details-left-section">
          <img src={userResult[0]?.pictureURL} alt="pfp" />
          {props.profileAuth?.email === params.email && <button>edit</button>}
        </div>
        <div className="profile-details-right-section">
          <div>
            <h2>{userResult[0]?.email}</h2>
            {props.profileAuth.email === params.email && <button>edit</button>}
          </div>
          <p>{userResult[0]?.description}</p>
          {props.profileAuth.email === params.email && <button>edit</button>}
          <h3>
            Follwing: {userResult[0]?.following}, Followers:{" "}
            {userResult[0]?.followers}
          </h3>
        </div>
      </div>
    </div>
  );
};
