// models/jadwalProduksi.js
const mongoose = require("mongoose");

const JadwalProduksi = new mongoose.Schema({
    tanggal: DataTypes.DATEONLY,
    kuantitas: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM("belum_selesai", "selesai"),
      defaultValue: "belum_selesai"
    }
});
  
JadwalProduksi.associate = (models) => {
    JadwalProduksi.belongsTo(models.Produk, { foreignKey: "produk_id" });
    JadwalProduksi.belongsTo(models.Pesanan, { foreignKey: "sumber_dari_pesanan_id", allowNull: true });
};
  
module.exports = mongoose.model("JadwalProduksi", jadwalProduksiSchema);