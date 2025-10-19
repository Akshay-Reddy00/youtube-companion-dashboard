import { useState } from "react";
import { AuthContext } from "./authContext";
import type { ReactNode } from "react";

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
