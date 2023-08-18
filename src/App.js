import React,{useState,useEffect,createContext} from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Compoment/Home";
import About from "./Compoment/About";
import Products from "./Compoment/Products";
import Cart from "./Compoment/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import Contatus from "./Compoment/Contatus";
import ProductDetails from "./Compoment/ProductDetails";
import Checkout from "./Compoment/Checkout";
import Review from "./Compoment/Review";
import Signup from "./Compoment/SignUp";
import SignIn from "./Compoment/SignIn";

const global = createContext();
function App() {
  const [user, setUser] = useState(false);

  function userLogin() {
    console.log(JSON.parse(window.sessionStorage.getItem("userToken")));
    if (window.sessionStorage.getItem("userToken")) {
      console.log("User Login App")
    }
    else{
      console.log("user not login")
    }
  }

  useEffect(() => {
    userLogin();
  }, []);
  return (
    <global.Provider value={{ user, setUser, userLogin }}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/review" element={<Review />} />
        <Route exact path="/content" element={<Contatus />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </global.Provider>
  );
}

export default App;
export { global };
