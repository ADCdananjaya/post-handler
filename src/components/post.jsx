const Post = (props) => {
    const { post } = props;
    return ( 
        <div className="w-10/12 h-auto flex flex-row justify-between px-10 bg-gray-50 hover:bg-gray-100 rounded-md">
            <p className="text-gray-800 font-medium">{post.body}</p>
            <div className="flex flex-row gap-5">
                <button className="bg-orange-500 hover:bg-orange-600 rounded-md shadow-md px-3 py-2 text-white">Update</button>
                <button className="bg-red-500 hover:bg-red-600 rounded-md shadow-md px-3 py-2 text-white">Delete</button>
            </div>
        </div>
    );
}

export default Post;