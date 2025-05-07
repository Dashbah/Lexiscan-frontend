import {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useHistory} from 'react-router-dom';

export const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const {register} = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(username, email, password);
        if (success) {
            history.push('/');
        }
    };

    return (
        <form className='register-form' onSubmit={handleSubmit}>
            <h2>Register to Lexiscan</h2>
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
            <button type="submit">Register</button>
        </form>
    );
};        
