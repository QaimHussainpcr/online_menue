import { useNavigate } from "react-router-dom";

const Order = ({ cart, removeFromCart }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Order</h1>
      <button
        onClick={() => navigate("/cart")}
        className="mt-6 p-2 bg-green-500 text-white rounded"
      >
        Go to Cart ({cart.length})
      </button>
    </div>
  );
};

export default Order;