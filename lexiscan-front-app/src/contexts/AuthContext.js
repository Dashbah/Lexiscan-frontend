import {createContext, useState, useContext, useEffect} from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in when the app loads
        // checkAuthStatus();
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            console.log('trying to login');
            const response = await fetch('http://89.169.154.190:8080/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: email,
                    email: email,
                    password: password,
                    role: 'CLIENT'
                })
            });

            const data = response.text();

            console.log(data);

            if (response.ok && data) {
                localStorage.setItem('token', data);
                localStorage.setItem('usename', email);
                setUser(data.user);
                console.log('user set');
                return true;
            } else {
                throw new Error('response status was not ok or had empty body');
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            if (token) {
                // Verify token with backend
                const response = await fetch('/api/verify-token', {
                    headers: {Authorization: `Bearer ${token}`}
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
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
