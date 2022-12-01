import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatISO } from "date-fns";

export const ExtendedBlock = (props) => {
  const [parentBlock, setParentBlock] = useState([]);
  const [commentsList, setCommentsList] = useState([]);

  let params = useParams();

  useEffect(() => {
    let blocksListReference = props.blocksList;
    const OP = blocksListReference
      .filter((obj) => obj.id === params.id)
      .map((obj, index) => {
        return (
          <div className="block" key={index}>
            <Link to={`/profile/${obj.userOwner}`}>
              <h3>{obj.userOwner}</h3>
            </Link>
            <p>{obj.content}</p>
            <h4>Comments: {obj.commentsCount}</h4>

            <h5>{formatISO(new Date(obj.date), { representation: "date" })}</h5>
          </div>
        );
      });

    setParentBlock(OP);
  }, [props.blocksList]);

  useEffect(() => {
    const commentsRef = props.blocksList.filter((obj) => obj.id === params.id);

    const commentsResult = commentsRef[0].comments.map((obj, index) => {
      console.log(obj);
      return (
        <div className="block comment" key={index}>
          <Link to={`/profile/${obj.owner}`}>
            <h3>{obj.owner}</h3>
          </Link>
          <p>{obj.content}</p>

          <h5>{formatISO(new Date(obj.date), { representation: "date" })}</h5>
        </div>
      );
    });
    setCommentsList(commentsResult);
  }, [parentBlock]);

  return (
    <div className="extended-block">
      {parentBlock}
      <form
        onSubmit={(e) =>
          props.addCommentSubmit(params.id, props.profileAuth?.email, e)
        }
      >
        <textarea rows="4" cols="60" maxLength="280"></textarea>
        <button>Add Comment</button>
      </form>
      <h2>Comments:</h2>

      {commentsList}
    </div>
  );
};
