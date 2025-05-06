import {Redirect} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

export const ProtectedRoute = ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Redirect to="/login" replace/>;
    }

    return children;
};