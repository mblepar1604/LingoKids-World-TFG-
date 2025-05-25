import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './styles/Avatar.css';

const AvatarPage = () => {
  const { user } = useContext(AuthContext);
  const perfilId = user?.perfil_id || user?.perfilInfantil?.id;

  const [avatar, setAvatar] = useState(null);
  const [componentes, setComponentes] = useState({ pelo: [], ojos: [], ropa: [], accesorio: [] });
  const [seleccion, setSeleccion] = useState({ pelo: null, ojos: null, ropa: null, accesorio: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!perfilId) return;

    const token = localStorage.getItem('access_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Cargar avatar actual
    axios.get(`/api/avatar/mi-avatar/${perfilId}/`)
      .then(res => {
        setAvatar(res.data);
        setSeleccion({
          pelo: res.data.pelo?.id || null,
          ojos: res.data.ojos?.id || null,
          ropa: res.data.ropa?.id || null,
          accesorio: res.data.accesorio?.id || null,
        });
      });

    // Cargar componentes por tipo
    const tipos = ['pelo', 'ojos', 'ropa', 'accesorio'];
    Promise.all(
      tipos.map(tipo =>
        axios.get(`/api/avatar/componentes/${tipo}/${perfilId}/`)
          .then(res => ({ tipo, data: res.data }))
      )
    ).then(results => {
      const nuevosComponentes = {};
      results.forEach(({ tipo, data }) => {
        nuevosComponentes[tipo] = data;
      });
      setComponentes(nuevosComponentes);
      setLoading(false);
    });
  }, [perfilId]);

  const handleGuardar = () => {
    if (!perfilId) return;

    axios.post(`/api/avatar/actualizar/${perfilId}/`, seleccion)
      .then(res => {
        alert('✅ Avatar actualizado correctamente');
        setAvatar(res.data);
      })
      .catch(() => {
        alert('❌ Error al guardar avatar');
      });
  };

  const renderOpciones = (tipo) => (
    <div className="avatar-opciones">
      {componentes[tipo].map(comp => (
        <img
          key={comp.id}
          src={comp.imagen}
          className={`componente-img ${seleccion[tipo] === comp.id ? 'seleccionado' : ''}`}
          onClick={() => setSeleccion(prev => ({ ...prev, [tipo]: comp.id }))}
          alt={comp.nombre}
        />
      ))}
    </div>
  );

  if (loading) return <div className="avatar-container"><p>Cargando avatar...</p></div>;

  return (
    <div className="avatar-container">
      <h1 className="avatar-title">🎨 Personaliza tu Avatar</h1>

      {avatar?.vista_previa && (
        <img src={avatar.vista_previa} alt="Avatar actual" className="avatar-preview" />
      )}

      {['pelo', 'ojos', 'ropa', 'accesorio'].map(tipo => (
        <div key={tipo} className="avatar-bloque">
          <h2>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
          {renderOpciones(tipo)}
        </div>
      ))}

      <button className="guardar-btn" onClick={handleGuardar}>💾 Guardar cambios</button>
    </div>
  );
};

export default AvatarPage;
