import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import qrcode from "qrcode";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://hotel_management:hotel12@hotel.l09dc.mongodb.net/?retryWrites=true&w=majority&appName=Hotel"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  tableNumber: String,
  items: [{ name: String, price: Number, quantity: Number }],
  total: Number,
});

const Order = mongoose.model("Order", orderSchema);

// Add a new menu item
app.post("/api/menu", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newItem = new MenuItem({ name, price, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
});

// Get all menu items
app.get("/api/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve menu items" });
  }
});

// Place an order
app.post("/api/orders", async (req, res) => {
  try {
    const { tableNumber, items, total } = req.body;
    const newOrder = new Order({ tableNumber, items, total });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

// Get all orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
});

// Generate QR code for the menu
app.get("/api/qrcode", async (req, res) => {
  const url = "http://localhost:5173/menu"; // URL of the menu page
  qrcode.toDataURL(url, (err, qrCode) => {
    if (err) {
      return res.status(500).json({ error: "Failed to generate QR code" });
    }
    res.json({ qrCode });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
