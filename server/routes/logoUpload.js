const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload-logo", upload.single("logo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Convert buffer to data URI
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "quotelkaro-logos",
    });

    console.log("Cloudinary Upload Result:");

    if (uploadResult && uploadResult.secure_url) {
      return res.status(200).json({
        message: "Logo uploaded successfully to Cloudinary",
        logoUrl: uploadResult.secure_url,
      });
    } else {
      return res.status(500).json({ message: "Cloudinary upload failed." });
    }
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return res
      .status(500)
      .json({ message: "Server error during upload.", error: error.message });
  }
});

module.exports = router;
