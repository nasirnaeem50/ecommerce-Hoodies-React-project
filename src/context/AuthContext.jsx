import { createContext, useState, useEffect, useCallback, useContext } from 'react';

// Create context
export const AuthContext = createContext();

// Custom hook for consuming context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock database for user storage
const mockUsersDB = [
  { 
    email: 'nasirnaeem66@gmail.com', 
    name: 'Admin', 
    password: '123456', 
    isAdmin: true,
    id: '1'
  },
  { 
    email: 'user@example.com', 
    name: 'Regular User', 
    password: 'user123', 
    isAdmin: false,
    id: '2'
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start with true for initial check

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

      const userData = { 
        email: foundUser.email, 
        name: foundUser.name,
        id: foundUser.id
      };
      
      setUser(userData);
      setIsAdmin(foundUser.isAdmin);
      
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

      const newUser = {
        email,
        name,
        password,
        isAdmin: false,
        id: String(mockUsersDB.length + 1)
      };

      mockUsersDB.push(newUser);

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
  }, []);

  // Check for existing session
  const checkExistingSession = useCallback(() => {
    setIsLoading(true);
    try {
      const storedAuth = localStorage.getItem('authUser');
      if (storedAuth) {
        const { user, isAdmin } = JSON.parse(storedAuth);
        setUser(user);
        setIsAdmin(isAdmin);
      }
    } catch (error) {
      console.error('Failed to parse auth data', error);
      localStorage.removeItem('authUser');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize auth check
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