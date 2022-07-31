import React, { Fragment, useEffect, useState } from "react";
import Loader from "../layout/loader/Loader";
import {
  clearError,
  getProduct
  // getProductSearch
} from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import ProductCard from "../home/ProductCard";
import MetaData from "../layout/MetaData";
import "./products.css";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Pagination from "react-js-pagination";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";

const categoriesAll = ["all"];
const categories = [
  "Phone",
  "Laptop",
  "Game",
  "Watches",
  "Books",
  "TV",
  "Camera"
];

const Products = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const [keywor, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchSubmitHandler = e => {
    e.preventDefault();
    if (keywor.trim()) {
      navigate(`/products/${keywor}`);
    } else {
      navigate(`/products`);
    }
  };

  let product = useSelector(state => state.products);
  const { loading, products, productsCount, error, resultPerPage } = product;

  const { keyword } = useParams();

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const setCurrentPageNumber = e => {
    setCurrentPage(e);
  };

  useEffect(
    () => {
      if (error) {
        alert.error(error);
        dispatch(clearError());
      }
      dispatch(getProduct(keyword, currentPage, price, category, ratings));
    },
    [dispatch, error, alert, keyword, currentPage, price, category, ratings]
  );

  return (
    <Fragment>
      {loading
        ? <Loader />
        : <Fragment>
            <MetaData title="All Products | One Shop Stop" />

            <h2 className="productsHeading">Featured Products</h2>
            {keyword
              ? <form className="search" onSubmit={searchSubmitHandler}>
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
                    className="searchButton"
                    style={{
                      color: "tomato",
                      height: "30%",
                      border: "1px solid tomato",
                      margin: "1vmax",
                      padding: "1vmax",
                      width: "7%",
                      font: "100 1.1vmax",
                      cursor: "pointer",
                      transition: "all 0.5s",
                      position: "relative",
                      top: "0%",
                      right: "0%"
                    }}
                    type="submit"
                    value="Search"
                    variant="outlined"
                  >
                    Search
                  </Button>
                  <Button
                    className="searchButton"
                    href="/products"
                    style={{
                      color: "tomato",
                      height: "30%",
                      border: "1px solid tomato",
                      margin: "0.5vmax",
                      padding: "1vmax",
                      width: "10%",
                      font: "100 1.1vmax",
                      cursor: "pointer",
                      transition: "all 0.5s",
                      position: "relative",
                      top: "0%",
                      left: "0%"
                    }}
                    type="submit"
                    value="Search"
                    variant="outlined"
                  >
                    All Products
                  </Button>
                </form>
              : <form
                  className="search searchcondional"
                  onSubmit={searchSubmitHandler}
                >
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
                      margin: "1vmax",
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
                </form>}

            <div className="products" id="container">
              {products &&
                products.map(product =>
                  <ProductCard key={product.id} product={product} />
                )}
            </div>

            {keyword &&
              <div className="filterBox">
                <Typography>Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                />

                <Typography>Categories</Typography>
                <ul className="categoryBox">
                  {categories.map(category =>
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  )}
                </ul>

                <fieldset>
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={5}
                  />
                </fieldset>
              </div>}

            {resultPerPage < productsCount &&
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNumber}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>}
          </Fragment>}
    </Fragment>
  );
};

export default Products;
