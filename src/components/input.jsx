import React, { Component } from "react";

class Input extends Component {
  handleClick = () => {
    const post = { title: this.props.post.title, _id: this.props.post._id };
    this.props.onAdd(post);
    this.props.onPostChange({ title: "", _id: -1 });
  };

  render() {
    return (
      <div className="flex flex-row gap-5 justify-center">
        <input
          type="text"
          className="px-3 border border-blue-500 rounded-md shadow-md focus:border-blue-600 w-72"
          name="post"
          value={this.props.post.title}
          onChange={(e) =>
            this.props.onPostChange({
              title: e.target.value,
              _id: this.props.post._id,
            })
          }
        />
        <button
          onClick={this.handleClick}
          className="bg-blue-500 hover:bg-blue-600 rounded-md shadow-md px-3 py-2 text-white"
        >
          {this.props.post._id === -1 ? "Add" : "Update"}
        </button>
      </div>
    );
  }
}

export default Input;
