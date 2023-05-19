import React, { Component } from "react";
import axios from "axios";
import Input from "./components/input";
import Post from "./components/post";

class App extends Component {
  state = {
    posts: [],
    post: { title: "", id: -1 },
  };

  apiEndPoint = "http://localhost:3000/api/posts";

  async componentDidMount() {
    const { data: posts } = await axios.get(this.apiEndPoint);
    this.setState({ posts });
  }

  handlePostChange = (post) => {
    this.setState({ post });
  };

  handleUpdate = (id) => {
    const updatePost = this.state.posts.find((post) => post.id === id);
    this.setState({ post: { title: updatePost.title, id: updatePost.id } });
  };

  handlePostApi = async post => {
    const { data } = await axios.post(this.apiEndPoint, post);
  }

  handlePutApi = async post => {
    const { data } = await axios.put(this.apiEndPoint + "/" + post.id, post);
  }

  handleAdd = (post) => {
    if (post.id == -1) {
      console.log(this.state.posts.length);
      post.id = this.state.posts.length + 2;
      const posts = [...this.state.posts, post];
      this.setState({ posts });
      this.handlePostApi(post);
    } else {
      const index = this.state.posts.findIndex((p) => p.id === post.id);
      const posts = [...this.state.posts];
      posts[index] = post;
      this.setState({ posts });
      this.handlePutApi(post);
    }
  };

  handleDelete = async (id) => {
    const prevPosts = [...this.state.posts];

    const posts = this.state.posts.filter((post) => post.id !== id);
    this.setState({ posts });

    try {
      const res = await axios.delete(this.apiEndPoint + "/" + id);
    } catch (error) {
      alert("Something went wrong!");
      this.setState({ posts: prevPosts });
    }
  };

  render() {
    return (
      <div className="w-full flex-col p-5 py-10">
        <Input
          post={this.state.post}
          onAdd={this.handleAdd}
          onPostChange={this.handlePostChange}
        />
        <div className="w-full flex flex-col mt-10 items-center gap-3">
          {this.state.posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onUpdate={this.handleUpdate}
              onDelete={this.handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
