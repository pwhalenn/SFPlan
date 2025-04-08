// models/pesanan.js
const mongoose = require("mongoose");

const Pesanan = new mongoose.Schema({
    nama_pelanggan: DataTypes.STRING,
    kuantitas: DataTypes.INTEGER,
    tanggal_pesanan: DataTypes.DATEONLY,
    waktu_siap: DataTypes.TIME,
    waktu_antar: DataTypes.TIME,
    catatan: DataTypes.TEXT,
    tipe_kemasan: DataTypes.STRING,
    butuh_kartu_nama: DataTypes.BOOLEAN,
    status: {
        type: DataTypes.ENUM("baru", "diproses", "selesai", "batal"),
        defaultValue: "baru"
    }
});
  
Pesanan.associate = (models) => {
    Pesanan.belongsTo(models.Produk, { foreignKey: "produk_id" });
    Pesanan.hasOne(models.JadwalProduksi, { foreignKey: "sumber_dari_pesanan_id" });
};
  
module.exports = mongoose.model("Pesanan", pesananSchema);