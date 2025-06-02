import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import './styles/Avatar.css';

const AvatarPage = () => {
  const { user, loadAvatar } = useContext(AuthContext);
  const perfilId = user?.perfilInfantilId;

  const [avatar, setAvatar] = useState(null);
  const [componentes, setComponentes] = useState({ pelo: [], ojos: [], ropa: [], accesorio: [] });
  const [seleccion, setSeleccion] = useState({ pelo: null, ojos: null, ropa: null, accesorio: null });
  const [loading, setLoading] = useState(true);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    if (!perfilId) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Cargar avatar actual
    axios.get(`/api/avatar/mi-avatar/${perfilId}/`)
      .then(res => {
        setAvatar(res.data);
        setPreviewUrl(res.data.vista_previa);
        setSeleccion({
          pelo: res.data.pelo?.id || null,
          ojos: res.data.ojos?.id || null,
          ropa: res.data.ropa?.id || null,
          accesorio: res.data.accesorio?.id || null,
        });
      })
      .catch(err => {
        console.error('Error fetching avatar data:', err);
      });

    // Cargar componentes por tipo
    const tipos = ['pelo', 'ojos', 'ropa', 'accesorio'];
    Promise.all(
      tipos.map(tipo => 
        axios.get(`/api/avatar/componentes/${tipo}/${perfilId}/`)
          .then(res => ({ tipo, data: res.data }))
          .catch(() => ({ tipo, data: [] }))
      )
    )
    .then(results => {
      const nuevosComponentes = {};
      results.forEach(({ tipo, data }) => {
        nuevosComponentes[tipo] = data;
      });
      setComponentes(nuevosComponentes);
      setLoading(false);
      console.log('Loaded accessory components:', nuevosComponentes.accesorio);
    })
    .catch(() => setLoading(false));

  }, [perfilId]);

  const handleComponenteClick = async (tipo, compId) => {
    if (isUpdating) return; // Evitar múltiples actualizaciones simultáneas
    
    setIsUpdating(true);
    const newSeleccion = { ...seleccion, [tipo]: compId };
    setSeleccion(newSeleccion);
    
    try {
      // Step 1: Send POST request to update selection
      await axios.post(`/api/avatar/actualizar/${perfilId}/`, newSeleccion);

      // Step 2: Send GET request to fetch the newly generated avatar
      const getResponse = await axios.get(`/api/avatar/mi-avatar/${perfilId}/`);

      // Step 3: Update state with new preview URL and avatar data
      if (getResponse.data.vista_previa) {
        setPreviewUrl(getResponse.data.vista_previa);
        setAvatar(getResponse.data);
      }

    } catch (error) {
      console.error('Error updating or fetching avatar:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleGuardar = async () => {
    if (!perfilId) return;

    try {
      const response = await axios.post(`/api/avatar/actualizar/${perfilId}/`, seleccion);
      if (response.data.vista_previa) {
        setPreviewUrl(response.data.vista_previa);
        setAvatar(response.data);
      }
      loadAvatar(perfilId);
      setShowSaveModal(true);
      setTimeout(() => setShowSaveModal(false), 2000);
    } catch (error) {
      console.error('Error saving avatar:', error);
      setShowSaveModal(true);
      setTimeout(() => setShowSaveModal(false), 2000);
    }
  };

  const renderOpciones = (tipo) => (
    <div className="avatar-opciones">
      {componentes[tipo]
        .filter(comp => !(tipo === 'accesorio' && comp.nombre === 'cuerpoBase.png'))
        .map(comp => (
        <img
          key={comp.id}
          src={comp.imagen}
          className={`componente-img ${seleccion[tipo] === comp.id ? 'seleccionado' : ''}`}
          onClick={() => handleComponenteClick(tipo, comp.id)}
          alt={comp.nombre}
        />
      ))}
    </div>
  );

  if (loading) return <div className="avatar-container"><p>Cargando avatar...</p></div>;

  return (
    <div className="page-wrapper">
      <div
        className="background-wrap"
        style={{ backgroundImage: "url('/img/fondo-avatar.png')" }}
        >
          
        <h1 className="dashboard-title">Personaliza tu Avatar</h1>
        </div>

      <div className="avatar-container">
        <div className="avatar-main-content">
          <div className="avatar-preview-section">
            <div className="avatar-preview-container">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Avatar actual"
                  className={`avatar-preview ${isUpdating ? 'updating' : ''}`}
                />
              )}
              {isUpdating && <div className="preview-loading">Actualizando...</div>}
            </div>
          </div>

          <div className="avatar-options-section">
            {['pelo', 'ojos', 'ropa', 'accesorio'].map(tipo => (
              <div key={tipo} className="avatar-bloque">
                <h2>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
                {renderOpciones(tipo)}
              </div>
            ))}
          </div>
        </div>

        <button className="guardar-btn" onClick={handleGuardar}>💾 Guardar cambios</button>

        {showSaveModal && (
          <div className="save-modal">
            <div className="save-modal-content">
              <p>✅ Cambios guardados correctamente</p>
            </div>
          </div>
        )}
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <p className="footer-text">🌈 LingoKids World © 2025 — Aprende jugando</p>
          <div className="footer-links">
            <a href="/ayuda">❓ Ayuda</a>
            <a href="/contacto">✉️ Contacto</a>
            <a href="/privacidad">🔒 Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AvatarPage;
