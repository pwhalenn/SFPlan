import React, { useState, useEffect } from "react";
import axios from "axios";

const PesananForm = ({ onSubmit, initialPesanan = null }) => {
  const [produkList, setProdukList] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState("");
  const [kuantitas, setKuantitas] = useState(1);
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [catatan, setCatatan] = useState("");

  useEffect(() => {
    // Fetch produk dari backend
    const fetchProduk = async () => {
      try {
        const res = await axios.get("/produk");
        setProdukList(res.data);
      } catch (err) {
        console.error("Gagal mengambil data produk:", err);
      }
    };

    fetchProduk();
  }, []);

  useEffect(() => {
    if (initialPesanan) {
      setSelectedProduk(initialPesanan.produk || "");
      setKuantitas(initialPesanan.kuantitas || 1);
      setNamaPelanggan(initialPesanan.nama_pelanggan || "");
      setWaktuMulai(initialPesanan.waktu_mulai || "");
      setCatatan(initialPesanan.catatan || "");
    }
  }, [initialPesanan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      produk: selectedProduk,
      kuantitas,
      nama_pelanggan: namaPelanggan,
      waktu_mulai: waktuMulai,
      catatan,
      _id: initialPesanan?._id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-3">
        <label className="form-label">Nama Produk</label>
        <select
          className="form-control"
          value={selectedProduk}
          onChange={(e) => setSelectedProduk(e.target.value)}
          required
        >
          <option value="">-- Pilih Produk --</option>
          {produkList.map((p) => (
            <option key={p._id} value={p.nama}>
              {p.nama}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Kuantitas</label>
        <input
          type="number"
          className="form-control"
          value={kuantitas}
          onChange={(e) => setKuantitas(e.target.value)}
          min="1"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nama Pelanggan</label>
        <input
          type="text"
          className="form-control"
          value={namaPelanggan}
          onChange={(e) => setNamaPelanggan(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Waktu Mulai Buat</label>
        <input
          type="datetime-local"
          className="form-control"
          value={waktuMulai}
          onChange={(e) => setWaktuMulai(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Catatan</label>
        <textarea
          className="form-control"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {initialPesanan ? "Update Pesanan" : "Tambah Pesanan"}
      </button>
    </form>
  );
};

export default PesananForm;