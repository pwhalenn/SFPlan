// models/produk.js
const mongoose = require("mongoose");

const Produk = new mongoose.Schema({
  nama_produk: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  resep: {
    type: DataTypes.TEXT
  },
  cara_buat: {
    type: DataTypes.TEXT
  },
  is_kustom: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    required: true
  }
});

Produk.associate = (models) => {
  Produk.hasMany(models.Pesanan, { foreignKey: "produk_id" });
  Produk.hasMany(models.JadwalProduksi, { foreignKey: "produk_id" });
};

module.exports = mongoose.model("Produk", produkSchema);