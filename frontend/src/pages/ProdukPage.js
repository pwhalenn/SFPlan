import React, { useEffect, useState, useCallback } from "react";
import ProdukList from "../components/ProdukList";
import * as produkService from "../services/produkService";
import { Modal, Button } from "react-bootstrap";
import ProdukForm from "../components/ProdukForm";  // Untuk form yang muncul di dalam modal

const ProdukPage = () => {
  const [produk, setProduk] = useState([]);
  const [editingProduk, setEditingProduk] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false); // Untuk mengontrol modal
  const [selectedProduk, setSelectedProduk] = useState(null);

  const showAlert = (message, variant) => {
    setAlert({ message, variant });
    setTimeout(() => setAlert(null), 3000);
  };

  const fetchProduk = useCallback(async () => {
    try {
      const data = await produkService.getProduk();
      setProduk(data);
    } catch {
      showAlert("Gagal mengambil produk", "danger");
    }
  }, []);

  useEffect(() => {
    fetchProduk();
  }, [fetchProduk]);

  const handleAddOrUpdate = async (data) => {
    try {
      let updatedProduk;
      if (data._id) {
        updatedProduk = await produkService.updateProduk(data._id, data);
        setProduk((prev) => prev.map((p) => (p._id === data._id ? updatedProduk : p)));
        showAlert("Produk diperbarui", "success");
      } else {
        updatedProduk = await produkService.createProduk(data);
        setProduk((prev) => [updatedProduk, ...prev]);
        showAlert("Produk ditambahkan", "success");
      }
      setEditingProduk(null);
      setShowModal(false);
    } catch {
      showAlert("Gagal menyimpan produk", "danger");
    }
  };

  const handleDelete = async (id) => {
    try {
      await produkService.deleteProduk(id);
      setProduk((prev) => prev.filter((p) => p._id !== id));
      showAlert("Produk dihapus", "success");
    } catch {
      showAlert("Gagal menghapus produk", "danger");
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div className="container py-4">
          <nav className="mb-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link" href="/dashboard">
            ⬅ Kembali ke Dashboard
          </a>
        </li>
        <li className="nav-item">
          <span className="nav-link active">Manajemen Produk</span>
        </li>
      </ul>
    </nav>
      <div className="d-flex flex-column gap-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Manajemen Produk</h2>
          <Button
            onClick={handleShowModal}
            style={{
              backgroundColor: "#ff85cb",
              borderColor: "#ff85cb",
              color: "#fff"
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
            Tambah Produk
          </Button>
        </div>
        
        {alert && (
          <div className={`alert alert-${alert.variant}`} role="alert">
            {alert.message}
          </div>
        )}

        {/* Daftar produk */}
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nama Produk</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Cara Buat</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produk.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">Tidak ada produk</td>
                </tr>
              ) : (
                produk.map((prod) => (
                  <tr key={prod._id}>
                    <td>{prod.name || prod.nama_produk}</td>
                    <td style={{ whiteSpace: "pre-line" }}>{prod.description || prod.resep}</td>
                    <td style={{ whiteSpace: "pre-line" }}>{prod.cara_buat || "-"}</td>
                    <td>
                    <button
                      className="btn btn-outline-warning btn-sm me-2"
                      onClick={() => {
                        setEditingProduk(prod);
                        setShowModal(true); // Tambahkan ini agar modal muncul saat edit
                      }}
                    >
                      Edit
                    </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(prod._id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduk ? "Edit Produk" : "Tambah Produk"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProdukForm 
            onSubmit={handleAddOrUpdate} 
            initialProduk={editingProduk} 
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProdukPage;
