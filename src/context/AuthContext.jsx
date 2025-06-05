import { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

// Mock database for user storage
const mockUsersDB = [
  { email: 'nasirnaeem66@gmail.com', name: 'Admin', password: '123456', isAdmin: true },
  { email: 'user@example.com', name: 'Regular User', password: 'user123', isAdmin: false }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API call delay
  const simulateAPICall = async () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    
    try {
      await simulateAPICall();
      
      const foundUser = mockUsersDB.find(
        user => user.email === email && user.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      const userData = { email: foundUser.email, name: foundUser.name };
      setUser(userData);
      setIsAdmin(foundUser.isAdmin);
      
      // Store in localStorage for persistence
      localStorage.setItem('authUser', JSON.stringify({
        user: userData,
        isAdmin: foundUser.isAdmin
      }));
      
      return true;
    } catch (error) {
      setAuthError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      await simulateAPICall();

      // Validation checks
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const emailExists = mockUsersDB.some(user => user.email === email);
      if (emailExists) {
        throw new Error('Email already registered');
      }

      // In a real app, you would hash the password before storing
      const newUser = {
        email,
        name,
        password,
        isAdmin: false
      };

      // Add to mock database
      mockUsersDB.push(newUser);

      // Return success without logging in automatically
      return true;
    } catch (error) {
      setAuthError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('authUser');
    window.location.reload(); // Add this to ensure all components update
  }, []);

  // Check for existing session on initial load
  const checkExistingSession = useCallback(() => {
    const storedAuth = localStorage.getItem('authUser');
    if (storedAuth) {
      const { user, isAdmin } = JSON.parse(storedAuth);
      setUser(user);
      setIsAdmin(isAdmin);
    }
  }, []);

  // Initialize auth check on component mount
  useEffect(() => {
    checkExistingSession();
  }, [checkExistingSession]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAdmin, 
        authError,
        isLoading,
        login, 
        register, 
        logout,
        setAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};