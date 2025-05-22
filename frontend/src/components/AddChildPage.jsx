import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './styles/AddChildPage.css';

const AddChildPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [children, setChildren] = useState([]);
  const { user } = useContext(AuthContext);

  // Cargar lista de hijos al montar (solo para padres)
  useEffect(() => {
    if (user?.es_padre || user?.is_superuser) {
      axios.get('/api/users/children/')
        .then(res => setChildren(res.data))
        .catch(console.error);
    }
  }, [user]);

  // Manejar envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { data: child } = await axios.post(
        '/api/users/children/',
        { username, password }
      );
      setUsername('');
      setPassword('');
      setChildren(prev => [...prev, child]);
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al añadir hijo');
    }
  };

  // Si no es padre ni superusuario, no mostramos nada
  if (!user?.es_padre) return null;

  return (
    <div className="add-child-page-wrapper">
      <h2>Añadir Hijo</h2>

      <form className="add-child-form" onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label>
          Nombre de usuario
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Añadir hijo</button>
      </form>

      {children.length > 0 && (
        <section className="children-list">
          <h3>Mis Hijos</h3>
          <ul>
            {children.map(c => (
              <li key={c.id}>{c.username}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AddChildPage;