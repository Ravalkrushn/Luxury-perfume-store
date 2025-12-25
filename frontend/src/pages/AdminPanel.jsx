import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import "../components/adminLayout.css";

const AdminPanel = () => {
  if (!localStorage.getItem("admin")) {
    window.location.href = "/login";
  }

  const [open, setOpen] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    };
    loadStats();
  }, []);

  if (!stats) {
    return <p style={{ marginTop: 80, textAlign: "center" }}>Loading...</p>;
  }

  return (
    <>
      <AdminNavbar toggle={() => setOpen(!open)} />
      <AdminSidebar open={open} />

      <div className={`content ${open ? "shift" : ""}`}>
        <h2>Dashboard</h2>

        <div className="cards">
          <div className="card">
            <h3>Total Sales</h3>
            <p>₹ {stats.totalSales}</p>
          </div>

          <div className="card">
            <h3>Total Customers</h3>
            <p>{stats.totalCustomers}</p>
          </div>

          <div className="card">
            <h3>Total Products</h3>
            <p>{stats.totalProducts}</p>
          </div>

          <div className="card">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
