import { useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaPlusCircle,
  FaList,
  FaShoppingBag,
  FaUsers,
  FaChartLine,
  FaFileAlt,
} from "react-icons/fa";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          .sidebar {
            background-color: #ffffff !important;
            color: #333 !important;
            box-shadow: 2px 0 10px rgba(0,0,0,0.05);
            border-right: 1px solid #f0f0f0;
          }
          .sidebar p {
            color: #555 !important;
            transition: 0.3s;
          }
          .sidebar p:hover {
            background-color: #f8f9fa !important;
            color: #000 !important;
          }
        `}
      </style>
      <div className="sidebar open" style={{ paddingTop: "30px" }}>
        <p onClick={() => navigate("/admin")}>
          <FaThLarge style={{ marginRight: "10px" }} /> Dashboard
        </p>
        <p onClick={() => navigate("/admin/add-perfume")}>
          <FaPlusCircle style={{ marginRight: "10px" }} /> Add Perfume
        </p>
        <p onClick={() => navigate("/admin/perfume-list")}>
          <FaList style={{ marginRight: "10px" }} /> Perfume List
        </p>
        <p>
          <FaShoppingBag style={{ marginRight: "10px" }} /> Orders (working)
        </p>
        <p>
          <FaUsers style={{ marginRight: "10px" }} /> Customers (working)
        </p>
        <p>
          <FaChartLine style={{ marginRight: "10px" }} /> sales (working)
        </p>
        <p>
          <FaFileAlt style={{ marginRight: "10px" }} /> Reports (working)
        </p>
      </div>
    </>
  );
};

export default AdminSidebar;
