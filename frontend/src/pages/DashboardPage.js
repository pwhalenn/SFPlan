// SFPlan-based Dashboard UI Layout
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // Dummy data untuk setiap hari
  const [orders, setOrders] = useState({
    Senin: [],
    Selasa: [],
    Rabu: [],
    Kamis: [],
    Jumat: [],
    Sabtu: [],
    Minggu: [],
  });

  const handleWeekChange = (offset) => {
    setWeekOffset(weekOffset + offset);
  };

  const currentWeekDates = getNextWeekDates(new Date(Date.now() + weekOffset * 7 * 24 * 60 * 60 * 1000));

  return (
    <div className="container py-4">
      <h2 className="mb-4">Jadwal Produksi Mingguan</h2>
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-outline-secondary" onClick={() => handleWeekChange(-1)}>Minggu Sebelumnya</button>
        <button className="btn btn-outline-secondary" onClick={() => handleWeekChange(1)}>Minggu Berikutnya</button>
      </div>
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

                <div
                  className="text-primary text-center mt-2 cursor-pointer"
                  onClick={() => navigate(`/pesanan?day=${day}&date=${displayDate}`)}
                >
                  + Tambah Pesanan
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;