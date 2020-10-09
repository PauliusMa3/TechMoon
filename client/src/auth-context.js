import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = React.createContext();
function AuthProvider({ children }) {
  const Router = useRouter();

  const [state, setState] = useState({
    status: null,
    error: null,
    user: null,
  });

  const getUser = () =>
    axios.get('http://localhost:8888/auth/userDetails', {
      withCredentials: true,
    });

  useEffect(() => {
    getUser()
      .then((res) => {
        // if (!res.data.success) {
        //   Router.push('/signin');
        // }
        setState({ status: 'success', error: null, user: res.data.user });
      })
      .catch((err) => {
        setState({ status: 'error', error: err.message, user: null });
      });
  }, []);

  const login = async ({ email, password }) => {
    setState({ status: 'pending', user: null, error: null });
    const response = await axios
      .post(
        'http://localhost:8888/login',
        { email, password },
        {
          withCredentials: true,
        }
      )
      .catch((e) => {
        if (e.response.status === 401) {
          setState({
            status: 'error',
            error: 'Invalid email or password',
            user: null,
          });
        } else {
          setState({
            status: 'error',
            error: e.message,
            user: null,
          });
        }
      });

    if (response && response.data.success) {
      getUser()
        .then((res) => {
          setState({
            status: 'success',
            error: null,
            user: res.data.user,
          });
          Router.push('/');
        })
        .catch((err) => {
          console.log('login error: ', err.message);
          setState({
            status: 'error',
            error: err.message,
            user: null,
          });
        });
    }
  };

  const logout = async () => {
    await axios.get('http://localhost:8888/logout', {
      withCredentials: true,
    });

    Cookies.remove('connect.sid');
    setState({ status: 'success', error: null, user: null });
    // Router.push('/signin');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  const isSuccess = context.status === 'success';
  const isLoading = context.status === 'pending';
  const isError = context.status === 'error';
  const isAuthenticated = context.user && isSuccess;

  return {
    ...context,
    isSuccess,
    isLoading,
    isError,
    isAuthenticated,
  };
};

export { AuthProvider, useAuth };
