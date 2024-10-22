import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  // Fetch posts when the component mounts and after any changes
  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "https://post-crud-backend.onrender.com/api/posts/all-post"
      );
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  // Handle deleting a post
  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `https://post-crud-backend.onrender.com/api/posts/${postId}`
      );
      setPosts(posts.filter((post) => post._id !== postId)); // Update state
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  // Handle editing a post
  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setDescription(post.description);
    setImage(null); // Reset image field
  };

  // Handle updating a post
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.put(
        `https://post-crud-backend.onrender.com/api/posts/${editingPost._id}`,
        formData
      );
      setPosts(
        posts.map((post) => (post._id === editingPost._id ? res.data : post))
      );
      resetForm(); // Reset the form after successful update
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  // Reset the edit form
  const resetForm = () => {
    setEditingPost(null);
    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-4xl font-semibold mb-8">All Posts</h1>

      {editingPost && (
        <form onSubmit={handleUpdate} className="mb-8 space-y-6">
          <h2 className="text-2xl font-semibold">Edit Post</h2>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-600 bg-gray-700 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 block w-full border-gray-600 bg-gray-700 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Upload New Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Post
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border border-gray-600 rounded-md p-4 bg-gray-700 transition duration-300 hover:bg-gray-600"
            style={{ maxWidth: "300px" }} // Set the maximum width of each card
          >
            <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="mb-4 w-full h-32 object-cover rounded-md" // Adjusted height and object-fit
              />
            )}
            <p className="text-sm mb-4">{post.description}</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEdit(post)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
