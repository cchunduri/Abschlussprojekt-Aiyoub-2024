import React from 'react';
import PostList from './posts/PostList';

const Home = ({posts}) => {
    const handleAddPost = () => {
        // Logic to add a new post
        console.log('Add Post button clicked');
    };

    return (
        <div>
            <button onClick={handleAddPost}>Add New Post</button>
            <PostList posts={posts}/>
        </div>
    );
};

export default Home;