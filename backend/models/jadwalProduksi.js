// models/jadwalProduksi.js
const mongoose = require('mongoose');

const jadwalProduksiSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    required: true,
  },
  produk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produk',
    required: true,
  },
  kuantitas: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['belum_selesai', 'selesai'],
    default: 'belum_selesai',
  },
  sumber_dari_pesanan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pesanan',
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('JadwalProduksi', jadwalProduksiSchema);