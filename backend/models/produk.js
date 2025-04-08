// models/produk.js
const mongoose = require('mongoose');

const produkSchema = new mongoose.Schema({
  nama_produk: {
    type: String,
    required: true,
  },
  resep: {
    type: String,
  },
  cara_buat: {
    type: String,
  },
  is_kustom: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Produk', produkSchema);