import React from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <PostForm />
      <PostList />
    </div>
  );
}

export default App;
