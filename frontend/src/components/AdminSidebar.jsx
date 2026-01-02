import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar open">
      <p onClick={() => navigate("/admin")}>Dashboard</p>
      <p onClick={() => navigate("/admin/add-perfume")}>Add Perfume</p>
      <p onClick={() => navigate("/admin/perfume-list")}>Perfume List</p>
      <p>Orders (Future)</p>
      <p>Customers (Future)</p>
    </div>
  );
};

export default AdminSidebar;
