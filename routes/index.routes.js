const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// Cloudinary
router.post("/upload",fileUploader.single("image"), (req, res)=>{
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ image: req.file.path });//sending back the image to front end

})
router.get("/users", isAuthenticated, (req, res) => { //to get the user info from payload and response user information
  console.log('payload', req.payload)//to get the user info from payload and response user information
  res.status(200).json(req.payload)//to get the user info from payload and response user information

})

// Cloudinary
//add the photo cloudinary
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
