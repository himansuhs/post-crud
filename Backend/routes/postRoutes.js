const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary"); // Import your Cloudinary upload configuration
const Post = require("../models/Post"); // Import your Post model

// Route to create a new post with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.file ? req.file.path : null, // Ensure image URL is set only if an image is uploaded
    });

    await newPost.save();
    res.status(201).json(newPost); // 201 Created
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
});

// Route to get all posts
router.get("/all-post", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts); // Return all posts
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
});

// Route to update a post
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const existingPost = await Post.findById(req.params.id); // Fetch existing post

    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" }); // Handle post not found
    }

    const updateData = {
      title: req.body.title,
      description: req.body.description,
      // Update the imageUrl only if a new image is uploaded
      imageUrl: req.file ? req.file.path : existingPost.imageUrl, // Use existing if no new image
    };

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedPost); // 200 OK
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" }); // Handle post not found
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
