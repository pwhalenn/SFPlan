import React, { useEffect, useState, useCallback } from "react";
import ProdukForm from "../components/ProdukForm";
import ProdukList from "../components/ProdukList";
import * as produkService from "../services/produkService";

const ProdukPage = () => {
  const [produk, setProduk] = useState([]);
  const [editingProduk, setEditingProduk] = useState(null);
  const [alert, setAlert] = useState(null);

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

  return (
    <div className="container py-4">
      <div className="d-flex flex-column gap-4">
        <h2>Manajemen Produk</h2>
        {alert && (
          <div className={`alert alert-${alert.variant}`} role="alert">
            {alert.message}
          </div>
        )}
        <ProdukForm onSubmit={handleAddOrUpdate} initialProduk={editingProduk} />
        <ProdukList produk={produk} onEdit={setEditingProduk} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default ProdukPage;