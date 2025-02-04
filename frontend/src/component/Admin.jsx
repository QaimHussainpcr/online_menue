import { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const Admin = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const response = await axios.get("http://localhost:5173/menu");
    setMenuItems(response.data);
  };

  const addMenuItem = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/menu", {
      name,
      price,
      description,
    });
    fetchMenu();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <form onSubmit={addMenuItem} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded mr-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded mr-2"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Item
        </button>
      </form>
      <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item._id} className="p-2 bg-white rounded shadow">
            {item.name} - ${item.price} - {item.description}
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-6 mb-4">QR Code</h2>
      <div className="flex justify-center">
        <QRCodeCanvas
          value="http://localhost:5173/menu" // Directly use the menu URL
          size={500} // Increase the size of the QR code
          className="p-4 bg-white rounded shadow"
        />
      </div>
    </div>
  );
};

export default Admin;