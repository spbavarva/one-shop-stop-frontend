import React, { Fragment } from "react";
import { Rating } from "@material-ui/lab";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    size: "normal",
    value: review.rating,
    readOnly: true,
    precision: 0.5
  };

  return (
    <Fragment>
      <div className="reviewCard">
        <img src={profilePng} alt="User"></img>
        <p>{review.name}</p>
        <Rating {...options} />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
    </Fragment>
  );
};

export default ReviewCard;
