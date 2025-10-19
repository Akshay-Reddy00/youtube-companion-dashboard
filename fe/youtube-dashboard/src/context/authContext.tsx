// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const saveToken = (token: string | null) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};
