import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import CheckoutSteps from "../cart/CheckoutSteps";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  let subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  let offer = subTotal >= 1000 ? subTotal*0.10 : 0;
  subTotal = subTotal - offer;

  const shippingCharges = subTotal > 500 ? 0 : 150;

  const tax = subTotal * 0.18;

  const totalPrice = subTotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      offer,
      subTotal,
      shippingCharges,
      tax,
      totalPrice
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/account/payment");
  };
  return (
    <Fragment>
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name : </p>
                {/* <span>{user.name}</span> */}
              </div>
              <div>
                <p>Phone Number : </p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address : </p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <Link to={`/product/${item.product}`}>{item.name}{item.selectedVariant ? ` (${item.selectedVariant.name})`: ""}</Link>{" "}
                    <span>
                      {item.quantity} X {item.price} ={" "}
                      <b>{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>SubTotal : </p>
                <span>{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges : </p>
                <span>{shippingCharges}</span>
              </div>
              <div>
                <p>GST : </p>
                <span>{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total : </b>
              </p>
              <span>{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
