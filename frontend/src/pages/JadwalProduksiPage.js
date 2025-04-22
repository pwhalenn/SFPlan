import React, { useEffect, useState, useCallback } from "react";
import JadwalProduksiForm from "../components/JadwalProduksiForm";
import JadwalProduksiList from "../components/JadwalProduksiList";
import * as jadwalService from "../services/jadwalProduksiService";

const JadwalProduksiPage = () => {
  const [jadwal, setJadwal] = useState([]);
  const [editingJadwal, setEditingJadwal] = useState(null);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, variant) => {
    setAlert({ message, variant });
    setTimeout(() => setAlert(null), 3000);
  };

  const fetchJadwal = useCallback(async () => {
    try {
      const data = await jadwalService.getJadwalProduksi();
      setJadwal(data);
    } catch {
      showAlert("Gagal mengambil jadwal", "danger");
    }
  }, []);

  useEffect(() => {
    fetchJadwal();
  }, [fetchJadwal]);

  const handleAddOrUpdate = async (data) => {
    try {
      let updated;
      if (data._id) {
        updated = await jadwalService.updateJadwalProduksi(data._id, data);
        setJadwal((prev) => prev.map((j) => (j._id === data._id ? updated : j)));
        showAlert("Jadwal diperbarui", "success");
      } else {
        updated = await jadwalService.createJadwalProduksi(data);
        setJadwal((prev) => [updated, ...prev]);
        showAlert("Jadwal ditambahkan", "success");
      }
      setEditingJadwal(null);
    } catch {
      showAlert("Gagal menyimpan jadwal", "danger");
    }
  };

  const handleDelete = async (id) => {
    try {
      await jadwalService.deleteJadwalProduksi(id);
      setJadwal((prev) => prev.filter((j) => j._id !== id));
      showAlert("Jadwal dihapus", "success");
    } catch {
      showAlert("Gagal menghapus jadwal", "danger");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column gap-4">
        <h2>Jadwal Produksi</h2>
        {alert && (
          <div className={`alert alert-${alert.variant}`} role="alert">
            {alert.message}
          </div>
        )}
        <JadwalProduksiForm onSubmit={handleAddOrUpdate} initialJadwal={editingJadwal} />
        <JadwalProduksiList jadwal={jadwal} onEdit={setEditingJadwal} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default JadwalProduksiPage;