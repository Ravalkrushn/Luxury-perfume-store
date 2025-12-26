import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdminWrapper from "../components/AdminWrapper";

const AdminPanel = () => {
  if (!localStorage.getItem("admin")) {
    window.location.href = "/login";
  }

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
    <AdminWrapper>
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
    </AdminWrapper>
  );
};

export default AdminPanel;
