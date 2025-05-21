import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './styles/Registro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rol: 'padre',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('/api/register/', formData);
      navigate('/login');
    } catch (err) {
      setError('Error al registrar usuario');
      console.error(err);
    }
  };

  function renderForm() {
    return (
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Registro</h2>
        {error && <div className="error">{error}</div>}
        <label className="register-label">
          Usuario
          <input
            type="text"
            name="username"
            className="register-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label className="register-label">
          Contraseña
          <input
            type="password"
            name="password"
            className="register-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label className="register-label">
          Rol
          <select
            name="rol"
            className="register-input"
            value={formData.rol}
            onChange={handleChange}
          >
            <option value="padre">Padre</option>
            <option value="nino">Niño</option>
          </select>
        </label>
        <button type="submit" className="register-button">
          Registrarse
        </button>
        <p className="register-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    );
  }

  return (
    <div className="register-page">
      {renderForm()}
    </div>
  );
};

export default Registro;
