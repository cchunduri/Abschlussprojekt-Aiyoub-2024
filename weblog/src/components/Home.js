import React from 'react';
import PostList from './posts/PostList';

const Home = ({posts}) => {
    return (
        <div className="p-4 mt-4">
            <PostList posts={posts}/>
        </div>
    );
};

export default Home;