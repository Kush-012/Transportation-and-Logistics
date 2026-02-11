import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setUserData(null);
      return;
    }
    try {
      setUserData(jwtDecode(token));
    } catch {
      setUserData(null);
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    loadUser();
    setLoading(false);
  }, []);

  const login = (token) => {
    sessionStorage.setItem("token", token);
    loadUser();
  };

  const logout = () => {
    sessionStorage.clear();
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};