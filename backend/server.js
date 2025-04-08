// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const pesananRoute = require("./routes/pesananRoute");
const produkRoute = require("./routes/produkRoute");
const jadwalProduksiRoute = require("./routes/jadwalProduksiRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/pesanan", pesananRoute);
app.use("/api/produk", produkRoute);
app.use("/api/jadwal-produksi", jadwalProduksiRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
