import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "./adminLayout.css";

const AdminNavbar = () => {
  return (
    <div
      className="admin-navbar"
      style={{ backgroundColor: "#ffffff", color: "#333333" }}
    >
      <div className="nav-left">
        <img src="/logo192.png" alt="logo" className="logo" />
        <span className="brand" style={{ color: "#333333" }}>
          LUXURY SCENT
        </span>
      </div>

      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem("admin");
          window.location.href = "/login";
        }}
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
