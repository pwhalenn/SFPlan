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
    <div>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;