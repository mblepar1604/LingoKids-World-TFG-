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
      // Llamada al nuevo endpoint que ya genera el token directamente
      const { data } = await axios.post('/api/login/', { username, password });
      const accessToken = data.access_token;

      // Obtener datos del usuario
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      const { data: userData } = await axios.get('/api/users/me/');

      const isPadre = userData.es_padre;
      const isInfantil = userData.es_infantil;

      // Guardado condicional
      if (isInfantil) {
        // Niño → guardar en localStorage (token con duración definida)
        localStorage.setItem('access_token', accessToken);
      } else {
        // Padre o admin → guardar solo en sessionStorage
        sessionStorage.setItem('access_token', accessToken);
      }

      // Aplicar token por defecto
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // Actualizar contexto
      login(
        { ...userData, es_padre: isPadre, es_infantil: isInfantil },
        { access_token: accessToken }
      );

      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Usuario o contraseña incorrectos');
    }
  };

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
