const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const perfumeRoutes = require("./routes/perfume.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/auth", authRoutes);
app.use("/api/perfumes", perfumeRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Global Error Handler (Add this to see errors in Postman)
app.use((err, req, res, next) => {
  console.error("Backend Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
