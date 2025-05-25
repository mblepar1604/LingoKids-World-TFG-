import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './styles/AddChildPage.css';

const AddChildPage = () => {
  const { user } = useContext(AuthContext);
  const [children, setChildren] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // GET lista de hijos al cargar
  useEffect(() => {
    if (user?.es_padre) {
      axios.get('/api/users/children/')
        .then(res => setChildren(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  // Añadir hijo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const { data: nuevo } = await axios.post('/api/users/children/', {
        username,
        password
      });
      setChildren(prev => [...prev, nuevo]);
      setUsername('');
      setPassword('');
      setMensaje('Hijo añadido correctamente');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Error al añadir hijo');
    }
  };

  // Eliminar hijo
  const eliminarHijo = async (id) => {
    try {
      await axios.delete(`/api/users/children/${id}/`);
      setChildren(prev => prev.filter(child => child.id !== id));
    } catch (err) {
      console.error(err);
      setError('Error al eliminar hijo');
    }
  };

  if (!user?.es_padre) return null;

  // HTML extraído a función aparte
  const renderAddChild = () => (
    <div className="add-child-page">
      <form className="add-child-form" onSubmit={handleSubmit}>
        <h2>Añadir Hijo</h2>
        {mensaje && <p className="mensaje-ok">{mensaje}</p>}
        {error && <p className="mensaje-error">{error}</p>}
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

      <div className="children-list">
        <h3>Hijos registrados</h3>
        {children.length === 0 && <p>No hay hijos registrados aún.</p>}
        <ul>
          {children.map(child => (
            <li key={child.id}>
              {child.username}
              <button onClick={() => eliminarHijo(child.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return renderAddChild();
};

export default AddChildPage;