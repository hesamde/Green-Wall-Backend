const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment.model");
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post("/create", (req, res) => {
  console.log("we recieved an endpoint call from react");

  const { comment, user, product } = req.body;
  console.log(`comment: ${comment}`);
  console.log(`user: ${user}`);
  console.log(`product: ${product}`);
  Comment.create({ comment, user, product })
    .then(() => {
      res.status(201).json({ message: "Comment succesfuly created" });
    })
    .catch((err) => console.log(err));
});

//backend with name
router.get("/product/:product", async (req, res) => {
  const product = req.params.product;
  const comments = await Comment.find({ product: product });
  if (!comments) {
    return res.status(404).json("comments not found");
  }
  res.json(comments);
});

module.exports = router;
