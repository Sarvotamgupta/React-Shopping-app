import React from "react";
import { useCart } from "./CartContext.tsx";
import "./Order.css";

const Order = () => {
  const { orderHistory } = useCart();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="order-container">
      <div className="print-summary-container">
        <button
          className={`print-button ${
            orderHistory.length === 0 ? "disabled" : ""
          }`}
          onClick={orderHistory.length > 0 ? handlePrint : undefined}
          title={orderHistory.length > 0 ? "Print" : "No Orders to Print"}
          disabled={orderHistory.length === 0}
        >
          <i className="bi bi-printer"></i>
        </button>
        {orderHistory.length > 0 ? (
          <div className="order-summary-container">
            <h2>Order Summary</h2>
            <div className="order-box-container">
              {orderHistory.map((order, index) => (
                <div
                  key={index}
                  className={`order-box ${
                    index === 0 ? "new-order" : "previous-order"
                  }`}
                >
                  <h3>
                    {index === 0 ? "New Order" : `Previous Order #${index}`}
                  </h3>
                  <div className="order-items">
                    {order.map((item) => (
                      <div key={item.id} className="order-item">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="order-item-image"
                        />
                        <div className="order-item-details">
                          <p className="order-item-title">{item.name}</p>
                          <p className="order-item-price">
                            ${item.price.toFixed(2)}
                          </p>
                          <p className="order-item-quantity">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-summary">
                    <div className="order-summary-item">
                      <span>Total Price:</span>
                      <span>
                        $
                        {order
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="order-summary-item">
                      <span>Tax (10%):</span>
                      <span>
                        $
                        {(
                          order.reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          ) * 0.1
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="order-summary-item total-amount">
                      <span>Total Amount:</span>
                      <span>
                        $
                        {(
                          order.reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          ) * 1.1
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="no-orders-message">
            <h2>Order Summary</h2>
            <p className="cart-empty-message">
              You haven't placed any orders yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
