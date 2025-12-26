const mongoose = require("mongoose");

const perfumeSchema = new mongoose.Schema(
  {
    name: String,
    brand: String,
    price: Number,
    description: String,
    image: String,
    quantity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Perfume", perfumeSchema);
