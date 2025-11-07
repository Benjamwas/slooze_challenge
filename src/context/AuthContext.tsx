import React, { createContext, useState, useEffect, ReactNode } from "react";
import api from "../api/axios";

interface User {
  id: number;
  token: string;
  role: "Manager" | "StoreKeeper";
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Explicitly tell Axios the response data type
      const res = await api.get<User[]>(`/users`, {
        params: { email, password },
      });

      const foundUser = res.data[0];

      if (!foundUser) throw new Error("Invalid email or password");

      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };
  

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
