import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Follows = (props) => {
  const [followingList, setFollowingList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  let params = useParams();

  useEffect(() => {
    console.log(params.email);
    const followingListRef = props.userData
      ?.filter((obj) => obj.email === params.email)[0]
      ?.followingList.map((obj, index) => {
        return (
          <div className="profile-follows-list-element" key={index}>
            <h3>{obj}</h3>

            <Link to={`/profile/${obj}`}>
              <button>Visit</button>
            </Link>
          </div>
        );
      });
    const followersListRef = props.userData
      ?.filter((obj) => obj.email === params.email)[0]
      ?.followersList.map((obj, index) => {
        return (
          <div className="profile-follows-list-element" key={index}>
            <h3>{obj}</h3>

            <Link to={`/profile/${obj}`}>
              <button>Visit</button>
            </Link>
          </div>
        );
      });
    setFollowersList(followersListRef);
    setFollowingList(followingListRef);
  });
  return (
    <div className="follows">
      <div className="following">
        <h1>Following</h1>
        {followingList}
      </div>
      <div className="followers">
        <h1>Followers</h1>
        {followersList}
      </div>
    </div>
  );
};
