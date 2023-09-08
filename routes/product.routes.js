const express = require("express");
const router = express.Router();

const Product = require("../models/Product.model");

const fileUploader = require("../config/cloudinary.config");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post('/create',
fileUploader.single("image"), (req, res, next) => {
    const { productName , price , location } = req.body

    Product.create({ productName , price , location , photo: req.file.path ?? ""})
    .then(() => {
      // Send a json response containing the user object
        res.status(201).json({ message : "Product succesfuly created" });
    })
    .catch((err) => console.log(err)); // In this case, we send error handling to the error handling middleware.
});
//get all
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// get one by id
router.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json("Product not found");
  }

  res.status(200).json(product);
});
// get all
const filterProductsByName =  async (name) =>{
  const products = await Product.find({
    productName: {
      $regex: name ?? "",
      $options: "i",
    },
  });
  return products;
}
//backend with name
router.get("/name/:name", async (req, res) => {
  const name = req.params.name;
  console.log(name);
  const products = await filterProductsByName(name);
  if (!products) {
    return res.status(404).json("Product not found");
  }
  res.json(products);
});

//backend whitout name
router.get("/name", async (req, res) => {
  const products = await Product.find({});
  if (!products) {
    return res.status(404).json("Product not found");
  }
  res.json(products);
});

module.exports = router;