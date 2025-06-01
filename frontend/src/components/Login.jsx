import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './styles/Login.css';

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate                = useNavigate();
  const { login }               = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Prueba enviando ambos campos: username y email, el backend debe aceptar uno de los dos
      const payload = {
        username: usernameOrEmail,
        email: usernameOrEmail,
        password
      };
      const { data } = await axios.post('/api/users/login/', payload);
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
          Usuario o Email
          <input
            type="text"
            className="login-input"
            value={usernameOrEmail}
            onChange={e => setUsernameOrEmail(e.target.value)}
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
          ¿No tienes cuenta? <Link to="/registro">Regístrate como madre/padre aquí</Link>
        </p>
      </form>
    </div>
  );

  return renderForm();
};

export default Login;
