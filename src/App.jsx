import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";
import Input from "./components/input";
import Post from "./components/post";

class App extends Component {
  state = {
    posts: [],
    post: { title: "", id: -1 },
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndPoint);
    this.setState({ posts });
  }

  handlePostChange = (post) => {
    this.setState({ post });
  };

  handleUpdate = (id) => {
    const updatePost = this.state.posts.find((post) => post.id === id);
    this.setState({ post: { title: updatePost.title, id: updatePost.id } });
  };

  handlePostApi = async (post) => {
    const { data } = await http.post(config.apiEndPoint, post);
  };

  handlePutApi = async (post) => {
    const { data } = await http.put(config.apiEndPoint + "/" + post.id, post);
  };

  handleAdd = (post) => {
    if (post.id == -1) {
      post.id = this.state.posts[this.state.posts.length - 1].id + 1;
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
      const res = await http.delete(config.apiEndPoint + "/" + id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        alert("This post has already been deleted!");
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
