import React, { useContext } from "react";
import Navigation from "./Navigation";
import bgImg from "../img/homeImg2.jpg";
import "../Styles/Home.css";
import "../Styles/Products.css";
import { Link } from "react-router-dom";
import { ProductContext } from "../ContextFolder/ProductContext";
const Home = () => {
  const { productData } = useContext(ProductContext);
  const inStockProducts = productData.filter(
    (product) => product.stockStatus === "in-stock"
  );
 
  return (
    <>
      <Navigation />
      <div className="hero-image">
        <img className="hero-image__img" src={bgImg} alt="Card image" />
        <div className="hero-image__overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Website</h1>
          <p className="hero-subtitle">Discover the Best Products for You</p>
          <Link to={`/products`} className="shop-now-link">
          Shop now
        </Link>
        </div>
      </div>
      <div className="explore-container">
        <h1 className="explore-heading">Explore New Arrivals</h1>
        <Link to={`/products`} className="shop-now-link">
          Shop now
        </Link>
      </div>
      <div className="card-container" style={{ marginTop: "2%" }}>
        {inStockProducts.map((product) => (
          <div key={product.id} className="card">
            <Link to={`/products`} className="card-link">
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
              <div className="card-body">
                <h4 className="card-title">{product.name}</h4>
                <p className="card-text" style={{ marginTop: "0%" }}>
                  {product.description}
                </p>
                <p className="crd-price" style={{ marginTop: "0%" }}>
                  ${product.price.toFixed(2)}{" "}
                  <del>${product.originalPrice.toFixed(2)}</del>
                </p>
                <p style={{ marginTop: "0%" }}>{product.discount}% off!</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};


export default Home;
