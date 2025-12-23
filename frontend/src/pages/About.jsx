import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .about-page {
          min-height: 100vh;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          background: #f7f7f7;
          font-family: "Segoe UI", sans-serif;
        }

        .about-container {
          max-width: 900px;
          background: #ffffff;
          padding: 50px 40px;
          border-radius: 10px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        /* HEADER (TITLE + BACK) */
        .about-header {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          margin-bottom: 10px;
        }

        .about-header h1 {
          font-size: 36px;
          letter-spacing: 1px;
        }

        .back-btn {
          position: absolute;
          right: 0;
          background: #000;
          color: #fff;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
          border-radius: 4px;
          font-size: 14px;
        }

        .back-btn:hover {
          background: #222;
        }

        .about-underline {
          width: 120px;
          height: 3px;
          background: #000;
          margin: 15px auto 40px auto;
        }

        .about-section {
          margin-bottom: 35px;
        }

        .about-section h2 {
          font-size: 22px;
          margin-bottom: 10px;
          color: #111;
        }

        .about-section p {
          font-size: 16px;
          line-height: 1.7;
          color: #444;
        }

        .about-highlight {
          background: #000;
          color: #fff;
          padding: 25px;
          border-radius: 8px;
          margin-top: 30px;
        }

        .about-highlight h3 {
          margin-bottom: 10px;
          font-size: 20px;
        }

        .about-highlight ul {
          padding-left: 18px;
        }

        .about-highlight li {
          margin-bottom: 8px;
          font-size: 15px;
        }

        /* MOBILE */
        @media (max-width: 600px) {
          .about-container {
            padding: 30px 20px;
          }

          .about-header {
            flex-direction: column;
            gap: 10px;
          }

          .back-btn {
            position: static;
          }

          .about-header h1 {
            font-size: 28px;
          }

          .about-section h2 {
            font-size: 20px;
          }

          .about-section p {
            font-size: 15px;
          }
        }
      `}</style>

      <div className="about-page">
        <div className="about-container">
          <div className="about-header">
            <h1>About Us</h1>
            <button className="back-btn" onClick={() => navigate("/")}>
              ⬅ Back
            </button>
          </div>

          <div className="about-underline"></div>

          <div className="about-section">
            <h2>Who We Are</h2>
            <p>
              Welcome to <strong>Luxury Scent</strong>, a premium fragrance
              destination where elegance, confidence, and timeless style come
              together. A fragrance is not just a scent — it is a reflection of
              personality and presence.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              Our mission is to deliver authentic, high-quality perfumes that
              leave a lasting impression. Every fragrance is curated with
              precision, luxury, and care.
            </p>
          </div>

          <div className="about-section">
            <h2>Why Choose Us</h2>
            <p>
              From floral elegance to bold woody notes, our collection is
              designed for individuals who value sophistication and premium
              quality.
            </p>
          </div>

          <div className="about-highlight">
            <h3>What Makes Us Different</h3>
            <ul>
              <li> Premium and authentic fragrances</li>
              <li> Long-lasting scent performance</li>
              <li> Elegant and modern collections</li>
              <li> Customer-focused experience</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
