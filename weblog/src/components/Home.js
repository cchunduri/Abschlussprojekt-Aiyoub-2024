import React from 'react';
import PostList from './posts/PostList';

const Home = ({posts}) => {
    return (
        <div>
            <PostList posts={posts}/>
        </div>
    );
};

export default Home;