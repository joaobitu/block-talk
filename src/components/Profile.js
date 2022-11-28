import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Profile = (props) => {
  const [userResult, setUserResult] = useState([]);

  let params = useParams();

  useEffect(() => {
    let resultObject = props.userData.filter((obj) => {
      return obj.email == params.email;
    });

    setUserResult(resultObject);
  }, [params]);

  return (
    <div className="profile">
      <h1>Profile for {userResult[0]?.email}</h1>
      <p>Description: {userResult[0]?.description}</p>
      <h3>Follwing: {userResult[0]?.following}</h3>
      <h3>Followers: {userResult[0]?.followers}</h3>
    </div>
  );
};
