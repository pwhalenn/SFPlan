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
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/produk">Produk</Nav.Link>
            <Nav.Link as={Link} to="/pesanan">Pesanan</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text className="me-3">Signed in as: {userName}</Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>

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