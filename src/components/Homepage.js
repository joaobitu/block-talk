import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Homepage = () => {
  let params = useParams();
  useEffect(() => {
    console.log(params.email);
  }, []);
  return (
    <div className="homepage">
      <h1>Homepage</h1>
    </div>
  );
};
