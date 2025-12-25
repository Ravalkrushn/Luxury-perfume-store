const express = require("express");
const Perfume = require("../models/Perfume");
const Order = require("../models/Order");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Perfume.countDocuments();

    const orders = await Order.find();

    const totalOrders = orders.length;

    const totalSales = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    const customers = new Set(orders.map(o => o.customerId));

    res.json({
      totalProducts,
      totalOrders,
      totalSales,
      totalCustomers: customers.size,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard stats error" });
  }
});

module.exports = router;
