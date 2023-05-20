require("./db/mongoose");
const Post = require("./models/post");
const posts = require("./data");

const seed = async () => {
  for (let post of posts) {
    await new Post({
      userId: post.userId,
      title: post.title,
      body: post.body,
    }).save();
  }
  console.log("Done");
};

seed();
