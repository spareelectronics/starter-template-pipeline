// src/contexts/auth/types.ts

export interface User {
    id: string;
    username: string;
    email: string;
    // Add any other user properties you need
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    error: string | null;
}

export type AuthAction =
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: Partial<User> }
    | { type: 'SET_AUTH_ERROR'; payload: string | null };