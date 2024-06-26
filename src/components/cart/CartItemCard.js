import React from "react";
import "./cartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="samsung" />
      <div>
        <Link to={`/products/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        {item.selectedVariant && <span>{`Variant: ${item.selectedVariant.name}`}</span>}
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
