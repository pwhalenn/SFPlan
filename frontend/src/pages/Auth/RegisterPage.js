// src/pages/Auth/RegisterPage.js
import React from "react";
import RegisterForm from "../../components/RegisterForm";

const RegisterPage = () => {
  const handleRegister = async (formData) => {
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Registrasi berhasil, silakan login");
      window.location.href = "/login";
    } else {
      alert(data.message || "Registrasi gagal");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9fafb",
      padding: "2rem"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;