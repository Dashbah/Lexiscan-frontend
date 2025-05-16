import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SorryNotAuth from './SorryNotAuth';
import { LoginForm } from './LoginForm';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('username') ? (
                    <Component {...props} />
                ) : (
                    <LoginForm/>
                )
            }
        />
    );
};
