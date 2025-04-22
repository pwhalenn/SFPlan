import React, { useEffect, useState, useCallback } from "react";
import PesananForm from "../components/PesananForm";
import PesananList from "../components/PesananList";
import * as pesananService from "../services/pesananService";

const PesananPage = () => {
  const [pesanan, setPesanan] = useState([]);
  const [editingPesanan, setEditingPesanan] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, variant) => {
    setAlert({ message, variant });
    setTimeout(() => setAlert(null), 3000);
  };

  const fetchPesanan = useCallback(async () => {
    try {
      const data = await pesananService.getPesanan();
      setPesanan(data);
    } catch {
      showAlert("Gagal mengambil pesanan", "danger");
    }
  }, []);

  useEffect(() => {
    fetchPesanan();
  }, [fetchPesanan]);

  const handleAddOrUpdate = async (data) => {
    try {
      let updated;
      if (data._id) {
        updated = await pesananService.updatePesanan(data._id, data);
        setPesanan((prev) => prev.map((p) => (p._id === data._id ? updated : p)));
        showAlert("Pesanan diperbarui", "success");
      } else {
        updated = await pesananService.createPesanan(data);
        setPesanan((prev) => [updated, ...prev]);
        showAlert("Pesanan ditambahkan", "success");
      }
      setEditingPesanan(null);
    } catch {
      showAlert("Gagal menyimpan pesanan", "danger");
    }
  };

  const handleDelete = async (id) => {
    try {
      await pesananService.deletePesanan(id);
      setPesanan((prev) => prev.filter((p) => p._id !== id));
      showAlert("Pesanan dihapus", "success");
    } catch {
      showAlert("Gagal menghapus pesanan", "danger");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column gap-4">
        <h2>Manajemen Pesanan</h2>
        {alert && (
          <div className={`alert alert-${alert.variant}`} role="alert">
            {alert.message}
          </div>
        )}
        <PesananForm onSubmit={handleAddOrUpdate} initialPesanan={editingPesanan} />
        <PesananList pesanan={pesanan} onEdit={setEditingPesanan} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default PesananPage;