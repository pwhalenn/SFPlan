import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PesananPage from "./pages/PesananPage";
import ProdukPage from "./pages/ProdukPage";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Admin"); // Bisa diganti dari response login

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserName("Admin"); // Ganti dengan nama dari API kalau perlu
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
  };

  const AuthenticatedApp = () => (
    <>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/produk" element={<ProdukPage />} />
          <Route path="/pesanan" element={<PesananPage />} />
        </Routes>
      </Container>
    </>
  );

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/dashboard/*" element={<DashboardPage />} />
            <Route path="/pesanan" element={<PesananPage />} />
            <Route path="/produk" element={<ProdukPage />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<AuthenticatedApp />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;