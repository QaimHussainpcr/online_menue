import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Import cart icon

const Menu = ({ addToCart, cart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const response = await axios.get("http://localhost:5173/menu");
    setMenuItems(response.data);
  };

  const handleOrder = () => {
    navigate("/cart");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={item.image} // Ensure your backend provides an `image` field
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-lg font-bold mt-2">${item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {/* Cart Icon */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleOrder}
          className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 flex items-center justify-center"
        >
          <FaShoppingCart className="text-2xl" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cart.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Menu;