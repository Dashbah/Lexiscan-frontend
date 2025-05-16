import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const { error } = useAuth();

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            history.push('/chats');
        }
    };

    return (
        <div className="auth-form-container">
            <form className='auth-form' onSubmit={handleSubmit}>
                <h2>Login to Lexiscan</h2>
                <input
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required="true"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required="true"
                />
                <button type="submit">Login</button>
                <div className="auth-switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
                {error && <p style={{color: 'red', display: 'flex', justifyContent: 'center'}}>{error}</p>}
            </form>
        </div>
    );
};        
