import {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useHistory} from 'react-router-dom';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, email, password);
        if (success) {
            history.push('/');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};        
