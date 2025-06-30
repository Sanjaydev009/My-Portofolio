import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthState } from '../types';
import { authService } from '../services/auth';

// Auth Actions
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_ERROR'; payload: string };

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

// Initial State
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true
};

// Auth Context Type
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  checkAuth: () => Promise<void>;
  isAdmin: () => boolean;
}

// Create Context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider Component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const token = authService.getToken();
      const user = authService.getCurrentUser();
      
      if (token && user) {
        // Verify token is still valid by fetching user profile
        try {
          const response = await authService.getProfile();
          if (response.success && response.data) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user: response.data, token }
            });
          } else {
            // Token is invalid, clear auth data
            authService.logout();
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          // Token is invalid, clear auth data
          authService.logout();
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      dispatch({ type: 'LOGOUT' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authService.login({ email, password });
      
      if (response.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: response.user, token: response.token }
        });
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authService.register({ 
        name, 
        email, 
        password, 
        confirmPassword: password 
      });
      
      if (response.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: response.user, token: response.token }
        });
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      const response = await authService.updateProfile(userData);
      
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_USER', payload: response.data });
      }
    } catch (error) {
      throw error;
    }
  };

  const isAdmin = (): boolean => {
    return state.user?.role === 'admin';
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    checkAuth,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
