import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./component/Admin";
import Menu from "./component/Menu";
import Order from "./component/Order";
import OrdersList from "./component/OrdersList";
import Cart from "./component/Cart"; // New Cart component

const Home = () => <h1>Welcome to the Hotel Menu</h1>; // Simple homepage component

const App = () => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item._id !== itemId));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/menu"
          element={<Menu addToCart={addToCart} cart={cart} />}
        />
        <Route
          path="/order"
          element={<Order cart={cart} removeFromCart={removeFromCart} />}
        />
        <Route path="/orders" element={<OrdersList />} />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />
      </Routes>
    </Router>
  );
};

export default App;