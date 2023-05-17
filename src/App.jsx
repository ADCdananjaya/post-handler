import React, { Component } from 'react';
import axios from 'axios';
import Input from './components/input';
import Post from './components/post';

class App extends Component {
  state = { 
    posts: []
  } 

  async componentDidMount() {
    const {data: posts} = await axios.get("http://localhost:3000/api/posts");
    this.setState({ posts });
  }

  render() { 
    return (
      <div className='w-full flex-col p-5 py-10'>
        <Input />
        <div className='w-full flex flex-col mt-10 items-center gap-3'>
        { this.state.posts.map((post, index) => (
          <Post key={index} post={post}/>
        ))}
        </div>
      </div>
    );
  }
}

export default App;