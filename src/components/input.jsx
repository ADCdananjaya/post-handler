import React, { Component } from 'react';

class Input extends Component {
    state = { 
        post: ""
    } 

    handleChange = e => {
        this.setState({ post: e.target.value });
    }

    render() { 
        return (
            <div className="flex flex-row gap-5 justify-center">
                <input type="text" className='px-3 border border-blue-500 rounded-md shadow-md focus:border-blue-600 w-72' name="post" value={this.state.post} onChange={this.handleChange} />
                <button className="bg-blue-500 hover:bg-blue-600 rounded-md shadow-md px-3 py-2 text-white">Add</button>
            </div>
        );
    }
}
 
export default Input;