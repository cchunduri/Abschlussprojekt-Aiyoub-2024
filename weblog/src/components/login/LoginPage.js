import React, {useState} from "react";
import {useAuth} from "../../utils/AuthContext";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const {login} = useAuth(); // Get the login method from context
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form behavior
        setError(null); // Clear existing errors

        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                login();
                localStorage.setItem('user_id', data.id);
                navigate('/')
            } else {
                throw new Error(data.message || "Failed to log in. Please try again.");
            }
        } catch (err) {
            setError(err.message); // Display error message to the user
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
                {/* Show error message */}
                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
                {/* Login Form */}
                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* Password Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;