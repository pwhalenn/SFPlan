// models/pesanan.js
const mongoose = require("mongoose");

const pesananSchema = new mongoose.Schema({
  nama_pelanggan: {
    type: String,
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
  tanggal_pesanan: {
    type: Date,
    default: Date.now,
  },
  waktu_siap: {
    type: String,
  },
  waktu_antar: {
    type: String,
  },
  catatan: {
    type: String,
  },
  tipe_kemasan: {
    type: String,
  },
  butuh_kartu_nama: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['baru', 'diproses', 'selesai', 'batal'],
    default: 'baru',
  }
}, { timestamps: true });

module.exports = mongoose.model('Pesanan', pesananSchema);
