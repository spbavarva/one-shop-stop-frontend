import React from "react";
import { Rating } from "@material-ui/lab";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const options = {
    size: "normal",
    value: product.ratings,
    readOnly: true,
    precision: 0.5
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p> {product.name} </p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan"> ({product.numOfReview} Reviews) </span>
        {/* <span> ({product.stock}) </span> */}
      </div>
      { product.variants?.length ? <span>₹{product.variants.find(variant => variant.isDefault)?.price}</span> : <span>₹{product.price}</span>}
    </Link>
  );
};

export default ProductCard;
