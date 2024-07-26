import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCart } from "../Pages/CartContext.tsx"; // Adjust the import path
import logo from "../Images/Store.jpg";
const Header = () => {
  const { getTotalItems } = useCart(); // Use the getTotalItems function from CartContext
  const totalItems = getTotalItems();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="sunrise-market-image" className="navbar-logo" />
          Sunrise Market
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/products"
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/orders">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/carts">
                Carts
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link active" to="/carts">
                <i className="bi bi-cart-fill"></i>
                <span
                  className={`cart-badge ${totalItems === 0 ? "zero" : ""}`}
                >
                  {totalItems}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
