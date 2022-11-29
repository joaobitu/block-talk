import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAfter, formatISO, parseISO } from "date-fns";

export const Homepage = (props) => {
  let params = useParams();
  const [blocksResult, setBlocksResult] = useState([]);

  useEffect(() => {
    let blocksListReference = props.blocksList;
    blocksListReference.sort((a, b) => {
      return isAfter(parseISO(a.date), parseISO(b.date)) ? -1 : 1;
    });
    let globalBlocks = blocksListReference.map((obj, index) => {
      return (
        <div className="block" key={index}>
          <h3>{obj.userOwner}</h3>
          <p>{obj.content}</p>
          <h4>
            Likes: {obj.likes}, Comments: {obj.commentsCount}
          </h4>
          <h5>{formatISO(new Date(obj.date), { representation: "date" })}</h5>
        </div>
      );
    });
    setBlocksResult(globalBlocks);
  }, [props.blocksList]);

  useEffect(() => {}, []);
  return (
    <div className="homepage">
      <div className="blocks-section">{blocksResult}</div>
    </div>
  );
};
