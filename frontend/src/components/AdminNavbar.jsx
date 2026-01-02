import React from "react";
import "./adminLayout.css";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <div className="nav-left">
        <img src="/logo192.png" alt="logo" className="logo" />
        <span className="brand">Luxury Perfume</span>
      </div>

      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("admin");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
