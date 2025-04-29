import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PesananForm from "../components/PesananForm";
import "../App.css";

const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const getNextWeekDates = (startDate = new Date()) => {
  const startOfWeek = new Date(startDate);
  const day = startOfWeek.getDay();
  const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(startOfWeek.setDate(diff));

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
};

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [orders, setOrders] = useState({
    Senin: [], Selasa: [], Rabu: [], Kamis: [],
    Jumat: [], Sabtu: [], Minggu: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedPesanan, setSelectedPesanan] = useState(null);

  const navigate = useNavigate();
  const currentWeekDates = getNextWeekDates(
    new Date(Date.now() + weekOffset * 7 * 24 * 60 * 60 * 1000)
  );

  const handleWeekChange = (offset) => setWeekOffset(weekOffset + offset);
  const handleLogout = () => navigate("/login");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/produk");
      setProducts(res.data);
    } catch (err) {
      console.error("Gagal mengambil produk:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const productsRes = await axios.get("/produk");
      const productMap = {};
      productsRes.data.forEach(p => productMap[p._id] = p.nama_produk);

      const res = await axios.get("/pesanan");
      const grouped = {
        Senin: [], Selasa: [], Rabu: [], Kamis: [],
        Jumat: [], Sabtu: [], Minggu: [],
      };

      res.data.forEach((order) => {
        const day = new Date(order.tanggal_pesanan).toLocaleDateString("id-ID", { weekday: "long" });
        const capDay = day.charAt(0).toUpperCase() + day.slice(1);
        const name = productMap[order.nama_produk] || "Produk tidak ditemukan";

        if (grouped[capDay]) {
          grouped[capDay].push({
            id: order._id,
            name,
            time: order.waktu_mulai_buat || "00:00",
            fullData: { ...order, nama_produk: name, produk: name }
          });
        }
      });

      setOrders(grouped);
    } catch (err) {
      console.error("Error fetchOrders:", err);
    }
  };

  const handlePesananClick = (order) => {
    const data = {
      ...order.fullData,
      availableProducts: products,
      produk: order.fullData.produk,
      produk_id: order.fullData.produk,
      nama_produk: order.name,
      tanggal_pesanan: new Date(order.fullData.tanggal_pesanan).toISOString().split("T")[0],
      waktu_mulai_buat: order.fullData.waktu_mulai_buat,
      kuantitas: order.fullData.kuantitas,
      catatan: order.fullData.catatan,
      nama_pelanggan: order.fullData.nama_pelanggan,
      _id: order.id
    };
    setSelectedPesanan(data);
    setShowModal(true);
  };

  const handleSubmit = async (updated) => {
    try {
      if (updated._id) {
        await axios.put(`/pesanan/${updated._id}`, updated);
      }
      setShowModal(false);
      setSelectedPesanan(null);
      fetchOrders();
    } catch (err) {
      console.error("Gagal update pesanan:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [weekOffset]);

  const renderDayCards = (dayNames) => (
    <div className="d-flex justify-content-center flex-wrap">
      {dayNames.map((day, idx) => {
        const ordersToday = orders[day] || [];
        const displayDate = currentWeekDates[idx].toLocaleDateString("id-ID");

        return (
          <div key={day} className="card-day">
            <div className="card-title">
              {day}<br />({displayDate})
            </div>
            <div className="mt-3">
              {ordersToday.length > 0 ? (
                ordersToday
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((order) => (
                    <div key={order.id} className="order-item" onClick={() => handlePesananClick(order)}>
                      {order.name} ({order.time})
                    </div>
                  ))
              ) : (
                <div className="no-orders">Belum ada pesanan</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between mb-4">
        <h4>Dashboard</h4>
        <div>
          <button className="btn btn-outline-pink me-2" onClick={() => navigate("/produk")}>
            Produk
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Jadwal Produksi Mingguan</h2>
        <button className="btn btn-pink" onClick={() => navigate("/pesanan")}>
          + Tambah Pesanan
        </button>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-outline-secondary" onClick={() => handleWeekChange(-1)}>Minggu Sebelumnya</button>
        <button className="btn btn-outline-secondary" onClick={() => handleWeekChange(1)}>Minggu Berikutnya</button>
      </div>

      {/* Schedule Grid */}
      <div className="mb-4">{renderDayCards(["Senin", "Selasa", "Rabu", "Kamis"])}</div>
      <div>{renderDayCards(["Jumat", "Sabtu", "Minggu"])}</div>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Pesanan</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <PesananForm initialPesanan={selectedPesanan} onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
