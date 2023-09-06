const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET //make the connection between server and Coudinary for uploading image
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["avif","webp","jpeg","jpg", "png"],
    folder: "green-wall-project" // The name of the folder in cloudinary
    // resource_type: "raw", // => this is in case you want to upload other types of files, not just images
  }
});

module.exports = multer({ storage });