import React from 'react';
import {useNavigate} from 'react-router-dom';

const Post = ({post}) => {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/posts/${post.id}`); // Navigate to the PostDetails component
    };

    return (
        <div className="card bg-white shadow-md rounded-lg p-4 max-w-sm">
            <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{post.content.substring(0, 100)}...</p>
            <button
                onClick={handleViewMore}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
                View More
            </button>
        </div>
    );
};

export default Post;