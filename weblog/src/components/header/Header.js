import React from 'react';
import {useAuth} from "../../utils/AuthContext";

const Header = () => {
    const {isLoggedIn, login, logout} = useAuth(); // Get auth state and handlers

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 w-full">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                {/* Left Section - Site Text */}
                <h1 className="text-lg font-semibold text-gray-800">
                    Aiyoub Weblog
                </h1>

                {/* Right Section - Navigation Buttons */}
                <nav className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            {/* Home Button */}
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100
                           border border-gray-300 rounded-md hover:bg-gray-200"
                                onClick={() => console.log('Navigate to Home')} // Replace with actual routing logic
                            >
                                Home
                            </button>
                            {/* Logout Button */}
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500
                           border border-red-600 rounded-md hover:bg-red-600"
                                onClick={logout} // Call logout function from context
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Login Button */}
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100
                           border border-gray-300 rounded-md hover:bg-gray-200"
                                onClick={login} // Call login function from context
                            >
                                Login
                            </button>
                            {/* Register Button */}
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-500
                           border border-blue-600 rounded-md hover:bg-blue-600"
                                onClick={() => console.log('Navigate to Register')} // Replace with actual routing logic
                            >
                                Register
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;