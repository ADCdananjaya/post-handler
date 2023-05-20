import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";
import { ToastContainer, toast } from "react-toastify";
import Input from "./components/input";
import Post from "./components/post";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    posts: [],
    post: { title: "", _id: -1 },
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndPoint);
    this.setState({ posts });
  }

  handlePostChange = (post) => {
    this.setState({ post });
  };

  handleUpdate = (id) => {
    const updatePost = this.state.posts.find((post) => post._id === id);
    this.setState({ post: { title: updatePost.title, _id: updatePost._id } });
  };

  handlePostApi = async (post) => {
    const res = await http.post(config.apiEndPoint, post);
    return res;
  };

  handlePutApi = async (post) => {
    const res = await http.put(config.apiEndPoint + "/" + post._id, post);
    return res;
  };

  handleAdd = async (post) => {
    if (post._id == -1) {
      const tempId = Date.now().toString();
      post._id = tempId;
      const posts = [...this.state.posts, post];
      this.setState({ posts });
      const { data } = await this.handlePostApi(post);
      if (data) {
        const index = posts.findIndex((p) => p._id == tempId);
        posts[index]._id = data._id;
        this.setState({ posts });
      }
    } else {
      const index = this.state.posts.findIndex((p) => p._id === post._id);
      const posts = [...this.state.posts];
      posts[index] = post;
      this.setState({ posts });
      this.handlePutApi(post);
    }
  };

  handleDelete = async (id) => {
    const prevPosts = [...this.state.posts];

    const posts = this.state.posts.filter((post) => post._id !== id);
    this.setState({ posts });

    try {
      const res = await http.delete(config.apiEndPoint + "/" + id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This post has already been deleted!");
      this.setState({ posts: prevPosts });
    }
  };

  render() {
    return (
      <div className="w-full flex-col p-5 py-10">
        <ToastContainer />
        <Input
          post={this.state.post}
          onAdd={this.handleAdd}
          onPostChange={this.handlePostChange}
        />
        <div className="w-full flex flex-col mt-10 items-center gap-3">
          {this.state.posts.map((post) => (
            <Post
              key={post._id}
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
