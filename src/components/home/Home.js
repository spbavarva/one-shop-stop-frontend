import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearError, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { inputLabelClasses } from "@mui/material/InputLabel";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  let product = useSelector((state) => state.products);
  const { loading, products, error } = product;

  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  // const { loading, products, productsCount, error } = useSelector(
  //   (state) => state.products
  // );
  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="One Shop Stop" />
          <div className="banner">
            <p>Welcome to One Shop Stop</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

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
              onChange={(e) => {
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

          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
