import React, { useState, useEffect } from "react";
import * as produkService from "../services/produkService";
import axios from "axios";

const PesananForm = ({ onSubmit, initialPesanan = null }) => {
  const [produkList, setProdukList] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState("");
  const [kuantitas, setKuantitas] = useState(1);
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [catatan, setCatatan] = useState("");
  const [produk, setProduk] = useState("");

  useEffect(() => {
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
      setProduk(initialPesanan.produk_id || "");
    }
  }, [initialPesanan]);

  const handleSubmit = (e) => {
    console.log("Form disubmit");
    e.preventDefault();
    onSubmit({
      nama_produk: selectedProduk,
      kuantitas,
      waktu_mulai_buat: waktuMulai,
      catatan,
      nama_pelanggan: namaPelanggan,
      _id: initialPesanan?._id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-3">
        <label className="form-label">Produk</label>
        <select
          className="form-select"
          value={produk}
          onChange={(e) => setProduk(e.target.value)}
          required
        >
          <option value="">-- Pilih Produk --</option>
          {produkList.map((p) => (
            <option key={p._id} value={p._id}>
              {p.nama_produk}
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

      <button type="submit" className="btn btn-primary w-100">
        {initialPesanan ? "Update Pesanan" : "Tambah Pesanan"}
      </button>
    </form>
  );
};

export default PesananForm;