import React from "react";
import { useCart } from "./CartContext.tsx";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cart, updateItemQuantity, checkout } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = totalPrice * 0.1;
  const totalAmount = totalPrice + tax;

  const handleCheckout = () => {
    if (totalPrice >= 50) {
      checkout();
      navigate("/orders");
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <div className="cart-container">
        <div className="cart-content">
          <div className="cart-items">
            <h2>Cart Items</h2>
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <p className="cart-item-title">
                      <h4>{item.name}</h4>
                    </p>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                    <div className="cart-item-quantity">
                      <button
                        className="quantity-button"
                        onClick={() => updateItemQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="quantity-count">{item.quantity}</span>
                      <button
                        className="quantity-button"
                        onClick={() => updateItemQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="cart-empty-items">No items in cart</p>
            )}
          </div>
          <div className="cart-summary">
            <h2>Purchase Summary</h2>
            <div className="cart-summary-item">
              <label>Total Items:</label>
              <span>
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
            <div className="cart-summary-item">
              <label>Total Price:</label>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="cart-summary-item">
              <label>Tax (10%):</label>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-item total-amount">
              <label>Total Amount:</label>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <button
              className="checkout-button"
              onClick={handleCheckout}
              disabled={totalAmount < 50}
              title={
                totalAmount < 50
                  ? "Please add items worth $50 or more to proceed to checkout"
                  : ""
              }
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
