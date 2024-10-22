// config/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");
require("dotenv").config(); // Make sure to load environment variables

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder name in your Cloudinary account
    format: async (req, file) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const allowedFormats = ["png", "jpg", "jpeg"];
      if (allowedFormats.includes(ext.substring(1))) {
        return ext.substring(1); // Use the file extension as the format
      }
      return "png"; // Fallback format
    },
    public_id: (req, file) => file.originalname.split(".")[0], // Use the file's name as the public_id
  },
});

// Create the multer instance with the Cloudinary storage
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;
