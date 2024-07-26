import React, { useState } from "react";
import items from "../data/products";
import { useCart } from "../Pages/CartContext.tsx"; // Import useCart
import "./Body.css";

const Body = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [notification, setNotification] = useState<string | null>(null); // State for notification
  const { addToCart } = useCart(); // Use addToCart from CartContext

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === "price") {
      return a.price - b.price;
    } else if (sortOption === "price-high") {
      return b.price - a.price;
    } else if (sortOption === "a-z") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "z-a") {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  const handleAddToCart = (item) => {
    const cartItem = { ...item, quantity: 1 }; // Ensure quantity is included
    addToCart(cartItem);
    setNotification(`${item.name} added to the cart`);
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Clear notification after 3 seconds
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };
  return (
    <div className="body">
      <div className="search-bar-options">
        <input
          className="searchText"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <label className="SortBy">Sort By:</label>
        <select
          className="SelectOption"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Default</option>
          <option value="price">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="a-z">Title: A - Z</option>
          <option value="z-a">Title: Z - A</option>
        </select>
      </div>
      {notification && (
        <div className="notification">
          <span>{notification}</span>
          <button className="close-btn" onClick={handleCloseNotification}>
            ×
          </button>
        </div>
      )}
      {sortedItems.length > 0 ? (
        <div className="card-container">
          {sortedItems.map((item) => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} className="card-image" />
              <div className="card-details">
                <p className="card-title">{item.name}</p>
                <p className="card-price">
                  <b>${item.price}</b>
                </p>
                <button
                  className="Add-cart"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="body-no-items">No items found</p>
      )}
    </div>
  );
};

export default Body;
