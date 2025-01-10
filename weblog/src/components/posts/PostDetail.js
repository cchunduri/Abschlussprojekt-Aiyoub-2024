import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const PostDetails = () => {
    const {postId} = useParams(); // Get the postId from the URL
    const [post, setPost] = useState(null); // State for storing post details
    const [loading, setLoading] = useState(true); // State for tracking loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchComments = async () => {
            try {
                // Fetch comments details from the API
                const response = await fetch(`http://localhost:5000/api/comments/${postId}`);

                if (!response.ok) {
                    // Handle HTTP errors
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const commentsData = await response.json();
                setPost((prevPost) => ({
                    ...prevPost,
                    comments: commentsData,
                })); // Update the post state with fetched comments
            } catch (err) {
                setError(err.message); // Set error state if the fetch fails
            }
        }

        const fetchPostDetails = async () => {
            try {
                // Fetch post details from the API
                const response = await fetch(`http://localhost:5000/api/posts/${postId}`);

                if (!response.ok) {
                    // Handle HTTP errors
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setPost(data); // Set the post data in the state
                setLoading(false); // Update loading status
            } catch (err) {
                setError(err.message); // Set error state if the fetch fails
                setLoading(false); // Stop loading even if there's an error
            }
        };

        fetchPostDetails().then(fetchComments);
    }, [postId]); // Dependency on postId to refetch details if it changes

    if (loading) {
        return <p>Loading post details...</p>; // Show a loading message while fetching data
    }

    if (error) {
        return <p>Error: {error}</p>; // Show the error message if there's an issue
    }

    if (!post) {
        return <p>No post found!</p>; // Handle cases where the post is not found
    }

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <h4>Comments:</h4>
            {post.comments && post.comments.length > 0 ? (
                <ul>
                    {post.comments.map((comment) => (
                        <li key={comment.id}>
                            <strong>{comment.commentauthor}:</strong> {comment.content}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments available for this post.</p>
            )}
        </div>
    );
};

export default PostDetails;