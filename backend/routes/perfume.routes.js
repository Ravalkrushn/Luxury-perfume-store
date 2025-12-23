const express = require("express");
const Perfume = require("../models/Perfume");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  const perfume = await Perfume.create({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });

  res.json(perfume);
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = {
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
  };

  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  const updated = await Perfume.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  res.json(updated);
});

router.get("/", async (req, res) => {
  const perfumes = await Perfume.find();
  res.json(perfumes);
});

router.delete("/:id", async (req, res) => {
  await Perfume.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
