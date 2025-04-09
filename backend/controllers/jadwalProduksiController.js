const JadwalProduksi = require("../models/jadwalProduksi");

// Create a new jadwal produksi
exports.createJadwalProduksi = async (req, res) => {
  try {
    const newJadwal = new JadwalProduksi(req.body);
    const savedJadwal = await newJadwal.save();
    res.status(201).json(savedJadwal);
  } catch (error) {
    res.status(500).json({ message: "Error creating jadwal produksi", error });
  }
};

// Get all jadwal produksi
exports.getJadwalProduksi = async (req, res) => {
  try {
    const jadwalList = await JadwalProduksi.find().sort({ tanggalProduksi: 1 });
    res.status(200).json(jadwalList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jadwal produksi", error });
  }
};

// Update a jadwal produksi
exports.updateJadwalProduksi = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJadwal = await JadwalProduksi.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedJadwal);
  } catch (error) {
    res.status(500).json({ message: "Error updating jadwal produksi", error });
  }
};

// Delete a jadwal produksi
exports.deleteJadwalProduksi = async (req, res) => {
  try {
    const { id } = req.params;
    await JadwalProduksi.findByIdAndDelete(id);
    res.status(200).json({ message: "Jadwal produksi deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting jadwal produksi", error });
  }
};
