import React, { useContext } from "react";
import "../Styles/Products.css";
import { ProductContext } from "../ContextFolder/ProductContext";
import Navigation from "./Navigation";
import bgImg from "../img/productImg.jpeg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../Slice/userSlice";

const FILTER_OPTIONS = {
  ALL: "all",
  IN_STOCK: "inStock",
  OUT_STOCK: "outStock",
};

const Products = () => {
  const { productData } = useContext(ProductContext);
  const dispatchRed = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = (event, product) => {
    const button = event.currentTarget;
    const card = button.closest(".card");
    const overlayText = card.querySelector(".overlay-text");

    if (overlayText.classList.contains("out-of-stock")) {
      button.innerText = "Out of Stock";
      button.disabled = true;
      button.classList.add("out-of-stock-button");
    } else {
      button.innerText = "Add To Cart";
      button.disabled = false;
      button.classList.remove("out-of-stock-button");
      dispatchRed(addItem(product));
    }
  };

  const handleViewCart = (event, item) => {
    const button = event.currentTarget;
    const card = button.closest(".card");
    const overlayText = card.querySelector(".overlay-text");
    if (overlayText.classList.contains("in-stock")) {
      dispatchRed(addItem(item));
      navigate("/cart");
    }
  };
const ViewCart=() => {
  navigate("/cart");
};
  const filterProducts = (selectedFilter) => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const overlayText = card.querySelector(".overlay-text");

      if (selectedFilter === FILTER_OPTIONS.ALL) {
        card.style.display = "block";
      } else {
        const isVisible =
          (selectedFilter === FILTER_OPTIONS.IN_STOCK &&
            overlayText.classList.contains("in-stock")) ||
          (selectedFilter === FILTER_OPTIONS.OUT_STOCK &&
            overlayText.classList.contains("out-of-stock"));

        card.style.display = isVisible ? "block" : "none";
      }
    });
  };
  return (
    <>
      <Navigation />
      <div className="hero-image" style={{ height: "500px" }}>
        <img
          className="hero-image__img"
          style={{ height: "500px" }}
          src={bgImg}
          alt="Card image"
        />
        <div className="hero-image__overlay"></div>
        <div className="hero-content" style={{ color: "white" }}>
          <h1 className="hero-title">Welcome to Our Store</h1>
          <p className="hero-subtitle">Discover the Best Products for You</p>
        </div>
      </div>
      {/* Render the filter and product cards */}
      <div className="filter-container">
        <samp>Filter</samp>
        <select
          id="filterSelect"
          onChange={(e) => filterProducts(e.target.value)}
        >
          <option value={FILTER_OPTIONS.ALL}>All</option>
          <option value={FILTER_OPTIONS.IN_STOCK}>In Stock</option>
          <option value={FILTER_OPTIONS.OUT_STOCK}>Out of Stock</option>
        </select>
        <button className="viewCart" onClick={()=>ViewCart()}>View Cart <FontAwesomeIcon
                  icon={faCartShopping}/></button>
      </div>

      <div className="card-container" style={{ backgroundColor: "lightgray" }}>
        {productData.map((product) => (
          <div key={product.id} className="card">
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="card-link"
            >
              <div className="image-container">
                <img
                  className="card-img-top"
                  src={product.image}
                  alt="Card image"
                />
                <p
                  className={`overlay-text ${
                    product.stockStatus === "in-stock"
                      ? "in-stock"
                      : "out-of-stock"
                  }`}
                >
                  {product.stockStatus === "in-stock"
                    ? "IN STOCK"
                    : "OUT OF STOCK"}
                </p>
              </div>
            </Link>
            <div className="card-body">
              <h4 className="card-title">{product.name}</h4>
              <p className="card-text">{product.description}</p>
              <p className="crd-price">
                ${product.price.toFixed(2)}{" "}
                <del>${product.originalPrice.toFixed(2)}</del>
              </p>
              <p>{product.discount}% off!</p>
              <div className="view-card-icon">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  onClick={(event) => handleViewCart(event, product)}
                />
              </div>
            </div>

            <div className="btdiv">
              <button
                className="btnAdd"
                onClick={(event) => handleButtonClick(event, product)}
                style={{ backgroundColor: " #869E86" }}
              >
                Add To Cart <FontAwesomeIcon icon={faCartPlus} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
