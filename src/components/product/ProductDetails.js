import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Loader from "../layout/loader/Loader";
import "./ProductDetails.css";
import {
  clearError,
  getProductDetails,
  newReview
} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import ReviewCard from "./ReviewCard.js";
import { addItemsToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Paper
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";

// const App = () => {
//   const data = [
//     {
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
//       caption: "San Francisco",
//     },
//     {
//       image:
//         "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
//       caption: "Scotland",
//     },
//   ];
//   const captionStyle = {
//     fontSize: "2em",
//     fontWeight: "bold",
//   };
//   const slideNumberStyle = {
//     fontSize: "20px",
//     fontWeight: "bold",
//   };
// };
const ProductDetails = () => {
  // const state = store.getState();
  //   console.log(state);

  // const data = [
  //     {
  //       image:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
  //       caption: "San Francisco",
  //     },
  //     {
  //       image:
  //         "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
  //       caption: "Scotland",
  //     },
  //   ];
  //   const captionStyle = {
  //     fontSize: "2em",
  //     fontWeight: "bold",
  //   };
  //   const slideNumberStyle = {
  //     fontSize: "20px",
  //     fontWeight: "bold",
  //   };
  const items = [
    {
      name: "Aya Bouchiha",
      description: "Full Stack Web Developer"
    },
    {
      name: "John Doe",
      description: "Author"
    },
    {
      name: "Pitsu Coma",
      description: "Math Student"
    }
  ];
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    state => state.productDetails
  );
  const { success, error: reviewError } = useSelector(state => state.newReview);

  console.log(product);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item added successfully to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchSubmitHandler = e => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  useEffect(
    () => {
      if (error) {
        alert.error(error);
        dispatch(clearError());
      }

      if (reviewError) {
        alert.error(reviewError);
        dispatch(clearError());
      }

      if (success) {
        console.log("hello");
        dispatch({ type: NEW_REVIEW_RESET });
        alert.success("Review Submitted Successfully");
      }

      dispatch(getProductDetails(id));
    },
    [dispatch, error, alert, id, reviewError, success]
  );
  return (
    <Fragment>
      {loading
        ? <Loader />
        : <Fragment>
            <form className="search" onSubmit={searchSubmitHandler}>
              <TextField
                id="standard-search"
                label="Search products..."
                InputLabelProps={{
                  sx: {
                    // color: "red",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "tomato"
                    }
                  }
                }}
                type="search"
                onChange={e => {
                  setKeyword(e.target.value);
                }}
                variant="standard"
              />
              <Button
                style={{
                  color: "tomato",
                  height: "30%",
                  border: "1px solid tomato",
                  margin: "0.5vmax",
                  padding: "1vmax",
                  width: "7%",
                  font: "100 1.1vmax",
                  cursor: "pointer",
                  transition: "all 0.5s"
                }}
                type="submit"
                value="Search"
                variant="outlined"
              >
                Search
              </Button>
            </form>

            <div className="ProductDetails">
              <div>
                <SwipeableTextMobileStepper />
              </div>
              <div>
                <div className="detailsBlock-1">
                  <h2>
                    {product.name}
                  </h2>
                </div>
                <div className="detailsBlock-2">
                  <Rating {...options} />
                  <span className="detailsBlock-2-span">
                    {" "}({product.numOfReviews} Reviews)
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <h1>{`$${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input readOnly type="number" value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button
                      onClick={addToCartHandler}
                      disabled={product.stock < 1 ? true : false}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <p>
                    Status:
                    <b
                      className={product.stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>

                <div className="detailsBlock-4">
                  Description : <p>{product.description}</p>
                </div>

                <button onClick={submitReviewToggle} className="submitReview">
                  Submit Review
                </button>
              </div>
            </div>
            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog">
                <Rating
                  onChange={e => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0]
              ? <div className="reviews">
                  {product.reviews &&
                    product.reviews.map(review =>
                      <ReviewCard review={review} />
                    )}
                </div>
              : <p className="noReviews">No Reviews Yet</p>}
          </Fragment>}
    </Fragment>
  );
};

export default ProductDetails;
