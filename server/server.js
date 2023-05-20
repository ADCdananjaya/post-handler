const express = require("express");
require("./db/mongoose");
const Post = require("./models/post");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPost = await Post.deleteOne({ _id: id });
    res.status(200).json(deletedPost);
  } catch (error) {
    res.status(404).json({ Error: "Post not found!" });
  }
});

app.post("/api/posts", async (req, res) => {
  const { title } = req.body;
  try {
    const newPost = await new Post({
      userId: 1,
      title,
      body: "",
    }).save();
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

app.put("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  try {
    const updatedPost = await Post.updateOne({ _id: id }, { title });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ Error: "Post not found!" });
  }
});

app.listen(port, () => console.log(`http-backend listening on port ${port}!`));
