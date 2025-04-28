import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const getNextWeekDates = (startDate = new Date()) => {
  const startOfWeek = new Date(startDate);
  const day = startOfWeek.getDay();
  const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // start on Monday
  const monday = new Date(startOfWeek.setDate(diff));

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
  return dates;
};

const Dashboard = () => {
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
      const res = await axios.get("/pesanan");
      const fetchedOrders = res.data;

      const groupedOrders = {
        Senin: [],
        Selasa: [],
        Rabu: [],
        Kamis: [],
        Jumat: [],
        Sabtu: [],
        Minggu: [],
      };

      fetchedOrders.forEach((order) => {
        const dayOfWeek = new Date(order.tanggal_pesanan).toLocaleDateString("id-ID", { weekday: "long" });
        const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

        if (groupedOrders[capitalizedDay]) {
          groupedOrders[capitalizedDay].push({
            id: order._id,
            name: order.nama_pelanggan || "Pesanan",
            time: order.waktu_mulai_buat || "00:00",
          });
        }
      });

      setOrders(groupedOrders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
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
              className="flex-shrink-0 border rounded m-1 p-2"
              style={{ minWidth: '200px', minHeight: '300px' }}
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
                        className="bg-light border rounded p-2 mb-2 cursor-pointer"
                        onClick={() => navigate(`/dashboard/pesanan/${order.id}`)}
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
    </div>
  );
};

export default Dashboard;