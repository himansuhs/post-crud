import React, { useState } from "react";
import axios from "axios";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "https://post-crud-backend.onrender.com/api/posts",
        formData
      );
      console.log(res.data);
      // Reset the form after successful submission
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null); // Reset the image preview
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-white mb-6">
        Create a New Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter the post title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter the post description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-600 bg-gray-700 rounded-md cursor-pointer focus:outline-none"
          />
        </div>

        {/* Preview the uploaded image */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-full h-auto rounded-md border border-gray-600"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
