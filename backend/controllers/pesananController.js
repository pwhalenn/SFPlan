const Pesanan = require('../models/pesanan');

// CREATE
exports.createPesanan = async (req, res) => {
  try {
    const pesanan = await Pesanan.create(req.body);
    res.status(201).json(pesanan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllPesanan = async (req, res) => {
  try {
    const list = await Pesanan.find().populate("produk_id");
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ BY ID
exports.getPesananById = async (req, res) => {
  try {
    const pesanan = await Pesanan.findById(req.params.id).populate("produk_id");
    if (!pesanan) return res.status(404).json({ message: "Pesanan tidak ditemukan" });
    res.json(pesanan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updatePesanan = async (req, res) => {
  try {
    const updated = await Pesanan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deletePesanan = async (req, res) => {
  try {
    await Pesanan.findByIdAndDelete(req.params.id);
    res.json({ message: "Pesanan dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
