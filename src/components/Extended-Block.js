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
    const OP = blocksListReference.filter((obj) => obj.id === params.id);

    setCommentsList(OP[0]?.comments);

    setParentBlock(OP);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.blocksList]);

  return (
    <div className="extended-block">
      {parentBlock.map((obj, index) => {
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
      })}
      <form
        onSubmit={(e) => {
          props.addCommentSubmit(params.id, props.profileAuth?.email, e);
          console.log(
            props.blocksList.filter((obj) => obj.id === params.id)[0]?.comments
          );
          setCommentsList(
            props.blocksList.filter((obj) => obj.id === params.id)[0]?.comments
          );
          e.target.elements[0].value = "";
        }}
      >
        <textarea
          rows="4"
          cols="60"
          maxLength="280"
          placeholder="write your comment here"
        ></textarea>
        <button>Add Comment</button>
      </form>
      <h2>Comments:</h2>

      <div className="comments-list-container">
        {commentsList?.map((obj, index) => {
          return (
            <div className="block comment" key={index}>
              <Link to={`/profile/${obj.owner}`}>
                <h3>{obj.owner}</h3>
              </Link>
              <p>{obj.content}</p>
              <h5>
                {formatISO(new Date(obj.date), { representation: "date" })}
              </h5>
              {props.profileAuth?.email === obj.owner && (
                <button
                  onClick={() => props.deleteCommentClick(params.id, index)}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
