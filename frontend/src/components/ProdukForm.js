// src/components/PesananForm.js
import React, { useEffect, useState } from "react";
import * as produkService from "../services/produkService"; // pastikan file ini ada dan benar

const PesananForm = ({ onSubmit, initialPesanan = null }) => {
  const [produkList, setProdukList] = useState([]);
  const [selectedProduk, setSelectedProduk] = useState("");
  const [jumlah, setJumlah] = useState("");

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const data = await produkService.getProduk();
        setProdukList(data);
      } catch (err) {
        console.error("Gagal mengambil daftar produk", err);
      }
    };
    fetchProduk();
  }, []);

  useEffect(() => {
    if (initialPesanan) {
      setSelectedProduk(initialPesanan.produk || "");
      setJumlah(initialPesanan.jumlah || "");
    } else {
      setSelectedProduk("");
      setJumlah("");
    }
  }, [initialPesanan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      produk: selectedProduk,
      jumlah,
      _id: initialPesanan?._id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-3">
        <label className="form-label">Produk</label>
        <select
          className="form-select"
          value={selectedProduk}
          onChange={(e) => setSelectedProduk(e.target.value)}
          required
        >
          <option value="">Pilih Produk</option>
          {produkList.map((produk) => (
            <option key={produk._id} value={produk._id}>
              {produk.nama_produk}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Jumlah</label>
        <input
          type="number"
          className="form-control"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
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