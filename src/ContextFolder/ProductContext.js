import React, { createContext, useState } from "react";
import img1 from "../img/download (1).jpeg";
import img2 from "../img/img2.jpeg";
import img3 from "../img/img3.jpeg";
import img4 from "../img/img4.jpeg";
import img5 from "../img/img5.jpeg";


const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // Define your product data here
  const [productData, setProductData] = useState([
    {
        id: 1,
        name: "Camera",
        description: "Micuna Ovo Max Luxe High Chair With Seat Pad.",
        price: 548.99,
        originalPrice: 650.00, // Add original price
        image: img1,
        stockStatus: "in-stock",
        discount: 20,
      },
      {
        id: 2,
        name: "Product 1",
        description: "Product 1 description",
        price: 548.99,
        originalPrice: 650.00, // Add original price
        image: img2,
        stockStatus: "in-stock",
        discount: 20,
      },
      {
        id: 3,
        name: "Product 1",
        description: "Product 1 description",
        price: 548.99,
        originalPrice: 650.00, // Add original price
        image: img3,
        stockStatus: "out-of-stock",
        discount: 20,
      },
      {
        id: 4,
        name: "Product 1",
        description: "Product 1 description",
        price: 48.99,
        originalPrice: 55.00, // Add original price
        image: img4,
        stockStatus: "in-stock",
        discount: 13,
      },
      {
        id: 5,
        name: "Product 1",
        description: "Product 1 description",
        price: 48.99,
        originalPrice: 60.00, // Add original price
        image: img5,
        stockStatus: "in-stock",
        discount: 25,
      },
      {
        id: 6,
        name: "Product 6",
        description: "Product 1 description",
        price: 44.99,
        originalPrice: 50.00, // Add original price
        image: img2,
        stockStatus: "out-of-stock",
        discount: 16,
      },
  ]);

  return (
    <ProductContext.Provider value={{ productData, setProductData }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
