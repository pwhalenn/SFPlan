import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import JadwalProduksiPage from './pages/JadwalProduksiPage';
import PesananPage from './pages/PesananPage';
import ProdukPage from './pages/ProdukPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jadwal-produksi" element={<JadwalProduksiPage />} />
        <Route path="/pesanan" element={<PesananPage />} />
        <Route path="/produk" element={<ProdukPage />} />
        {/* Rute default atau rute lainnya bisa ditambahkan di sini */}
        <Route path="/" element={<div>Selamat Datang di Aplikasi SFPlan!</div>} />
      </Routes>
    </Router>
  );
}

export default App;