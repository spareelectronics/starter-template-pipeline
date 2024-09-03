// src/contexts/auth/AuthContext.tsx

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { authReducer, initialAuthState } from './authReducer';
import { AuthState, AuthAction } from './types';

interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Utility functions for common auth actions
export const authActions = {
    login: (dispatch: React.Dispatch<AuthAction>, user: AuthState['user'], token: string) =>
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } }),
    logout: (dispatch: React.Dispatch<AuthAction>) =>
        dispatch({ type: 'LOGOUT' }),
    updateUser: (dispatch: React.Dispatch<AuthAction>, user: Partial<AuthState['user']>) =>
        dispatch({ type: 'UPDATE_USER', payload: user }),
    setAuthError: (dispatch: React.Dispatch<AuthAction>, error: string | null) =>
        dispatch({ type: 'SET_AUTH_ERROR', payload: error }),
};