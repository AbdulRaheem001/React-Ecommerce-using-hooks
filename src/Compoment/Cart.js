import React, { useContext, useState } from "react";
import { CartContext } from "../ContextFolder/AddtocartContext";
import "../Styles/Cart.css";
import {useSelector} from "react-redux";
import { removeItem } from "../Slice/userSlice";
import {setQuantity} from "../Slice/userSlice";
import {useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [coupon, setCoupon] = useState(10);
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();
  const dispatchRed = useDispatch();
 const data=useSelector((state)=>{
  return state.users;
 })
  const handleRemoveItem = (item) => {
    //dispatch({ type: "REMOVE_ITEM", payload: item });
    dispatchRed(removeItem(item));
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };
  const handleApplyCoupon = () => {
    if (coupon === "pak1122") {
      // Set the couponApplied state to true to apply the discount
      setCouponApplied(true);
      calculateTotalBill();
    } else {
      // Set the couponApplied state to false if the coupon is not applied
      setCouponApplied(false);
    }
  };
  
  const calculateTotalBill = () => {
    let total = data.items.reduce(
      (subtotal, item) => subtotal + item.price * item.quantity,
      0
    );
    // Apply coupon discount if coupon is applied
    if (couponApplied) {
      const discountAmount = (total * 0.1).toFixed(2); // 10% discount
      total = (total - discountAmount).toFixed(2);
      
    }
    return total;
  };
  const calculatesubTotalBill = () => {
    let total = data.items.reduce(
      (subtotal, item) => subtotal + item.price * item.quantity,
      0
    );
    return total;
  };

  const getTotalItems = () => {
    const totalItems = data.items.reduce((total, item) => total + item.quantity, 0);
    return totalItems;
  };
  
  const handleQuantityChange = (e, item) => {
    const newQuantity = parseInt(e.target.value, 10); // Parse the input value to an integer
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      // Update the quantity of the item in the Redux store
      dispatchRed(setQuantity({ id: item.id, quantity: newQuantity }));
    }
  };
  const handleBackButtonClick = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <div><button className="back-button" onClick={handleBackButtonClick}>
    Back
  </button>
      <h2 className="cart-heading">Shopping Cart</h2>
      {data.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-table-container">
          <table className="cart-table">
            <thead>
              <tr style={{backgroundColor:"lightgray"}}>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    {item.name}
                  </td>
                  <td>${item.price}</td>
                  <td>  <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, item)}
              /></td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cart-total">
            <table className="total-table">
              <tbody>
                <tr>
                  <td>Total Items:</td>
                  <td>{getTotalItems()}</td>
                </tr>
                <tr>
                  <td>Subtotal:</td>
                  <td>${calculatesubTotalBill()}</td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>${calculateTotalBill()}</td>
                </tr>
              </tbody>
            </table>

            <div className="coupon-container">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={handleCouponChange}
                className="coupon-input"
              />
              <button className="confirm-button" onClick={handleApplyCoupon}>
                Apply Coupon
              </button>
              <br/><br/><br/><br/><br/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
