// src/components/ProdukForm.js
import React, { useState, useEffect } from "react";

const ProdukForm = ({ onSubmit, initialProduk = null }) => {
  const [namaProduk, setNama] = useState("");
  const [resep, setResep] = useState("");
  const [caraBuat, setCaraBuat] = useState("");

  useEffect(() => {
    if (initialProduk) {
      setNama(initialProduk.nama_produk || "");
      setResep(initialProduk.resep || "");
      setCaraBuat(initialProduk.cara_buat || "");
    } else {
      setNama("");
      setResep("");
      setCaraBuat("");
    }
  }, [initialProduk]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nama_produk: namaProduk,
      resep,
      cara_buat: caraBuat,
      _id: initialProduk?._id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-3">
        <label className="form-label">Nama Produk</label>
        <input
          type="text"
          className="form-control"
          value={namaProduk}
          onChange={(e) => setNama(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Resep</label>
        <textarea
          className="form-control"
          rows="3"
          value={resep}
          onChange={(e) => setResep(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Cara Buat</label>
        <textarea
          className="form-control"
          rows="3"
          value={caraBuat}
          onChange={(e) => setCaraBuat(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-100"
        style={{
          backgroundColor: "#ff85cb",
          border: "1px solid #ff85cb",
          color: "white",
          padding: "0.5rem",
          borderRadius: "0.375rem",
          transition: "background-color 0.2s ease"
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#e873b6";
          e.target.style.borderColor = "#e873b6";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#ff85cb";
          e.target.style.borderColor = "#ff85cb";
        }}
      >
        {initialProduk ? "Update Produk" : "Tambah Produk"}
      </button>
    </form>
  );
};

export default ProdukForm;