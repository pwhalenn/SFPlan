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
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Gagal register. Username mungkin sudah digunakan.";
      alert(errorMessage);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 border rounded">
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-teal w-100 btn btn-primary">
        Register
      </button>
      <div className="mt-3 text-center">
        <span>Already have an account? </span>
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => navigate("/login")}
        >
          Login now
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;