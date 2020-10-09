import React, { useEffect } from "react";
import { useAuth } from "../src/auth-context";
import Router from 'next/router';

const ProtectedRoute = (Component) => {
    const {isAuthenticated, isLoading} = useAuth();

    useEffect(() => {
        if(!isAuthenticated && !isLoading){
            Router.push('/sign');
        }
    }, [isAuthenticated, isLoading])

    return (<Component {...arguments} />)
}

export default ProtectedRoute