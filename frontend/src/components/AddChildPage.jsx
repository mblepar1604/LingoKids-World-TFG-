import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';    // <-- importamos useNavigate
import { AuthContext } from '../contexts/AuthContext';
import './styles/AddChildPage.css';

const AddChildPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- Hook para navegar programáticamente
  const [children, setChildren] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [edad, setEdad] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  // 1) Al montar: obtenemos la lista de hijos (si este user es padre)
  useEffect(() => {
    if (user?.es_padre) {
      axios
        .get('/api/users/children/')
        .then(res => {
          // res.data ahora viene como [{ id, username, perfil_id }, …]
          setChildren(res.data);
        })
        .catch(err => {
          console.error('Error al cargar hijos:', err);
        });
    }
  }, [user]);

  // 2) Handler para crear un nuevo niño
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    // Validación mínima: todos los campos deben tener valor
    if (!username || !password || !nombre || !apellidos || !edad) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Convertimos edad a número
    const edadNum = parseInt(edad, 10);
    if (isNaN(edadNum) || edadNum <= 0) {
      setError('La edad debe ser un número válido mayor que 0.');
      return;
    }

    try {
      // 3) Llamamos al POST con las claves EXACTAS que espera el serializer:
      //    first_name, last_name, edad, username, password
      const response = await axios.post('/api/users/children/', {
        username: username.trim(),
        password: password.trim(),
        first_name: nombre.trim(),
        last_name: apellidos.trim(),
        edad: edadNum
      });
      // response.data = { user_id, username, perfil_id }
      const nuevo = response.data;

      // 4) Convertimos { user_id, username, perfil_id } en
      //    { id, username, perfil_id }
      const nuevoChildFormateado = {
        id: nuevo.user_id,
        username: nuevo.username,
        perfil_id: nuevo.perfil_id,
      };

      // 5) Lo añadimos al array de children
      setChildren(prev => [...prev, nuevoChildFormateado]);

      // Reiniciamos los inputs
      setUsername('');
      setPassword('');
      setNombre('');
      setApellidos('');
      setEdad('');
      setMensaje('Hijo añadido correctamente');
    } catch (err) {
      console.error('Error al añadir hijo:', err);
      const detalle = err.response?.data || 'Error al añadir hijo';
      setError(detalle);
    }
  };

  // 6) Handler para eliminar hijo
  const eliminarHijo = async (id) => {
    setError('');
    try {
      await axios.delete(`/api/users/children/${id}/`);
      setChildren(prev => prev.filter(child => child.id !== id));
    } catch (err) {
      console.error('Error al eliminar hijo:', err);
      setError('Error al eliminar hijo');
    }
  };

  // Si el user no es un padre, no mostramos nada
  if (!user?.es_padre) return null;

  return (
    <div className="add-child-page">
      <form className="add-child-form" onSubmit={handleSubmit}>
        <h2>Añadir Hijo</h2>
        {mensaje && <p className="mensaje-ok">{mensaje}</p>}
        {error && <p className="mensaje-error">{String(error)}</p>}

        <label>
          Nombre
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </label>

        <label>
          Apellidos
          <input
            type="text"
            value={apellidos}
            onChange={e => setApellidos(e.target.value)}
            required
          />
        </label>

        <label>
          Edad
          <input
            type="number"
            min="1"
            value={edad}
            onChange={e => setEdad(e.target.value)}
            required
          />
        </label>

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
            <li key={child.id} className="child-item">
              <span className="child-username">{child.username}</span>

              {/* BOTÓN “Ver Progreso” */}
              <button
                className="child-progreso-btn"
                onClick={() => {
                  // Si perfil_id existe, navegamos a /progreso/:perfil_id
                  if (child.perfil_id) {
                    navigate(`/progreso/${child.perfil_id}`);
                  }
                }}
              >
                Ver Progreso
              </button>

              {/* BOTÓN “Eliminar” */}
              <button
                className="child-delete-btn"
                onClick={() => eliminarHijo(child.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddChildPage;