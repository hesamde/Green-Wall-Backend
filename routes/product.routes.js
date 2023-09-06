const express = require("express");
const router = express.Router();

const Product = require("../models/Product.model");

const fileUploader = require("../config/cloudinary.config");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post('/create',
fileUploader.single("image"), (req, res, next) => {
    const { productName , price , location } = req.body
    console.log(req.file.path)
    Product.create({ productName , price , location , photo: req.file.path ?? ""})
    .then(() => {
      // Send a json response containing the user object
        res.status(201).json({ message : "Product succesfuly created" });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;