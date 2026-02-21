import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

import API from "../services/api";
import AdminWrapper from "../components/AdminWrapper";
import "./AdminPerfumeList.css";

const AdminPerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [edit, setEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const itemsPerPage = 5;

  const loadPerfumes = async () => {
    const res = await API.get("/perfumes");
    setPerfumes(res.data);
  };

  useEffect(() => {
    loadPerfumes();
  }, []);
  const navigate = useNavigate();

  const deletePerfume = async (id) => {
    if (!window.confirm("Are you sure you want to delete this perfume?"))
      return;
    await API.delete(`/perfumes/${id}`);
    loadPerfumes();
  };

  const updatePerfume = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", edit.name);
    formData.append("brand", edit.brand);
    formData.append("price", edit.price);
    formData.append("quantity", edit.quantity);
    formData.append("description", edit.description);

    if (edit.imageFile) {
      formData.append("image", edit.imageFile);
    }

    await API.put(`/perfumes/${edit._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setEdit(null);
    loadPerfumes();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = perfumes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(perfumes.length / itemsPerPage);

  return (
    <AdminWrapper>
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "60px",
          marginBottom: "40px",
        }}
      >
        <h2 className="page-title" style={{ margin: 0 }}>
          Perfume List
        </h2>

        <button
          className="add-btn"
          onClick={() => navigate("/admin/add-perfume")}
        >
          + Add Perfume
        </button>
      </div>

      <div className="table-card">
        <table className="perfume-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={`http://localhost:5000${p.image}`}
                    alt={p.name}
                    className="table-img"
                    onClick={() =>
                      setSelectedImage(`http://localhost:5000${p.image}`)
                    }
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>₹{p.price}</td>
                <td>{p.quantity}</td>
                <td className="desc">{p.description}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setEdit(p)}
                    style={{
                      borderRadius: "50%",
                      width: "35px",
                      height: "35px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                      marginRight: "10px",
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deletePerfume(p._id)}
                    style={{
                      borderRadius: "50%",
                      width: "35px",
                      height: "35px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            gap: "15px",
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              background: "none",
              border: "none",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            <FaChevronLeft
              size={20}
              color={currentPage === 1 ? "#ccc" : "#333"}
            />
          </button>
          <span style={{ fontWeight: "600", fontSize: "16px" }}>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            style={{
              background: "none",
              border: "none",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            <FaChevronRight
              size={20}
              color={currentPage === totalPages ? "#ccc" : "#333"}
            />
          </button>
        </div>
      )}

      {edit && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Perfume</h3>

            <form onSubmit={updatePerfume}>
              <input
                value={edit.name}
                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                placeholder="Name"
              />

              <input
                value={edit.brand}
                onChange={(e) => setEdit({ ...edit, brand: e.target.value })}
                placeholder="Brand"
              />

              <input
                type="number"
                value={edit.price}
                onChange={(e) => setEdit({ ...edit, price: e.target.value })}
                placeholder="Price"
              />

              <input
                type="number"
                value={edit.quantity}
                onChange={(e) => setEdit({ ...edit, quantity: e.target.value })}
                placeholder="Quantity"
              />

              <textarea
                value={edit.description}
                onChange={(e) =>
                  setEdit({ ...edit, description: e.target.value })
                }
                placeholder="Description"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEdit({ ...edit, imageFile: e.target.files[0] })
                }
              />

              <div className="modal-actions">
                <button className="save-btn" type="submit">
                  Save
                </button>
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={() => setEdit(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "30px 50px",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: "1px solid #eee",
            }}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 100 100"
              style={{ marginBottom: "15px", display: "block" }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#2ecc71"
                strokeWidth="5"
                style={{
                  strokeDasharray: 283,
                  strokeDashoffset: 283,
                  animation: "circle-draw 0.5s ease-out forwards",
                }}
              />
              <path
                d="M28 50 L43 65 L72 32"
                fill="none"
                stroke="#2ecc71"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 70,
                  strokeDashoffset: 70,
                  animation: "check-draw 0.4s 0.5s ease-out forwards",
                }}
              />
              <style>
                {`
                  @keyframes circle-draw {
                    to { stroke-dashoffset: 0; }
                  }
                  @keyframes check-draw {
                    to { stroke-dashoffset: 0; }
                  }
                `}
              </style>
            </svg>
            <h3
              style={{ margin: "0 0 10px 0", color: "#333", fontSize: "22px" }}
            >
              Success!
            </h3>
            <p style={{ margin: 0, color: "#666", fontSize: "16px" }}>
              Product updated successfully.
            </p>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 11000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            style={{ position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                backgroundColor: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                zIndex: 10,
              }}
            >
              <FaTimes size={18} color="#333" />
            </button>
            <img
              src={selectedImage}
              alt="Full View"
              style={{
                maxHeight: "80vh",
                maxWidth: "90vw",
                border: "5px solid white",
                borderRadius: "4px",
                display: "block",
              }}
            />
          </div>
        </div>
      )}
    </AdminWrapper>
  );
};

export default AdminPerfumeList;
