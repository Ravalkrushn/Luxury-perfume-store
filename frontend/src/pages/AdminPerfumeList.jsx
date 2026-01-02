import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import AdminWrapper from "../components/AdminWrapper";
import "./AdminPerfumeList.css";

const AdminPerfumeList = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [edit, setEdit] = useState(null);

  const loadPerfumes = async () => {
    const res = await API.get("/perfumes");
    setPerfumes(res.data);
  };

  useEffect(() => {
    loadPerfumes();
  }, []);
const navigate = useNavigate();

  const deletePerfume = async (id) => {
    if (!window.confirm("Are you sure you want to delete this perfume?")) return;
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
  };

  return (
    <AdminWrapper>
      <div className="page-header">
  <h2 className="page-title">Perfume List</h2>

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
            {perfumes.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={`http://localhost:5000${p.image}`}
                    alt={p.name}
                    className="table-img"
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>₹{p.price}</td>
                <td>{p.quantity}</td>
                <td className="desc">{p.description}</td>
                <td>
                  <button className="edit-btn" onClick={() => setEdit(p)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deletePerfume(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {edit && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Perfume</h3>

            <form onSubmit={updatePerfume}>
              <input
                value={edit.name}
                onChange={(e) =>
                  setEdit({ ...edit, name: e.target.value })
                }
                placeholder="Name"
              />

              <input
                value={edit.brand}
                onChange={(e) =>
                  setEdit({ ...edit, brand: e.target.value })
                }
                placeholder="Brand"
              />

              <input
                type="number"
                value={edit.price}
                onChange={(e) =>
                  setEdit({ ...edit, price: e.target.value })
                }
                placeholder="Price"
              />

              <input
                type="number"
                value={edit.quantity}
                onChange={(e) =>
                  setEdit({ ...edit, quantity: e.target.value })
                }
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
    </AdminWrapper>
  );
};

export default AdminPerfumeList;
