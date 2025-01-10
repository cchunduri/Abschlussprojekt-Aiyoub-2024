import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/Home';
import './App.css';
import PostDetails from "./components/posts/PostDetail";
import {AuthProvider} from "./utils/AuthContext";
import LoginPage from "./components/login/LoginPage";
import NewPostForm from "./components/NewPostForm";

const App = () => {
    const [posts, setPosts] = useState([]); // State to store fetched posts
    const [loading, setLoading] = useState(true); // State to manage loading

    // Fetch posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/posts'); // Replace with your backend API URL
                const data = await response.json();
                setPosts(data); // Set fetched data into state
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); // Stop loading when fetch is complete
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Header/>
                    {loading && <p>Loading...</p>}
                    <Routes>
                        <Route path="/" element={<Home posts={posts}/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/posts/:postId" element={<PostDetails posts={posts}/>}/>
                        <Route path="/new-post" element={<NewPostForm/>}/>;
                    </Routes>
                    <Footer/>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;