import React, { createContext, useContext, useState, useEffect } from 'react';
import { postRequest } from '../utils/apiConnector';
import { API_ENDPOINTS } from '../utils/apis';
interface AuthContextType {
  user: any;
  login: (user: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
  token: string | null;
  setUserData: (user: any) => void;
  setIsAuthenticatedData: (isAuthenticated: boolean) => void;
  setTokenData: (token: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null,
  login: () => {},
  logout: () => {},
  isAuthenticated: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token') || null  ,
  setUserData: (user: any) => {},
  setIsAuthenticatedData: (isAuthenticated: boolean) => {},
  setTokenData: (token: string) => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if user is stored in localStorage (for persistence)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = async (userData: any) => {
    try {
      const response = await postRequest( API_ENDPOINTS.LOGIN, userData);
      console.log(response.data);
      setUser(response.data.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const setUserData = (user: any) => {
    setUser(user);
  };

  const setIsAuthenticatedData = (isAuthenticated: boolean) => {
    setIsAuthenticated(isAuthenticated);
  };

  const setTokenData = (token: string) => {
    localStorage.setItem('token', token);
  };  
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, token: localStorage.getItem('token') || null, setUserData, setIsAuthenticatedData, setTokenData }}>
      {children}
    </AuthContext.Provider>
  );
};