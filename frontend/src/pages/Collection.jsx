import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Collection.css";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    API.get("/perfumes").then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="collection-page">
      <div className="collection-header">
        <h1>Explore Collection</h1>
        <button onClick={() => nav("/")} className="back-btn">
          ⬅ Back
        </button>
      </div>

      <div className="underline"></div>

      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <img src={`http://localhost:5000${p.image}`} alt={p.name} />

            <h3>{p.name}</h3>
            <p className="price">₹{p.price}</p>
            <p className="desc">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
