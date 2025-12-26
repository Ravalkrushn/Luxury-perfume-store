import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import "./adminLayout.css";

const AdminWrapper = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdminNavbar toggle={() => setOpen(!open)} />
      <AdminSidebar open={open} />

      <div className={`content ${open ? "shift" : ""}`}>
        {children}
      </div>
    </>
  );
};

export default AdminWrapper;
