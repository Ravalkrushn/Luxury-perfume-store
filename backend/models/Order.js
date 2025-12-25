const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: String,
    totalAmount: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
