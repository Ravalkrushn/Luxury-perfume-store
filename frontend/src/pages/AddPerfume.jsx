import React, { useState } from "react";
import API from "../services/api";
import "../components/AdminCrud.css";

const AddPerfume = () => {
  if (!localStorage.getItem("admin")) {
    window.location.href = "/login";
  }

  const [perfume, setPerfume] = useState({
    name: "",
    brand: "",
    price: "",
    quantity: "",
    description: "",
    image: null,
  });

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", perfume.name);
    formData.append("brand", perfume.brand);
    formData.append("price", perfume.price);
    formData.append("quantity", perfume.quantity);
    formData.append("description", perfume.description);
    formData.append("image", perfume.image);

    await API.post("/perfumes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Perfume Added");
    window.location.href = "/collection";
  };

  return (
    <div className="admin-page">
      <div className="admin-section">
        <h2>Add Perfume</h2>

        <form className="admin-form" onSubmit={submit}>
          <input
            placeholder="Name"
            onChange={(e) =>
              setPerfume({ ...perfume, name: e.target.value })
            }
          />

          <input
            placeholder="Brand"
            onChange={(e) =>
              setPerfume({ ...perfume, brand: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Price"
            onChange={(e) =>
              setPerfume({ ...perfume, price: e.target.value })
            }
          />

          <input
            type="number"
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
            placeholder="Description"
            onChange={(e) =>
              setPerfume({ ...perfume, description: e.target.value })
            }
          />

          <button className="submit-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddPerfume;
