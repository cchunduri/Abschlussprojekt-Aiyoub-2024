import React from 'react';
import {useNavigate} from 'react-router-dom';

const Post = ({post}) => {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/posts/${post.id}`); // Navigate to the PostDetails component
    };

    return (
        <div className="card">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <button onClick={handleViewMore}>View More</button>
            {/* Redirect with post ID */}
        </div>
    );
};

export default Post;