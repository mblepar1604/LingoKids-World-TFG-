import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './styles/Registro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    es_padre: true,      // en backend usa es_padre / es_infantil
    es_infantil: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, type, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/users/registro/', formData);
      navigate('/login');
    } catch {
      setError('Error al registrar usuario');
    }
  };

  // HTML extraído a función aparte
  const renderForm = () => (
    <div className="register-page">
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
        {/* Solo registro de padres ahora */}
        <label className="register-label checkbox">
          <input
            type="checkbox"
            name="es_padre"
            checked={formData.es_padre}
            onChange={handleChange}
          /> Soy padre
        </label>
        <button type="submit" className="register-button">
          Registrarse
        </button>
        <p className="register-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );

  return renderForm();
};

export default Registro;