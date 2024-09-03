// src/contexts/app/AppContext.tsx

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of your app-wide state
export interface AppState {
    isLoading: boolean;
    error: string | null;
    notifications: string[];
    currentPage: string;
    theme: 'light' | 'dark';
    language: string;
    // Add any other app-wide state properties here
}

// Define all possible actions
type AppAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'ADD_NOTIFICATION'; payload: string }
    | { type: 'REMOVE_NOTIFICATION'; payload: string }
    | { type: 'SET_CURRENT_PAGE'; payload: string }
    | { type: 'SET_THEME'; payload: 'light' | 'dark' }
    | { type: 'SET_LANGUAGE'; payload: string }
// Add more action types as needed

// Initial state
const initialAppState: AppState = {
    isLoading: false,
    error: null,
    notifications: [],
    currentPage: 'home',
    theme: 'light',
    language: 'en',
    // Initialize other state properties here
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'ADD_NOTIFICATION':
            return { ...state, notifications: [...state.notifications, action.payload] };
        case 'REMOVE_NOTIFICATION':
            return { ...state, notifications: state.notifications.filter(n => n !== action.payload) };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        case 'SET_LANGUAGE':
            return { ...state, language: action.payload };
        default:
            return state;
    }
};

// Create the context
interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Custom hook for using the app context
export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

// Provider component
interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialAppState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

// Utility functions for common actions
export const appActions = {
    setLoading: (dispatch: React.Dispatch<AppAction>, isLoading: boolean) =>
        dispatch({ type: 'SET_LOADING', payload: isLoading }),
    setError: (dispatch: React.Dispatch<AppAction>, error: string | null) =>
        dispatch({ type: 'SET_ERROR', payload: error }),
    addNotification: (dispatch: React.Dispatch<AppAction>, notification: string) =>
        dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),
    removeNotification: (dispatch: React.Dispatch<AppAction>, notification: string) =>
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification }),
    setCurrentPage: (dispatch: React.Dispatch<AppAction>, page: string) =>
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page }),
    setTheme: (dispatch: React.Dispatch<AppAction>, theme: 'light' | 'dark') =>
        dispatch({ type: 'SET_THEME', payload: theme }),
    setLanguage: (dispatch: React.Dispatch<AppAction>, language: string) =>
        dispatch({ type: 'SET_LANGUAGE', payload: language }),
};