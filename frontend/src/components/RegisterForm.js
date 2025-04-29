import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, password });
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Gagal register. Username mungkin sudah digunakan.";
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            fontSize: "1rem"
          }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            fontSize: "1rem"
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#ff85cb",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.3s ease"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e873b6")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff85cb")}
      >
        Register
      </button>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <span>Sudah punya akun? </span>
        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            background: "none",
            border: "none",
            color: "#3b82f6",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "1rem"
          }}
        >
          Login sekarang
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
