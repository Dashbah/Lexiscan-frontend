import {useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useHistory} from 'react-router-dom';

export const Logout = () => {
    const {logout} = useAuth();
    const history = useHistory();

    const handleLogout = async () => {
        const success = await logout();
        if (success) {
            console.log('logout successful');
            history.push('/');
        } else {
            console.log('Logout not ok');
        }
    }

    return (
        <div className='logout'>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};