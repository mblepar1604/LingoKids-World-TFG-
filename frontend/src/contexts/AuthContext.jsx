import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('/img/avatar.png');
  const [loading, setLoading] = useState(true);

  const login = (userData, tokens) => {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access_token}`;
    setUser(userData);
  };
  
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setAvatarUrl('/img/avatar.png');
    window.location.href = '/login';
  };

  const loadAvatar = async (perfilId) => {
    const token = localStorage.getItem('access_token');
    if (!token || !perfilId) return;

    try {
      const response = await axios.get(`http://localhost:8000/api/avatar/mi-avatar/${perfilId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.vista_previa) {
        setAvatarUrl(response.data.vista_previa);
      }
    } catch (err) {
      console.warn('Error al cargar el avatar:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }
    axios.get('/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log("GET /api/users/me/ →", res.data);
        setUser(res.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        if (res.data.perfilInfantilId) {
          loadAvatar(res.data.perfilInfantilId);
        }
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, avatarUrl, loadAvatar, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
