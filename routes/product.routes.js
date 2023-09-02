const express = require("express");
const router = express.Router();

const Product = require("../models/Product.model");
const fileUploader = require("../config/cloudinary.config");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post('/create', (req, res, next) => {
    const { productName , price , location , photo } = req.body

    Product.create({ productName , price , location , photo})
    .then(() => {
      // Send a json response containing the user object
        res.status(201).json({ message : "Product succesfuly created" });
    })
    .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

module.exports = router;