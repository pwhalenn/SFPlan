import React, { useState, useEffect } from "react";
import axios from "axios";


const PesananForm = ({ onSubmit, initialPesanan = null }) => {
  const [produkList, setProdukList] = useState([]);
  const [kuantitas, setKuantitas] = useState(1);
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [catatan, setCatatan] = useState("");
  const [produk, setProduk] = useState("");
  const [tanggalPesanan, setTanggalPesanan] = useState("");
  const [isHover, setIsHover] = useState(false);

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

    if (initialPesanan) {
      setKuantitas(initialPesanan.kuantitas || 1);
      setNamaPelanggan(initialPesanan.nama_pelanggan || "");
      setWaktuMulai(initialPesanan.waktu_mulai_buat || "");
      setCatatan(initialPesanan.catatan || "");
      setProduk(initialPesanan.produk_id || "");
      setTanggalPesanan(initialPesanan.tanggal_pesanan || "");
    }
  }, [initialPesanan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nama_produk: produk,
      kuantitas,
      waktu_mulai_buat: waktuMulai,
      catatan,
      nama_pelanggan: namaPelanggan,
      tanggal_pesanan: tanggalPesanan,
      _id: initialPesanan?._id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-6">
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

          <div className="col-md-6">
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

          <div className="col-md-6">
            <label className="form-label">Tanggal Pesanan</label>
            <input
              type="date"
              className="form-control"
              value={tanggalPesanan}
              onChange={(e) => setTanggalPesanan(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Waktu Mulai Buat</label>
            <input
              type="time"
              className="form-control"
              value={waktuMulai}
              onChange={(e) => setWaktuMulai(e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Nama Pelanggan</label>
            <input
              type="text"
              className="form-control"
              value={namaPelanggan}
              onChange={(e) => setNamaPelanggan(e.target.value)}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Catatan</label>
            <textarea
              className="form-control"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              rows="3"
            />
          </div>

          <div className="col-12">
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{
              backgroundColor: isHover ? "#e873b6" : "#ff85cb",
              borderColor: isHover ? "#e873b6" : "#ff85cb",
            }}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {initialPesanan ? "Update Pesanan" : "Tambah Pesanan"}
          </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PesananForm;