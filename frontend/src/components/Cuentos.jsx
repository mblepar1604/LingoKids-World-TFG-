import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/index.css';
import './styles/cuentos.css';

const Cuentos = () => {
  const [cuentos, setCuentos] = useState([]);
  const [filtros, setFiltros] = useState({ idioma: '', categoria: '', personalizable: '' });
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cuentoActivo, setCuentoActivo] = useState(null);
  const [escenaActual, setEscenaActual] = useState(null);
  const [tiempoInicio, setTiempoInicio] = useState(null);
  const [tiempoAcumulado, setTiempoAcumulado] = useState(0);

  const { user, logout } = useContext(AuthContext);

  // Función para actualizar el progreso del cuento
  const actualizarProgresoCuento = async (completado = false) => {
    if (!cuentoActivo || !user?.perfilInfantilId) {
      console.log('No se puede actualizar: cuentoActivo o perfilInfantilId no disponibles');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.log('No hay token disponible');
        return;
      }

      const tiempoActual = Math.floor((Date.now() - tiempoInicio) / 1000) + tiempoAcumulado;
      console.log('Actualizando progreso:', {
        perfil: user.perfilInfantilId,
        cuento: cuentoActivo.id,
        tiempo: tiempoActual,
        completado
      });
      
      const response = await axios.post('http://localhost:8000/api/progreso/cuentos/', {
        perfil_infantil: user.perfilInfantilId,
        cuento: cuentoActivo.id,
        tiempo_leido: tiempoActual,
        completado: completado
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al actualizar progreso:', error.response?.data || error.message);
    }
  };

  // Efecto para actualizar el tiempo cada minuto
  useEffect(() => {
    let intervalId;
    
    if (modalVisible && tiempoInicio) {
      intervalId = setInterval(() => {
        actualizarProgresoCuento();
      }, 60000); // Actualizar cada minuto
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [modalVisible, tiempoInicio]);

  useEffect(() => {
    const fetchCuentos = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const res = await axios.get('/api/cuentos/');
        setCuentos(res.data);
        const categorias = res.data.map(c => c.categoria).filter(Boolean);
          const unicas = [...new Set(categorias)];
          setCategoriasUnicas(unicas);
      } catch (err) {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) {
          localStorage.clear();
          window.location.href = '/login';
          return;
        }

        try {
          const response = await axios.post('/api/token/refresh/', { refresh });
          const newAccess = response.data.access;
          localStorage.setItem('access_token', newAccess);
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;

          const retry = await axios.get('http://localhost:8000/api/cuentos/');
          setCuentos(retry.data);
        } catch {
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    };

    fetchCuentos();
  }, []);

  const aplicarFiltros = () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const queryParams = new URLSearchParams();
    if (filtros.idioma) queryParams.append('idioma', filtros.idioma);
    if (filtros.categoria) queryParams.append('categoria', filtros.categoria);
    if (filtros.personalizable !== '') queryParams.append('personalizable', filtros.personalizable);

    axios.get(`http://localhost:8000/api/cuentos/?${queryParams.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCuentos(res.data))
      .catch(err => console.error('Error al aplicar filtros:', err));
  };

  const abrirModal = async (cuento) => {
    setCuentoActivo(cuento);
    const primeraEscena = cuento.contenido.escenas?.[0] || null;
    setEscenaActual(primeraEscena);
    setModalVisible(true);
    setTiempoInicio(Date.now());
    setTiempoAcumulado(0);

    // Recuperar tiempo acumulado si existe
    try {
      const token = localStorage.getItem('access_token');
      if (token && user?.perfilInfantilId) {
        const response = await axios.get(
          `/api/progreso/cuentos/?perfil_infantil=${user.perfilInfantilId}&cuento=${cuento.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.length > 0) {
          setTiempoAcumulado(response.data[0].tiempo_leido || 0);
        }
      }
    } catch (error) {
      console.error('Error al recuperar progreso:', error);
    }
  };

  const cerrarModal = async () => {
    if (tiempoInicio) {
      await actualizarProgresoCuento();
    }
    setModalVisible(false);
    setCuentoActivo(null);
    setEscenaActual(null);
    setTiempoInicio(null);
  };

  const avanzarEscena = async (idSiguiente) => {
    const siguiente = cuentoActivo.contenido.escenas.find(e => e.id === idSiguiente);
    
    // Si no hay siguiente escena, es el final del cuento
    if (!siguiente) {
      console.log('Final del cuento detectado, marcando como completado');
      await actualizarProgresoCuento(true); // Marcar como completado
    }
    
    setEscenaActual(siguiente || null);
  };

  // HTML extraído a función aparte
  const renderCuentos = () => (
    <div className="dashboard-bg">
      <div className="background-wrap" style={{ backgroundImage: "url('/img/fondo-cuentos.png')" }}>
        <h1 className="dashboard-title">Explora Nuestros Cuentos</h1>
      </div>

      <div className="menu-section">
        <div className="filtros-contenedor">
          <div className="filtros">
            <select onChange={(e) => setFiltros(prev => ({ ...prev, idioma: e.target.value }))}>
              <option value="">Todos los idiomas</option>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>

            <select onChange={(e) => setFiltros(prev => ({ ...prev, categoria: e.target.value }))}>
              <option value="">Todas las categorías</option>
              {categoriasUnicas.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>

            <select onChange={(e) => setFiltros(prev => ({ ...prev, personalizable: e.target.value }))}>
              <option value="">Todos</option>
              <option value="true">Personalizables</option>
              <option value="false">No personalizables</option>
            </select>

            <button onClick={aplicarFiltros}>Aplicar filtros</button>
          </div>
        </div>

        <div className="cuentos-grid">
          {cuentos.map(c => (
            <div
              key={c.id}
              className="cuento-card"
              style={{ backgroundImage: `url(${c.imagen || '/img/avatar.png'})` }}
              onClick={() => abrirModal(c)}
            >
              <div className="overlay">
                <h2 className="cuento-titulo">{c.titulo}</h2>
                <p className="cuento-categoria">{c.categoria}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalVisible && escenaActual && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="cerrar-modal" onClick={cerrarModal}>✖</button>
            <h2 className="modal-titulo">{cuentoActivo.titulo}</h2>

            <div className="modal-contenido">
              <p className="escena-texto">{escenaActual.texto}</p>
              <div className="modal-opciones">
                {escenaActual.opciones && escenaActual.opciones.length > 0 ? (
                  escenaActual.opciones.map((op, index) => (
                    <button
                      key={index}
                      className="modal-opcion-btn"
                      onClick={() => avanzarEscena(op.siguiente)}
                    >
                      {op.texto}
                    </button>
                  ))
                ) : (
                  <p className="fin-cuento">🎉 Fin del cuento</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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

  return renderCuentos();
};

export default Cuentos;