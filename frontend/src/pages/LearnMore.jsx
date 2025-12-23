import React from "react";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .learn-page {
          min-height: 100vh;
          padding: 60px 20px;
          display: flex;
          justify-content: center;
          background: #f7f7f7;
          font-family: "Segoe UI", sans-serif;
        }

        .learn-container {
          max-width: 1000px;
          background: #ffffff;
          padding: 50px 40px;
          border-radius: 10px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .learn-header {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          margin-bottom: 15px;
        }

        .learn-header h1 {
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

        .learn-underline {
          width: 140px;
          height: 3px;
          background: #000;
          margin: 15px auto 40px auto;
        }

        .learn-section {
          margin-bottom: 40px;
        }

        .learn-section h2 {
          font-size: 24px;
          margin-bottom: 12px;
          color: #111;
        }

        .learn-section p {
          font-size: 16px;
          line-height: 1.7;
          color: #444;
        }

        .learn-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
          margin-top: 30px;
        }

        .learn-card {
          background: #f3f3f3;
          padding: 25px;
          border-radius: 8px;
        }

        .learn-card h3 {
          margin-bottom: 10px;
          font-size: 18px;
          color: #000;
        }

        .learn-card p {
          font-size: 15px;
          color: #555;
          line-height: 1.6;
        }

        .learn-highlight {
          margin-top: 40px;
          background: #000;
          color: #fff;
          padding: 30px;
          border-radius: 8px;
        }

        .learn-highlight h3 {
          margin-bottom: 12px;
          font-size: 22px;
        }

        .learn-highlight ul {
          padding-left: 18px;
        }

        .learn-highlight li {
          margin-bottom: 8px;
          font-size: 15px;
        }

        @media (max-width: 700px) {
          .learn-container {
            padding: 30px 20px;
          }

          .learn-header {
            flex-direction: column;
            gap: 10px;
          }

          .back-btn {
            position: static;
          }

          .learn-header h1 {
            font-size: 28px;
          }

          .learn-grid {
            grid-template-columns: 1fr;
          }

          .learn-section h2 {
            font-size: 22px;
          }

          .learn-section p {
            font-size: 15px;
          }
        }
      `}</style>

      <div className="learn-page">
        <div className="learn-container">
          <div className="learn-header">
            <h1>Learn More</h1>
            <button className="back-btn" onClick={() => navigate("/")}>
              ⬅ Back
            </button>
          </div>

          <div className="learn-underline"></div>

          <div className="learn-section">
            <h2>Understanding Luxury Perfumes</h2>
            <p>
              Luxury perfumes are crafted using high-quality ingredients and
              refined techniques to create long-lasting and memorable scents.
              Each fragrance tells a story and reflects individuality,
              confidence, and elegance.
            </p>
          </div>

          <div className="learn-grid">
            <div className="learn-card">
              <h3>Top Notes</h3>
              <p>
                These are the first impressions of a perfume — fresh, light, and
                noticeable immediately after application.
              </p>
            </div>

            <div className="learn-card">
              <h3>Heart Notes</h3>
              <p>
                The soul of the fragrance that appears after top notes fade,
                defining the perfume’s character.
              </p>
            </div>

            <div className="learn-card">
              <h3>Base Notes</h3>
              <p>
                Rich and deep notes that last the longest, giving the perfume
                its lasting impression.
              </p>
            </div>

            <div className="learn-card">
              <h3>Longevity & Sillage</h3>
              <p>
                Longevity defines how long a scent lasts, while sillage refers
                to how far it spreads.
              </p>
            </div>
          </div>

          <div className="learn-highlight">
            <h3>Why Choose Premium Fragrances?</h3>
            <ul>
              <li> Higher quality ingredients</li>
              <li> Long-lasting scent performance</li>
              <li> Unique and elegant compositions</li>
              <li> Perfect for every occasion</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LearnMore;
