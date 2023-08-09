import React, { useContext } from "react";
import "../Styles/Products.css";
import { ProductContext } from "../ContextFolder/ProductContext";
import Navigation from "./Navigation";
import bgImg from "../img/productImg.jpeg";
import { Link } from "react-router-dom";
import { CartContext } from "../ContextFolder/AddtocartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import {useDispatch } from "react-redux";
import  {addItem} from "../Slice/userSlice";
function Products() {
  // Access productData from the ProductContext
  const { productData } = useContext(ProductContext);
  const { cart, dispatch } = useContext(CartContext);
 const dispatchRed = useDispatch();
  const navigate = useNavigate(); 
  const handleButtonClick = (event, product) => {
    const button = event.currentTarget;
    const card = button.closest(".card");
    const overlayText = card.querySelector(".overlay-text");

    if (overlayText.classList.contains("out-of-stock")) {
      // If the item is out of stock
      button.innerText = "Out of Stock";
      button.disabled = true;
      button.style.backgroundColor = "red";
    } else {
      // If the item is in stock
      button.innerText = "Add To Cart";
      button.disabled = false;
      button.style.backgroundColor = "#869E86"; // Set background color to the original color

      // Dispatch the "ADD_ITEM" action to add the product to the cart
      dispatch({ type: "ADD_ITEM", payload: product });
     dispatchRed(addItem(product));
    }
  };

  function Filter() {
    let selectedFilter = document.getElementById("filterSelect").value;
 
    let cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      let overlayText = card.querySelector(".overlay-text");

      if (selectedFilter === "all") {
        card.style.display = "block";
      } else if (selectedFilter === "inStock") {
        if (overlayText.classList.contains("in-stock")) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      } else if (selectedFilter === "outStock") {
        if (overlayText.classList.contains("out-of-stock")) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });
  }
  const handleViewCart = (item) => {
    // Dispatch the "ADD_ITEM" action to add the product to the cart
    dispatch({ type: "ADD_ITEM", payload: item });
    dispatchRed(addItem(item));
    // Redirect the user to the "/cart" page
    navigate("/cart");
  }
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
        <select id="filterSelect" onChange={Filter}>
          <option value="all">All</option>
          <option value="inStock">In Stock</option>
          <option value="outStock">Out of Stock</option>
        </select>
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
              <FontAwesomeIcon icon={faCartShopping} onClick={() => handleViewCart(product)}/>
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
}

export default Products;

// import React, { useContext } from "react";
// import "../Styles/Products.css";
// import { ProductContext } from "../ContextFolder/ProductContext";
// import Navigation from "./Navigation";
// import bgImg from "../img/productImg.jpeg";
// import { Link } from "react-router-dom";
// import { CartContext } from "../ContextFolder/AddtocartContext";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";

// function Products() {
//   // Access productData from the ProductContext
//   const { productData } = useContext(ProductContext);
//   const { cart, dispatch } = useContext(CartContext);
//   const navigate = useNavigate(); 
//   const handleButtonClick = (event, product) => {
//     const button = event.currentTarget;
//     const card = button.closest(".card");
//     const overlayText = card.querySelector(".overlay-text");

//     if (overlayText.classList.contains("out-of-stock")) {
//       // If the item is out of stock
//       button.innerText = "Out of Stock";
//       button.disabled = true;
//       button.style.backgroundColor = "red";
//     } else {
//       // If the item is in stock
//       button.innerText = "Add To Cart";
//       button.disabled = false;
//       button.style.backgroundColor = "#869E86"; // Set background color to the original color

//       // Dispatch the "ADD_ITEM" action to add the product to the cart
//       dispatch({ type: "ADD_ITEM", payload: product });
//     }
//   };

//   function Filter() {
//     let selectedFilter = document.getElementById("filterSelect").value;
//     console.log(selectedFilter);
//     let cards = document.querySelectorAll(".card");

//     cards.forEach((card) => {
//       let overlayText = card.querySelector(".overlay-text");

//       if (selectedFilter === "all") {
//         card.style.display = "block";
//       } else if (selectedFilter === "inStock") {
//         if (overlayText.classList.contains("in-stock")) {
//           card.style.display = "block";
//         } else {
//           card.style.display = "none";
//         }
//       } else if (selectedFilter === "outStock") {
//         if (overlayText.classList.contains("out-of-stock")) {
//           card.style.display = "block";
//         } else {
//           card.style.display = "none";
//         }
//       }
//     });
//   }
//   const handleViewCart = (item) => {
//     // Dispatch the "ADD_ITEM" action to add the product to the cart
//     dispatch({ type: "ADD_ITEM", payload: item });

//     // Redirect the user to the "/cart" page
//     navigate("/cart");
//   }
//   return (
//     <>
//       <Navigation />
//       <div className="hero-image" style={{ height: "500px" }}>
//         <img
//           className="hero-image__img"
//           style={{ height: "500px" }}
//           src={bgImg}
//           alt="Card image"
//         />
//         <div className="hero-image__overlay"></div>
//         <div className="hero-content" style={{ color: "white" }}>
//           <h1 className="hero-title">Welcome to Our Store</h1>
//           <p className="hero-subtitle">Discover the Best Products for You</p>
//         </div>
//       </div>
//       {/* Render the filter and product cards */}
//       <div className="filter-container">
//         <samp>Filter</samp>
//         <select id="filterSelect" onChange={Filter}>
//           <option value="all">All</option>
//           <option value="inStock">In Stock</option>
//           <option value="outStock">Out of Stock</option>
//         </select>
//       </div>

//       <div className="card-container" style={{ backgroundColor: "lightgray" }}>
//         {productData.map((product) => (
//           <div key={product.id} className="card">
//             <Link
//               to={`/products/${product.id}`}
//               key={product.id}
//               className="card-link"
//             >
//               <div className="image-container">
//                 <img
//                   className="card-img-top"
//                   src={product.image}
//                   alt="Card image"
//                 />
//                 <p
//                   className={`overlay-text ${
//                     product.stockStatus === "in-stock"
//                       ? "in-stock"
//                       : "out-of-stock"
//                   }`}
//                 >
//                   {product.stockStatus === "in-stock"
//                     ? "IN STOCK"
//                     : "OUT OF STOCK"}
//                 </p>
//               </div>
//             </Link>
//             <div className="card-body">
//               <h4 className="card-title">{product.name}</h4>
//               <p className="card-text">{product.description}</p>
//               <p className="crd-price">
//                 ${product.price.toFixed(2)}{" "}
//                 <del>${product.originalPrice.toFixed(2)}</del>
//               </p>
//               <p>{product.discount}% off!</p>
//               <div className="view-card-icon">
//               <FontAwesomeIcon icon={faCartShopping} onClick={() => handleViewCart(product)}/>
//             </div>
//             </div>
            
//             <div className="btdiv">
//               <button
//                 className="btnAdd"
//                 onClick={(event) => handleButtonClick(event, product)}
//                 style={{ backgroundColor: " #869E86" }}
//               >
//                 Add To Cart <FontAwesomeIcon icon={faCartPlus} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }

// export default Products;
