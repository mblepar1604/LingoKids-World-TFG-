import React, { createContext, useState } from 'react';

// 1) Creamos el contexto
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 2) Inicializamos el estado desde localStorage, SÍNCRONO
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // 3) Función de login: guarda en localStorage y en estado
  const login = (userData, tokens) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokens.access_token);
    localStorage.setItem('refresh', tokens.refresh_token);
    setUser(userData);
  };

  // 4) Función de logout: limpia y fuerza redirección
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}