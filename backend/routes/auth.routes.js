const express = require("express");
const Admin = require("../models/admin");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email, password });
  if (!admin) {
    return res.status(401).json({ message: "Invalid Admin Credentials" });
  }

  res.json({ success: true });
});

module.exports = router;
