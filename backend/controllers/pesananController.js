const Pesanan = require("../models/pesananModel");

// Create a new pesanan
exports.createPesanan = async (req, res) => {
  try {
    const newPesanan = new Pesanan(req.body);
    const savedPesanan = await newPesanan.save();
    res.status(201).json(savedPesanan);
  } catch (error) {
    res.status(500).json({ message: "Error creating pesanan", error });
  }
};

// Get all pesanan
exports.getPesanan = async (req, res) => {
  try {
    const pesananList = await Pesanan.find().sort({ createdAt: -1 });
    res.status(200).json(pesananList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pesanan", error });
  }
};

// Update a pesanan
exports.updatePesanan = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPesanan = await Pesanan.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPesanan);
  } catch (error) {
    res.status(500).json({ message: "Error updating pesanan", error });
  }
};

// Delete a pesanan
exports.deletePesanan = async (req, res) => {
  try {
    const { id } = req.params;
    await Pesanan.findByIdAndDelete(id);
    res.status(200).json({ message: "Pesanan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting pesanan", error });
  }
};
