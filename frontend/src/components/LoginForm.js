import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ username, password });
    } catch (error) {
      alert("Login gagal. Username atau password salah.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
          backgroundColor: "e873b6", 
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          fontWeight: "600",
          cursor: "pointer",
          transition: "background-color 0.3s ease"
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e873b6")} // hover pink
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ff85cb")}
      >
        Login
      </button>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <span>Don't have an account? </span>
        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            background: "none",
            border: "none",
            color: "#3b82f6",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "1rem"
          }}
        >
          Register now
        </button>
      </div>
    </form>
  );
};

export default LoginForm; // ✅ Tambahkan ini di akhir
