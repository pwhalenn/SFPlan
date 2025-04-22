import React, { useState, useEffect } from "react";

const JadwalProduksiForm = ({ onSubmit, initialJadwal = null }) => {
  const [produk, setProduk] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");

  useEffect(() => {
    if (initialJadwal) {
      setProduk(initialJadwal.produk || "");
      setWaktuMulai(initialJadwal.waktu_mulai || "");
      setWaktuSelesai(initialJadwal.waktu_selesai || "");
    } else {
      setProduk("");
      setWaktuMulai("");
      setWaktuSelesai("");
    }
  }, [initialJadwal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      produk,
      waktu_mulai: waktuMulai,
      waktu_selesai: waktuSelesai,
      _id: initialJadwal ? initialJadwal._id : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
      <div className="mb-3">
        <label className="form-label">Produk</label>
        <input
          type="text"
          className="form-control"
          value={produk}
          onChange={(e) => setProduk(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Waktu Mulai</label>
        <input
          type="datetime-local"
          className="form-control"
          value={waktuMulai}
          onChange={(e) => setWaktuMulai(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Waktu Selesai</label>
        <input
          type="datetime-local"
          className="form-control"
          value={waktuSelesai}
          onChange={(e) => setWaktuSelesai(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {initialJadwal ? "Update Jadwal" : "Tambah Jadwal"}
      </button>
    </form>
  );
};

export default JadwalProduksiForm;