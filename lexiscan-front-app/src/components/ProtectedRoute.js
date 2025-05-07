import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import SorryNotAuth from './SorryNotAuth';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                    <SorryNotAuth/>
                )
            }
        />
    );
};
