import React, { useState, useEffect } from "react";

const PesananForm = ({ onSubmit, initialPesanan = null }) => {
  const [produk, setProduk] = useState("");
  const [spesifikasi, setSpesifikasi] = useState("");
  const [waktuSiap, setWaktuSiap] = useState("");
  const [waktuAntar, setWaktuAntar] = useState("");
  const [perluKartuNama, setPerluKartuNama] = useState(false);
  const [tipePackaging, setTipePackaging] = useState("");

  useEffect(() => {
    if (initialPesanan) {
      setProduk(initialPesanan.produk || "");
      setSpesifikasi(initialPesanan.spesifikasi || "");
      setWaktuSiap(initialPesanan.waktu_siap || "");
      setWaktuAntar(initialPesanan.waktu_antar || "");
      setTipePackaging(initialPesanan.tipe_packaging || "");
      setPerluKartuNama(initialPesanan.perlu_kartu_nama || false);
    }
  }, [initialPesanan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      produk,
      spesifikasi,
      waktu_siap: waktuSiap,
      waktu_antar: waktuAntar,
      tipe_packaging: tipePackaging,
      perlu_kartu_nama: perluKartuNama,
      _id: initialPesanan ? initialPesanan._id : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
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
        <label className="form-label">Spesifikasi</label>
        <textarea
          className="form-control"
          value={spesifikasi}
          onChange={(e) => setSpesifikasi(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Waktu Siap</label>
        <input
          type="datetime-local"
          className="form-control"
          value={waktuSiap}
          onChange={(e) => setWaktuSiap(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Waktu Antar</label>
        <input
          type="datetime-local"
          className="form-control"
          value={waktuAntar}
          onChange={(e) => setWaktuAntar(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tipe Packaging</label>
        <input
          type="text"
          className="form-control"
          value={tipePackaging}
          onChange={(e) => setTipePackaging(e.target.value)}
        />
      </div>
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="kartuNamaCheck"
          checked={perluKartuNama}
          onChange={(e) => setPerluKartuNama(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="kartuNamaCheck">
          Perlu Kartu Nama?
        </label>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {initialPesanan ? "Update Pesanan" : "Tambah Pesanan"}
      </button>
    </form>
  );
};

export default PesananForm;