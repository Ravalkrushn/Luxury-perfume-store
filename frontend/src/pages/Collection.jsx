import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import "./Collection.css";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    API.get("/perfumes").then((res) => setProducts(res.data));
  }, []);

  const handleQtyChange = (id, delta, maxStock) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 1;
      const newQty = currentQty + delta;
      if (newQty < 1) return prev;
      if (newQty > maxStock) return prev;
      return { ...prev, [id]: newQty };
    });
  };

  const getQty = (id) => quantities[id] || 1;

  const addToCart = (id) => {
    const qty = quantities[id] || 1;
    setCartCount((prev) => prev + qty);
  };

  return (
    <div className="collection-page">
      <style>{`
        .collection-page {
          background-color: #f1f3f6;
          min-height: 100vh;
          padding-bottom: 40px;
        }
        .collection-header {
          background-color: transparent;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: none;
          margin-bottom: 20px;
          position: relative;
        }
        .collection-header h1 {
          margin: 0;
          font-size: 28px;
          color: #333;
          border-bottom: 3px solid black;
          padding-bottom: 5px;
        }
        .header-right {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .cart-container {
          position: relative;
          cursor: pointer;
        }
        .cart-icon {
          font-size: 24px;
          color: #333;
        }
        .cart-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: #ff0000;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 12px;
          font-weight: bold;
        }
        .back-btn {
          position: static;
          background-color: #2874f0;
          color: #fff;
          border: none;
          padding: 6px 15px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 2px;
          cursor: pointer;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .product-card {
          background: #fff;
          border-radius: 4px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s;
          position: relative;
          border: 1px solid #f0f0f0;
        }
        .product-card:hover {
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .card-img {
          height: 220px;
          width: 100%;
          object-fit: contain;
          margin-bottom: 15px;
          padding: 10px;
          cursor: pointer;
        }
        .card-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .card-brand {
          font-size: 12px;
          color: #878787;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .card-title {
          font-size: 18px;
          font-weight: 500;
          margin: 0 0 6px 0;
          color: #212121;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-desc {
          font-size: 13px;
          color: #777;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: 12px;
          line-height: 1.4;
        }
        .card-price {
          font-size: 20px;
          font-weight: 600;
          color: #212121;
          margin-bottom: 5px;
        }
        .card-qty {
          font-size: 13px;
          color: #388e3c;
          margin-bottom: 15px;
          font-weight: 500;
        }
        .action-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: auto;
        }
        .qty-control {
          display: flex;
          align-items: center;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }
        .qty-btn {
          background: #f8f9fa;
          border: none;
          width: 30px;
          height: 36px;
          font-size: 16px;
          cursor: pointer;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .qty-btn:hover {
          background-color: #e0e0e0;
        }
        .qty-value {
          width: 35px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
        }
        .add-btn {
          background: #ff9f00;
          border: none;
          color: white;
          height: 36px;
          padding: 0 15px;
          font-weight: 600;
          text-transform: uppercase;
          cursor: pointer;
          flex: 1;
          border-radius: 2px;
          font-size: 14px;
        }
        .add-btn:hover {
          background: #f39400;
        }
        @media (max-width: 900px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .product-grid { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="collection-header">
        <h1>Collections</h1>
        <div className="header-right">
          <div className="cart-container">
            <FaShoppingCart className="cart-icon" title="Cart" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
          <button onClick={() => nav("/")} className="back-btn">
            ⬅ Back
          </button>
        </div>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <img
              src={`http://localhost:5000${p.image}`}
              alt={p.name}
              className="card-img"
              onClick={() =>
                setSelectedImage(`http://localhost:5000${p.image}`)
              }
            />

            <div className="card-info">
              <div className="card-brand">{p.brand}</div>
              <h3 className="card-title" title={p.name}>
                {p.name}
              </h3>
              <p className="card-desc">{p.description}</p>
              <div className="card-price">₹{p.price}</div>
              <div className="card-qty">
                {p.quantity > 0 ? (
                  `In Stock: ${p.quantity}`
                ) : (
                  <span style={{ color: "red" }}>Out of Stock</span>
                )}
              </div>

              <div className="action-row">
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => handleQtyChange(p._id, -1, p.quantity)}
                  >
                    -
                  </button>
                  <span className="qty-value">{getQty(p._id)}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleQtyChange(p._id, 1, p.quantity)}
                  >
                    +
                  </button>
                </div>
                <button className="add-btn" onClick={() => addToCart(p._id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FaTimes size={30} color="#fff" />
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
    </div>
  );
};

export default Collection;
