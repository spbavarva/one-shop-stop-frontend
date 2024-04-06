import React from "react";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";

const OfferBar = ({ product }) => {
  return (
    <div className="container">
    <div class="topBar" id="notify">Shop now for minimum 
    <a class="link">₹1000</a>
     to get
      <a class="link">10%</a>
      offer
    </div>
    </div>
  );
};

export default OfferBar;
