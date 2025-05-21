import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1️⃣ Obtener tokens
      const { data: tokens } = await axios.post('/api/token/', {
        username,
        password
      });

      // 2️⃣ Guardar el access token bajo la key "token"
      localStorage.setItem('token', tokens.access);
      localStorage.setItem('refresh', tokens.refresh);

      // 3️⃣ Configurar Axios para usar el nuevo token
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;

      // 4️⃣ Obtener datos del usuario
      const { data: userData } = await axios.get('/api/users/me/');

      // 5️⃣ Actualizar estado global y redirigir
      login(userData);
      navigate('/');
    } catch {
      setError('Usuario o contraseña incorrectos');
    }
  };

  function renderForm() {
    return (
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
    );
  }

  return (
    <div className="login-page">
      {renderForm()}
    </div>
  );
};

export default Login;
