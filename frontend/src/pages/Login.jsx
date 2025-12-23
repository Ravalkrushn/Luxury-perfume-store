import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/login", data);
      localStorage.setItem("admin", "true");
      nav("/admin");
    } catch {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="page center">
      <h1>Admin Login</h1>
      <form onSubmit={login} className="form">
        <input
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button>Login</button>
      </form>

      <button onClick={() => nav("/")} style={{ marginTop: 20 }}>
        ⬅ Back to Home
      </button>
    </div>
  );
};

export default Login;
