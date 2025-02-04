import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App";
import "./index.css"; // Ensure Tailwind CSS is imported

// Use createRoot instead of ReactDOM.render
const container = document.getElementById("root");
const root = createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);