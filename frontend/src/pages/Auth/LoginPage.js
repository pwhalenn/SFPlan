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
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;