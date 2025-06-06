import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [registerError, setRegisterError] = useState(null);

    useEffect(() => {
        // Check if user is logged in when the app loads
        // checkAuthStatus();
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            setError(null);
            console.log('trying to register ' + username);
            const response = await fetch('http://89.169.154.190:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.text();

            if (response.ok && data) {
                console.log(data);
                localStorage.setItem('token', data);
                localStorage.setItem('username', username);

                setUser({
                    username: username,
                })
                console.log('user set, logged in');
                console.log(user);
                return true;
            } else if (response.status === 400 && data === "Username doesn't exists") {
                setError('Username does not exists');
                throw new Error('Username does not exists');
            } else {
                setError('Sorry :( error occured');
                throw new Error('response status was not ok or had an empty body');
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const register = async (username, email, password) => {
        try {
            setRegisterError(null)
            console.log('trying to register ' + username);
            const response = await fetch('http://89.169.154.190:8080/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    role: 'CLIENT'
                })
            });

            const data = await response.text();

            console.log(data);

            if (response.ok && data) {
                localStorage.setItem('token', data);
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);

                setUser({
                    username: username,
                    email: email
                })
                console.log('user set, registered');
                return true;
            } else if (response.status === 400) {
                setRegisterError('Username already exists');
                throw new Error('Username already exists');
            } else {
                setRegisterError('Sorry :( error occured');
                throw new Error('response status was not ok or had an empty body');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        setUser(null);
        setError(null);
        setRegisterError(null);
        return true;
    };

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            if (token) {
                // Verify token with backend
                const response = await fetch('/api/verify-token', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();

                if (data.user) {
                    setUser(data.user);
                }
            }
        } catch (error) {
            console.error('Token verification failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading, error, registerError }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
