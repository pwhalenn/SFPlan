import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PesananForm from "../components/PesananForm";

const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const getNextWeekDates = (startDate = new Date()) => {
  const startOfWeek = new Date(startDate);
  const day = startOfWeek.getDay();
  const diff = startDate.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(startOfWeek.setDate(diff));

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
  return dates;
};

const Dashboard = () => {
  // Tambahkan state untuk menyimpan data produk
  const [products, setProducts] = useState([]);
  
  const [weekOffset, setWeekOffset] = useState(0);
  const [orders, setOrders] = useState({
    Senin: [],
    Selasa: [],
    Rabu: [],
    Kamis: [],
    Jumat: [],
    Sabtu: [],
    Minggu: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedPesanan, setSelectedPesanan] = useState(null);

  const navigate = useNavigate();

  const handleWeekChange = (offset) => {
    setWeekOffset(weekOffset + offset);
  };

  const currentWeekDates = getNextWeekDates(new Date(Date.now() + weekOffset * 7 * 24 * 60 * 60 * 1000));

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  const fetchOrders = async () => {
    try {
      const productsRes = await axios.get("/produk");
      const productsData = productsRes.data;
      
      const productMap = {};
      productsData.forEach(product => {
        productMap[product._id] = product.nama_produk;
        console.log(`Adding product: ID=${product._id}, Name=${product.nama_produk}`);
      });

      const res = await axios.get("/pesanan");
      const fetchedOrders = res.data;
      
      const groupedOrders = {
        Senin: [], Selasa: [], Rabu: [], Kamis: [], 
        Jumat: [], Sabtu: [], Minggu: [],
      };

      fetchedOrders.forEach((order) => {
        console.log("Full order data:", order);

        const productId = order.nama_produk;
        console.log("Looking for product with ID:", productId);
        console.log("Available product IDs:", Object.keys(productMap));

        const dayOfWeek = new Date(order.tanggal_pesanan)
          .toLocaleDateString("id-ID", { weekday: "long" });
        const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
        
        const productName = productMap[order.nama_produk];
        
        if (groupedOrders[capitalizedDay]) {
          groupedOrders[capitalizedDay].push({
            id: order._id,
            name: productName || `Produk tidak ditemukan`,
            time: order.waktu_mulai_buat || "00:00",
            fullData: {
              ...order,
              nama_produk: productName,
              produk: productName,
            },
          });
        }
      });

      setOrders(groupedOrders);
    } catch (err) {
      console.error("Error in fetchOrders:", err.response?.data || err.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/produk");
      setProducts(res.data);
    } catch (err) {
      console.error("Gagal mengambil data produk:", err);
    }
  };

  const handlePesananClick = (order) => {
    const orderWithProductDetails = {
      ...order.fullData,
      availableProducts: products,
      produk: order.fullData.produk,
      produk_id: order.fullData.produk,
      nama_produk: order.name,
      tanggal_pesanan: new Date(order.fullData.tanggal_pesanan).toISOString().split('T')[0],
      waktu_mulai_buat: order.fullData.waktu_mulai_buat,
      kuantitas: order.fullData.kuantitas,
      catatan: order.fullData.catatan,
      nama_pelanggan: order.fullData.nama_pelanggan,
      _id: order.id
    };
    setSelectedPesanan(orderWithProductDetails);
    setShowModal(true);
  };

  const handleSubmit = async (updatedData) => {
    try {
      if (updatedData._id) {
        await axios.put(`/pesanan/${updatedData._id}`, updatedData);
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

  return (
    <div className="container py-4">
      {/* Top Navigation */}
      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <div className="fw-bold">Dashboard</div>
        </div>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-primary me-3"
            onClick={() => navigate("/produk")}
          >
            Produk
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Weekly Schedule Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Jadwal Produksi Mingguan</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/pesanan")}
        >
          + Tambah Pesanan
        </button>
      </div>

      {/* Week navigation */}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-outline-secondary" onClick={() => handleWeekChange(-1)}>Minggu Sebelumnya</button>
        <button className="btn btn-outline-secondary" onClick={() => handleWeekChange(1)}>Minggu Berikutnya</button>
      </div>

      {/* Weekly Schedule Cards */}
      <div className="d-flex overflow-auto">
        {daysOfWeek.map((day, idx) => {
          const ordersForThatDay = orders[day] || [];
          const displayDate = currentWeekDates[idx].toLocaleDateString("id-ID");

          return (
            <div
            key={day}
            className="flex-shrink-0 shadow-sm"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "16px",
              margin: "8px",
              minWidth: "220px",
              minHeight: "300px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)"
            }}
          >

              <div className="fw-bold text-center">
                {day}<br />({displayDate})
              </div>
              <div className="mt-3">
                {ordersForThatDay.length > 0 ? (
                  ordersForThatDay
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((order) => (
                      <div
                        key={order.id}
                        className="bg-light border rounded p-2 mb-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePesananClick(order)}
                      >
                        {order.name} ({order.time})
                      </div>
                    ))
                ) : (
                  <div className="text-muted text-center">Belum ada pesanan</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal untuk edit */}
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