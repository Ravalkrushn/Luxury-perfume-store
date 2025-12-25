import React from "react";
import "./adminLayout.css";

const AdminNavbar = ({ toggle }) => {
  return (
    <div className="admin-navbar">
      <div className="nav-left">
        <span className="hamburger" onClick={toggle}>
          ☰
        </span>
        <img src="/LOGOPERFUME.svg" alt="logo" className="logo" />
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
