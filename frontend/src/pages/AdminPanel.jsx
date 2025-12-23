import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [perfumes, setPerfumes] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);

  if (!localStorage.getItem("admin")) {
    window.location.href = "/login";
  }

  const loadPerfumes = async () => {
    const res = await API.get("/perfumes");
    setPerfumes(res.data);
  };

  useEffect(() => {
    loadPerfumes();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("description", form.description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (editId) {
      await API.put(`/perfumes/${editId}`, formData);
      alert("Perfume updated successfully");
    } else {
      await API.post("/perfumes", formData);
      alert("Perfume added successfully");
    }

    setForm({ name: "", brand: "", price: "", description: "" });
    setImageFile(null);
    setEditId(null);
    loadPerfumes();
  };

  const editPerfume = (p) => {
    setForm({
      name: p.name,
      brand: p.brand,
      price: p.price,
      description: p.description,
    });
    setEditId(p._id);
    window.scrollTo(0, 0);
  };

  const deletePerfume = async (id) => {
    if (window.confirm("Delete this perfume?")) {
      await API.delete(`/perfumes/${id}`);
      loadPerfumes();
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-top">
        <h1>Admin Panel</h1>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </header>

      <section className="admin-section">
        <h2>Add / Edit Perfume</h2>

        <form className="admin-form" onSubmit={submit}>
          <input
            placeholder="Perfume Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <button className="submit-btn">
            {editId ? "Save Changes" : "Add Perfume"}
          </button>
        </form>
      </section>

      <section className="admin-section">
        <h2>Perfume List</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {perfumes.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img src={`http://localhost:5000${p.image}`} alt={p.name} />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.brand}</td>
                  <td>{p.price}</td>
                  <td>{p.description}</td>
                  <td>
                    <button className="edit" onClick={() => editPerfume(p)}>
                      Edit
                    </button>
                    <button
                      className="delete"
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
      </section>
    </div>
  );
};
export default AdminPanel;
