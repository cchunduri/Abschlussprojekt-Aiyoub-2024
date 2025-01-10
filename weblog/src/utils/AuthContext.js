import React, {createContext, useContext, useState} from 'react';

// Create the AuthContext
const AuthContext = createContext({});

// AuthProvider component to wrap the application and provide auth state
export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return !!localStorage.getItem('isLoggedIn');
    });

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('user_id');
        localStorage.removeItem('isLoggedIn');
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);