import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 clave

  const login = (userData, tokens) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokens.access_token);
    localStorage.setItem('refresh', tokens.refresh_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    

    if (window.location.pathname === '/login') {
      setLoading(false);
      return;
    }

    if (!token) {
      setLoading(false); // ✔️ finaliza si no hay token
      return;
    }

    axios.get('/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      })
      .catch(err => {
        console.warn('Token inválido o expirado. Cerrando sesión.');
        logout();
      })
      .finally(() => {
        setLoading(false); // ✔️ finaliza tras validar
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
