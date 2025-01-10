import React from 'react';
import Post from './Post';

const PostList = ({ posts }) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
            <div key={post.id}>
                <Post post={post}/>
            </div>
        ))}
    </div>
);

export default PostList;
