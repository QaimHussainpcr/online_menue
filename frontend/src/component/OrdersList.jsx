import { useState, useEffect } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:5000/api/orders");
    setOrders(response.data);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order._id} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl font-bold">Table {order.tableNumber}</h3>
            <ul className="mt-2 space-y-2">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Total: ${order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;