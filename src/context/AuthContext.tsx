import React, { useEffect, useState, createContext } from 'react';
interface User {
  token: string;
  role: 'Manager' | 'StoreKeeper';
  name: string;
}
interface AuthContextType {
  user: User | null;
  theme: 'light' | 'dark';
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  toggleTheme: () => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);
  const login = async (email: string, password: string) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock response based on email
    const mockUser: User = email.includes('manager') ? {
      token: 'mock123',
      role: 'Manager',
      name: 'John Manager'
    } : {
      token: 'mock456',
      role: 'StoreKeeper',
      name: 'Sarah Keeper'
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
  };
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  return <AuthContext.Provider value={{
    user,
    theme,
    login,
    logout,
    toggleTheme
  }}>
      {children}
    </AuthContext.Provider>;
};