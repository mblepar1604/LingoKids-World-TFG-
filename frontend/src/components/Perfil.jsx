import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './styles/Perfil.css';

const Perfil = () => {
  const { user } = useContext(AuthContext);
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChangePass = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      const { data } = await axios.post('/api/users/cambiar-password/', {
        actual,
        nueva
      });
      setMensaje(data.detail);
      setActual('');
      setNueva('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error al cambiar contraseña');
    }
  };

  // HTML extraído a función aparte
  const renderPerfil = () => (
    <div className="perfil-page">
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre de usuario:</strong> {user?.username}</p>
      <p><strong>Nombre completo:</strong> {user?.first_name} {user?.last_name}</p>
      <p><strong>Email:</strong> {user?.email}</p>

      <form onSubmit={handleChangePass}>
        <h3>Cambiar contraseña</h3>
        {mensaje && <p className="mensaje-ok">{mensaje}</p>}
        {error && <p className="mensaje-error">{error}</p>}
        <label>
          Contraseña actual
          <input
            type="password"
            value={actual}
            onChange={e => setActual(e.target.value)}
            required
          />
        </label>
        <label>
          Nueva contraseña
          <input
            type="password"
            value={nueva}
            onChange={e => setNueva(e.target.value)}
            required
          />
        </label>
        <button type="submit">Actualizar contraseña</button>
      </form>
    </div>
  );

  return renderPerfil();
};

export default Perfil;