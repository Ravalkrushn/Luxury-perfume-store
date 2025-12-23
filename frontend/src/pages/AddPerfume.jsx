import React, { useState } from "react";
import API from "../services/api";
import "../styles/common.css";

const AddPerfume = () => {
  if (!localStorage.getItem("admin")) {
    window.location.href = "/login";
  }

  const [perfume, setPerfume] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/perfumes", perfume);
    alert("Perfume Added");
    window.location.href = "/collection";
  };

  return (
    <div className="page center">
      <h1 className="page-title">Add Perfume</h1>
      <form className="form" onSubmit={submit}>
        <input
          placeholder="Name"
          onChange={(e) => setPerfume({ ...perfume, name: e.target.value })}
        />
        <input
          placeholder="Brand"
          onChange={(e) => setPerfume({ ...perfume, brand: e.target.value })}
        />
        <input
          placeholder="Price"
          onChange={(e) => setPerfume({ ...perfume, price: e.target.value })}
        />
        <textarea
          placeholder="Description"
          onChange={(e) =>
            setPerfume({ ...perfume, description: e.target.value })
          }
        />
        <button>Save</button>
      </form>
    </div>
  );
};

export default AddPerfume;
