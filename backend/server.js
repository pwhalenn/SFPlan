// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");

const authRoute = require("./routes/authRoute");
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
  
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false }, // true in production with HTTPS
  })
);  

// Routes
app.use("/auth", authRoute);
app.use("/pesanan", pesananRoute);
app.use("/produk", produkRoute);
app.use("/jadwal-produksi", jadwalProduksiRoute);

app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
