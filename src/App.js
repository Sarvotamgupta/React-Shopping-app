import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.tsx";
import Body from "./components/Body/Body.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Order from "./components/Pages/Order.tsx";
import Cart from "./components/Pages/Cart.tsx";
import { CartProvider } from "./components/Pages/CartContext.tsx";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/products" element={<Body />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/carts" element={<Cart />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
