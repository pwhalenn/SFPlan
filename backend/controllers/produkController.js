const Produk = require("../models/produkModel");

// Create a new produk
exports.createProduk = async (req, res) => {
  try {
    const newProduk = new Produk(req.body);
    const savedProduk = await newProduk.save();
    res.status(201).json(savedProduk);
  } catch (error) {
    res.status(500).json({ message: "Error creating produk", error });
  }
};

// Get all produk
exports.getProduk = async (req, res) => {
  try {
    const produkList = await Produk.find().sort({ createdAt: -1 });
    res.status(200).json(produkList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching produk", error });
  }
};

// Update a produk
exports.updateProduk = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduk = await Produk.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedProduk);
  } catch (error) {
    res.status(500).json({ message: "Error updating produk", error });
  }
};

// Delete a produk
exports.deleteProduk = async (req, res) => {
  try {
    const { id } = req.params;
    await Produk.findByIdAndDelete(id);
    res.status(200).json({ message: "Produk deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting produk", error });
  }
};
