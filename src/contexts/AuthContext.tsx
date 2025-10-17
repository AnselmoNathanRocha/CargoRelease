import { AuthRequest } from "@/models/auth";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthResponse {
  message: string;
  success: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: AuthRequest) => AuthResponse;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (data: AuthRequest): AuthResponse => {
    const email = import.meta.env.VITE_ADMIN_EMAIL;
    const senha = import.meta.env.VITE_ADMIN_PASSWORD;

    if (data.email === email && data.password === senha) {
      sessionStorage.setItem("auth", "true");
      setIsAuthenticated(true);
      return {
        message: "Login efetuado com sucesso.",
        success: true,
      };
    }

    return {
      message: "E-mail ou senha inválidos.",
      success: false,
    };
  };

  const logout = () => {
    sessionStorage.removeItem("auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};