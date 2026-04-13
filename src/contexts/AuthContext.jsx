import { useState } from "react";
import { AuthContext } from "./AuthContextBase";

function readStoredAuth() {
  try {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      return { token: savedToken, user: JSON.parse(savedUser) };
    }
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  return { token: null, user: null };
}

export function AuthProvider({ children }) {
  const [{ token, user }, setAuth] = useState(() => readStoredAuth());

  const handleLogin = (tokenValue, userData) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("user", JSON.stringify(userData));
    setAuth({ token: tokenValue, user: userData });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null });
  };

  const updateUser = (updates) => {
    setAuth((prev) => {
      const updated = { ...prev.user, ...updates };
      localStorage.setItem("user", JSON.stringify(updated));
      return { ...prev, user: updated };
    });
  };

  const loading = false;

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login: handleLogin, logout: handleLogout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
