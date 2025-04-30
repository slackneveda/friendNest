
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

// Define types
export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (name: string, username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: 'sarahjohnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Digital artist and dog lover 🎨🐕',
    followersCount: 1250,
    followingCount: 365
  },
  {
    id: '2',
    name: 'Alex Chen',
    username: 'alexchen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Travel photographer | Follow for adventure 🌎✈️',
    followersCount: 3421,
    followingCount: 512
  },
  {
    id: '3',
    name: 'Jordan Smith',
    username: 'jordansmith',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Software developer by day, musician by night 💻🎸',
    followersCount: 876,
    followingCount: 234
  }
];

// Provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login logic - find user by username
      const mockUser = MOCK_USERS.find(user => user.username === username);
      
      if (mockUser && password.length > 3) {
        setUser(mockUser);
        toast.success("Successfully logged in!");
        localStorage.setItem('user', JSON.stringify(mockUser));
        setIsLoading(false);
        return true;
      } else {
        toast.error("Invalid username or password");
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (name: string, username: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if username already exists
      const existingUser = MOCK_USERS.find(user => user.username === username);
      
      if (existingUser) {
        toast.error("Username already taken");
        setIsLoading(false);
        return false;
      }
      
      // Create new mock user
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
        name,
        username,
        avatar: `https://i.pravatar.cc/150?img=${MOCK_USERS.length + 10}`,
        bio: '',
        followersCount: 0,
        followingCount: 0
      };
      
      // Set the user state
      setUser(newUser);
      toast.success("Account created successfully!");
      localStorage.setItem('user', JSON.stringify(newUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Successfully logged out");
  };

  // Check for stored user on initial load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy context use
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
