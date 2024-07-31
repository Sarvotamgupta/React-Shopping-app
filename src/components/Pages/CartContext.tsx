import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
  checkout: () => void;
  orderHistory: CartItem[][];
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [orderHistory, setOrderHistory] = useState<CartItem[][]>(() => {
    const storedOrderHistory = localStorage.getItem("orderHistory");
    return storedOrderHistory ? JSON.parse(storedOrderHistory) : [];
  });

  // Save cart and order history to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
  }, [cart, orderHistory]);

  // Function to add items to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  // Function to update item quantity
  const updateItemQuantity = (id: number, quantityChange: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantityChange }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  // Function to handle checkout
  const checkout = () => {
    if (cart.length > 0) {
      setOrderHistory((prevHistory) => [cart, ...prevHistory]);
      setCart([]);
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateItemQuantity,
        checkout,
        orderHistory,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
