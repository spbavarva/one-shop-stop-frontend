import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  updateProduct,
  getProductDetails
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Phone",
    "Laptop",
    "Game",
    "Watches",
    "Books",
    "TV",
    "Camera",
    "Chair"
  ];

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);
    myForm.set("variants", JSON.stringify(variants));

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }

    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
      setVariants(product.variants || []);
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated, id, product, updateError]);

    // Variant
    const [variants, setVariants] = useState([]);

    useEffect(() => {
      // Ensure there is always a default variant selected
      if (variants.length > 0 && !variants.some(variant => variant.isDefault)) {
        handleVariantChange(0, 'isDefault', true);
      }
    }, [variants]);
  
    const handleAddVariant = () => {
      // Check if the last variant has empty name or price
      if (variants.length > 0 && (variants[variants.length - 1].name === '' || variants[variants.length - 1].price === '')) {
        return; // Don't add a new variant if the last one has empty fields
      }
      // Add a new variant
      setVariants([...variants, { name: '', price: '', isDefault: false }]);
    };
  
    const handleVariantChange = (index, field, value) => {
      const updatedVariants = [...variants];
      if (field === 'isDefault' && value === true) {
        updatedVariants.forEach((variant, i) => {
          if (i !== index) {
            variant.isDefault = false;
          }
        });
      }
      updatedVariants[index][field] = value;
      setVariants(updatedVariants);
    };
  
    const handleRemoveVariant = (index) => {
      const updatedVariants = [...variants];
      updatedVariants.splice(index, 1);
      setVariants(updatedVariants);
  
      // If the removed variant was default, set the first variant as default
      if (variants[index].isDefault && updatedVariants.length > 0) {
        handleVariantChange(0, 'isDefault', true);
      }
    };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            { variants.length == 0 && <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>}
            <span style={{
            width: "100%",
            marginTop: "15px",
            marginBottom: "10px"
      }} className="option-container">
            <h4 style={{ marginRight: "3px", marginBottom: "3px", width: "100%" }}>Price Options: </h4>
        {variants.map((variant, index) => (
          <><div className="variant-option-div" key={index} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              value={variant.name}
              placeholder="Option Name"
              onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
              style={{ marginRight: '5px' }}
            />
            <input
              style={{ marginRight: '5px' }}
              type="number"
              value={variant.price}
              placeholder="Price"
              onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
            />
            <label style={{ marginRight: '5px' }}>
              <input
                type="radio"
                name={`defaultVariant-${index}`}
                checked={variant.isDefault}
                onChange={(e) => handleVariantChange(index, 'isDefault', true)}
                style={{ marginRight: '5px' }}
              />
              Default
            </label>
            <button type="button" onClick={() => handleRemoveVariant(index)}>Remove</button>
          </div><br></br></>
        ))}
        <button type="button" className="addButton" onClick={handleAddVariant}>Add Price Option</button>
      </span>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
