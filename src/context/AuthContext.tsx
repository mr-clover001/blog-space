
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/user';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin users
const defaultUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    isVerified: true,
    createdAt: '2024-01-01T00:00:00Z',
    password: 'password123'
  }
];

// Store management functions
const getUsersFromStore = (): User[] => {
  const stored = localStorage.getItem('registered_users');
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default users if no stored users exist
  localStorage.setItem('registered_users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

const saveUsersToStore = (users: User[]) => {
  localStorage.setItem('registered_users', JSON.stringify(users));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = getUsersFromStore();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const mockToken = 'mock-jwt-token-' + Date.now();
      // Don't include password in stored user data
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword as User);
      setToken(mockToken);
      setIsAuthenticated(true);
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    const users = getUsersFromStore();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      console.log('User with this email already exists');
      return false;
    }
    
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'user',
      isVerified: false,
      createdAt: new Date().toISOString(),
      profileImage: userData.profileImagePreview,
      password: userData.password
    };
    
    const updatedUsers = [...users, newUser];
    saveUsersToStore(updatedUsers);
    
    console.log('User registered successfully:', { ...newUser, password: '[HIDDEN]' });
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Also update in the users store
      const users = getUsersFromStore();
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        saveUsersToStore(users);
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export function to get all users for admin purposes
export const getAllUsers = (): User[] => {
  const users = getUsersFromStore();
  // Return users without passwords for security
  return users.map(({ password, ...user }) => user as User);
};
