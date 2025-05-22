import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate                = useNavigate();
  const { login }               = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1) Obtener tokens del DRF simplejwt
      const { data: tokens } = await axios.post('/api/token/', {
        username,
        password
      });
      // tokens = { refresh: '...', access: '...' }

      // 2) Configuramos el header de axios con el access token
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${tokens.access}`;

      // 3) Petición para obtener datos del usuario actual
      const { data: userData } = await axios.get('/api/users/me/');

      // 4) Guardamos en localStorage y contexto
      login(
        { 
          ...userData,
          // opcional: mantén los campos booleanos
          es_padre: userData.es_padre,
          es_infantil: userData.es_infantil
        },
        {
          access_token: tokens.access,
          refresh_token: tokens.refresh
        }
      );

      // 5) Navegar al Home
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Usuario o contraseña incorrectos');
    }
  };

  // HTML extraído a función aparte
  const renderForm = () => (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>
        {error && <div className="error">{error}</div>}
        <label className="login-label">
          Usuario
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="login-label">
          Contraseña
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="login-button">Entrar</button>
        <p className="login-footer">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );

  return renderForm();
};

export default Login;