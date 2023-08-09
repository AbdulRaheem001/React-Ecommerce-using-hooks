import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Compoment/Home';
import About from './Compoment/About';
import Products from './Compoment/Products';
import Cart from "./Compoment/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import Contatus from './Compoment/Contatus';
import ProductDetails from './Compoment/ProductDetails';
import Checkout from './Compoment/Checkout';
import Review from './Compoment/Review';
function App() {
  return (
    
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/content" element={<Contatus />} />
        <Route exact path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/rewiew' element={<Review />} />
        
       
      </Routes>
    
  );
}

export default App;
