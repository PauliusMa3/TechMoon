import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {useMutation} from '@apollo/react-hooks';
import gql  from 'graphql-tag';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION(
        $email: String!
        $name: String!
        $password: String!
    ) {
        signup(email: $email, name: $name, password: $password) {
          userId
          email
          name
        }
    }
`;

const AuthContext = React.createContext();
function AuthProvider({ children }) {
  const Router = useRouter();

  const [signup] = useMutation(SIGNUP_MUTATION, {
      onError: (signupError) => {
          const hasEmailError = signupError.graphQLErrors.find((item) => item.message.includes(
                  'This email address is not available' )
          );
          setState({
              status: 'error',
              error: hasEmailError.message || signupError.message,
              user: null
          });
      },
      onCompleted: (data) => {
        setState({
            status: 'success',
            error: null,
            user: data.signup
        });
        Router.push('/');
      }
  });

  const [state, setState] = useState({
    status: null,
    error: null,
    user: null,
  });

  const cleanAuthErrorFunc = () => {
    setState({
      ...state,
      error: null
    })
  }

  const getUser = () => axios.get('http://localhost:8888/auth/userDetails', {
    withCredentials: true,
  });

  useEffect(() => {
    setState({...state, status: 'pending'})
    getUser()
      .then((res) => {
        setState({ status: 'success', error: null, user: res.data.user });
      })
      .catch((err) => {
        setState({ status: 'error', error: err.message, user: null });
      });
  }, []);

  const loginFunc = async ({ email, password }) => {
    try {
        setState({ status: 'pending', user: null, error: null });
        const res = await axios.post(
            'http://localhost:8888/login',
            { email: email.toLowerCase(), password },
            {
                withCredentials: true
            }
        );
          setState({
          status: 'success',
            error: null,
            user: res.data.user,
          });

          Router.push('/');
        } catch (e) {
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
    }
  }

  const registerFunc = ({email,name, password}) => {
    setState({ status: 'pending', user: null, error: null });
    signup({
        variables: {
            email,
            name,
            password
        }
    });
  }

  const logoutFunc = async () => {
    try {
      await axios.get('http://localhost:8888/logout', {
        withCredentials: true,
      });

      Cookies.remove('connect.sid');
      setState({ status: 'success', error: null, user: null });
      Router.push('/');
    } catch(e) {
      console.log(e.message);
    }

  };

    const value = React.useMemo(() => {
        return {
            ...state,
            loginFunc,
            logoutFunc,
            cleanAuthErrorFunc,
            registerFunc
        };
    }, [state.status, state.user, state.error]);

    return (
        <AuthContext.Provider
            value={value}
        >
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

    const {loginFunc, logoutFunc, registerFunc, cleanAuthErrorFunc, user, error} = context

    const login = React.useCallback(({...params}) => loginFunc({...params}), []);
    const logout = React.useCallback(() => logoutFunc(), []);
    const register = React.useCallback(({...params}) => registerFunc({...params}), []);
    const cleanAuthError = React.useCallback(() => cleanAuthErrorFunc(), []);

    return {
        user,
        error,
        login,
        logout,
        register,
        cleanAuthError,
        isSuccess,
        isLoading,
        isError,
        isAuthenticated
    };
};


export { AuthProvider, useAuth };
