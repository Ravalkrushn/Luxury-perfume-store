import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRupeeSign,
  FaUserFriends,
  FaBoxes,
  FaShoppingCart,
} from "react-icons/fa";
import API from "../services/api";
import AdminWrapper from "../components/AdminWrapper";
import "./AdminPanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      navigate("/login");
      return;
    }

    const loadStats = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };
    loadStats();
  }, [navigate]);

  if (!stats) {
    return (
      <AdminWrapper>
        <p
          style={{
            marginTop: 80,
            textAlign: "center",
            fontSize: "18px",
            color: "#666",
          }}
        >
          Loading Dashboard...
        </p>
      </AdminWrapper>
    );
  }

  return (
    <AdminWrapper>
      <h2 className="dashboard-title">Dashboard Overview</h2>

      <div className="dashboard-cards">
        <div className="stat-card sales">
          <div className="icon-wrapper">
            <FaRupeeSign />
          </div>
          <div className="stat-info">
            <h3>Total Sales</h3>
            <p>₹ {stats.totalSales}</p>
          </div>
        </div>

        <div className="stat-card customers">
          <div className="icon-wrapper">
            <FaUserFriends />
          </div>
          <div className="stat-info">
            <h3>Total Customers</h3>
            <p>{stats.totalCustomers}</p>
          </div>
        </div>

        <div className="stat-card products">
          <div className="icon-wrapper">
            <FaBoxes />
          </div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p>{stats.totalProducts}</p>
          </div>
        </div>

        <div className="stat-card orders">
          <div className="icon-wrapper">
            <FaShoppingCart />
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default AdminPanel;
