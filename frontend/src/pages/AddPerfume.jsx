import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import AdminWrapper from "../components/AdminWrapper";
import "../components/AdminCrud.css";

const AddPerfume = () => {
  if (!localStorage.getItem("admin")) {
    window.location.href = "/login";
  }

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.perfume || null;

  const [perfume, setPerfume] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (editData) {
      setPerfume({
        name: editData.name,
        brand: editData.brand,
        price: editData.price,
        quantity: editData.quantity,
        description: editData.description,
        image: null,
      });
    }
  }, [editData]);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", perfume.name);
    formData.append("brand", perfume.brand);
    formData.append("price", perfume.price);
    formData.append("quantity", perfume.quantity);
    formData.append("description", perfume.description);

    if (perfume.image) {
      formData.append("image", perfume.image);
    }

    if (editData) {
      await API.put(`/perfumes/${editData._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Perfume Updated");
    } else {
      await API.post("/perfumes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Perfume Added");
    }

    navigate("/admin/perfume-list");
  };

  return (
    <AdminWrapper>
      <div className="admin-page">
        <div className="admin-section">
          <h2>{editData ? "Edit Perfume" : "Add Perfume"}</h2>

          <form className="admin-form" onSubmit={submit}>
            <input
              value={perfume.name}
              placeholder="Name"
              onChange={(e) =>
                setPerfume({ ...perfume, name: e.target.value })
              }
            />

            <input
              value={perfume.brand}
              placeholder="Brand"
              onChange={(e) =>
                setPerfume({ ...perfume, brand: e.target.value })
              }
            />

            <input
              type="number"
              value={perfume.price}
              placeholder="Price"
              onChange={(e) =>
                setPerfume({ ...perfume, price: e.target.value })
              }
            />

            <input
              type="number"
              value={perfume.quantity}
              placeholder="Quantity"
              onChange={(e) =>
                setPerfume({ ...perfume, quantity: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setPerfume({ ...perfume, image: e.target.files[0] })
              }
            />

            <textarea
              value={perfume.description}
              placeholder="Description"
              onChange={(e) =>
                setPerfume({ ...perfume, description: e.target.value })
              }
            />

            <button className="submit-btn">
              {editData ? "Update" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default AddPerfume;
