const express = require("express");
const posts = require("./data.js");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/posts", (req, res) => res.json(posts));

app.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const index = posts.findIndex((post) => post.id == id);
  if (index !== -1) {
    const deletedPost = posts.splice(index, 1);
    res.status(200).json(deletedPost);
  } else res.status(404).json({ error: "Post not found!" });
});

app.post("/api/posts", (req, res) => {
  const { title, id } = req.body;
  const post = {
    userId: 0,
    id,
    title,
    body: "",
  };

  posts.push(post);
  res.status(200).json(post);
});

app.put("/api/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  const updatedPost = posts.find((post) => post.id == id);
  if (updatedPost) {
    updatedPost.title = title;
    res.status(200).json(updatedPost);
  } else res.status(404).json({ Error: "Post not found!" });
});

app.listen(port, () => console.log(`http-backend listening on port ${port}!`));
