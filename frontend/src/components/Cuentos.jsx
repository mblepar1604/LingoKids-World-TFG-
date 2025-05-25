import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/index.css';
import './styles/cuentos.css';
import './styles/Navbar.css';

const Cuentos = () => {
  const [cuentos, setCuentos] = useState([]);
  const [filtros, setFiltros] = useState({ idioma: '', categoria: '', personalizable: '' });
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cuentoActivo, setCuentoActivo] = useState(null);
  const [escenaActual, setEscenaActual] = useState(null);

  const { user, logout } = useContext(AuthContext);

  const linksNino = [
    ['/', 'Home'],
    ['/cuentos', 'Cuentos'],
    ['/juegos', 'Juegos'],
    ['/progreso', 'Progreso'],
    ['/avatar', 'Avatar']
  ];

  const linksPadre = [
    ['/', 'Home'],
    ['/children', 'Añadir hijo'],
    ['/configuracion', 'Configuración'],
    ['/perfil', 'Perfil']
  ];

  const navLinks = user?.es_padre ? linksPadre : linksNino;

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

  const abrirModal = (cuento) => {
    setCuentoActivo(cuento);
    const primeraEscena = cuento.contenido.escenas?.[0] || null;
    setEscenaActual(primeraEscena);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setCuentoActivo(null);
    setEscenaActual(null);
  };

  const avanzarEscena = (idSiguiente) => {
    const siguiente = cuentoActivo.contenido.escenas.find(e => e.id === idSiguiente);
    setEscenaActual(siguiente || null);
  };

  return (
    <div className="dashboard-bg">
      <div className="background-wrap" style={{ backgroundImage: "url('/img/fondo-cuentos.png')" }}>
        <nav className="navbar">
          {navLinks.map(([to, label]) => (
            <NavLink key={to} to={to} className="nav-link">{label}</NavLink>
          ))}
          <button className="logout-btn" onClick={logout}>Salir</button>
        </nav>
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

           <select onChange={(e) => setFiltros(prev => ({ ...prev,categoria: e.target.value }))}>
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
};

export default Cuentos;
