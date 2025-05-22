import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/ConfiguracionParental.css';

const ConfiguracionParental = () => {
  const [config, setConfig] = useState({
    idioma: 'es',
    limite_tiempo: 30,
    accesibilidad: false
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 1️⃣ Carga la configuración actual
    axios.get('/api/users/configuracion-parental/')
      .then(res => setConfig(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // 2️⃣ Envía la nueva configuración
    axios.post('/api/users/configuracion-parental/', config)
      .then(res => setMessage('Guardado con éxito'))
      .catch(err => setMessage('Error al guardar'));
  };

  // HTML extraído a función aparte
  const renderConfigForm = () => (
    <div className="config-page">
      <h2>Configuración Parental</h2>
      {message && <p className="message">{message}</p>}
      <form className="config-form" onSubmit={handleSubmit}>
        <label>
          Idioma:
          <select name="idioma" value={config.idioma} onChange={handleChange}>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
            <option value="fr">Francés</option>
          </select>
        </label>

        <label>
          Límite de tiempo (min):
          <input
            type="number"
            name="limite_tiempo"
            value={config.limite_tiempo}
            onChange={handleChange}
            min="1"
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="accesibilidad"
            checked={config.accesibilidad}
            onChange={handleChange}
          />
          Modo accesible
        </label>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );

  return renderConfigForm();
};

export default ConfiguracionParental;