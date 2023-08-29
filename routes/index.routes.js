const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/upload",fileUploader.single("image"), (req, res)=>{
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ image: req.file.path });
})

router.get("/users", isAuthenticated, (req, res) => {
  console.log('payload', req.payload)
  res.status(200).json(req.payload)

})

router.put("/users", (req, res) => {
  const {_id, image } = req.body;

  User.findByIdAndUpdate(_id, { image }, {new: true})
    .then(updatedUser => {
      const {_id, name,email,image  } = updatedUser
      res.json({ updatedUser: {_id, name,email,image} })
    })
    .catch(err => console.error(err))

})

module.exports = router;
