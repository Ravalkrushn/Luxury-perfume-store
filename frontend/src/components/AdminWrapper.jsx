import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import "./adminLayout.css";

const AdminWrapper = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <AdminSidebar />

      <div className="content shift">
        {children}
      </div>
    </>
  );
};

export default AdminWrapper;
