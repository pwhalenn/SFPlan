// models/pesanan.js
const mongoose = require("mongoose");

const pesananSchema = new mongoose.Schema({
  nama_produk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produk',
    required: true,
  },
  kuantitas: {
    type: Number,
    required: true,
  },
  waktu_mulai_buat: {
    type: String,
  },
  catatan: {
    type: String,
  },
  nama_pelanggan: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Pesanan', pesananSchema);
