// src/pages/Auth/LoginPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login berhasil");

      onLogin(); // ✅ kasih tahu App bahwa login sukses
      navigate("/dashboard"); // ✅ pindah ke dashboard tanpa reload
    } else {
      alert(data.message || "Login gagal");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f3f4f6" // abu-abu muda
    }}>
      <div style={{
        padding: "2rem",
        backgroundColor: "#ffffff",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#111827" }}>Login</h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
  
};

export default LoginPage;