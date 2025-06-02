import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './styles/progresoLogros.css';
import { AuthContext } from '../contexts/AuthContext';

/**
 * ResumenGeneral: muestra tiempo total, tiempo en juegos y tiempo en cuentos.
 */
function ResumenGeneral({ tiempoTotal, tiempoJuegos, tiempoCuentos, pctJuegos, pctCuentos, formatTiempo }) {
  return (
    
    <section className="resumen-general">
      <div className="tarjeta-general">
        <h3>Tiempo Total en la App</h3>
        <p className="tiempo-total">{formatTiempo(tiempoTotal)}</p>
      </div>
      <div className="tarjeta-sub">
        <h4>Tiempo en Juegos</h4>
        <p>{formatTiempo(tiempoJuegos)} ({pctJuegos}%)</p>
      </div>
      <div className="tarjeta-sub">
        <h4>Tiempo en Cuentos</h4>
        <p>{formatTiempo(tiempoCuentos)} ({pctCuentos}%)</p>
      </div>
    </section>
  );
}

/**
 * DetalleJuegos: muestra tabla con cada progreso de juego.
 */
function DetalleJuegos({ progresosJuegos, juegosMap, formatTiempo }) {
  // Mapeo de traducción para las estadísticas
  const traduccionEstadisticas = {
    // Matching Game
    'total_pairs': 'Total de Parejas',
    'pairs_found': 'Parejas Encontradas',
    'failed_attempts': 'Intentos Fallidos',
    'time_seconds': 'Tiempo (segundos)',
    
    // Memory Game
    'matches_found': 'Coincidencias Encontradas',
    
    // Puzzle Game
    'completado': 'Completado',
    'movimientos': 'Movimientos',
    'tiempo_resolucion': 'Tiempo de Resolución',
    
    // Simon Game
    'max_round': 'Ronda Máxima',
    'secuencia_maxima': 'Secuencia Máxima',
    'tiempo_reaccion': 'Tiempo de Reacción',
    
    // Snake Game
    'apple_count': 'Manzanas Recolectadas',
    'snake_length': 'Longitud de la Serpiente',
    'colisiones': 'Colisiones',
    'lives_left': 'Vidas Restantes',
    
    // Whack a Mole
    'score': 'Puntuación',
    'moles_hit': 'Topos Golpeados',
    'missed_hits': 'Golpes Fallidos',
    'accuracy': 'Precisión',
    
    // Estadísticas generales
    'tiempo_jugado': 'Tiempo Jugado',
    'nivel': 'Nivel',
    'intentos': 'Intentos',
    'aciertos': 'Aciertos',
    'errores': 'Errores',
    'velocidad': 'Velocidad',
    'precision': 'Precisión',
    'puntuacion': 'Puntuación',
    'completado': 'Completado',
    'tiempo_total': 'Tiempo Total',
    'mejor_tiempo': 'Mejor Tiempo',
    'partidas_jugadas': 'Partidas Jugadas',
    'victorias': 'Victorias',
    'derrotas': 'Derrotas'
  };

  // Función para formatear valores según su tipo
  const formatearValor = (clave, valor) => {
    if (typeof valor === 'boolean') {
      return valor ? '✅' : '❌';
    }
    if (clave.includes('tiempo') || clave.includes('time')) {
      return formatTiempo(valor);
    }
    if (clave.includes('precision') || clave.includes('accuracy')) {
      return `${valor}%`;
    }
    return valor;
  };

  return (
    <section className="detalle-juegos">
      <h3>Progreso por Juego</h3>
      {progresosJuegos.length === 0 ? (
        <p>No hay registros de juego todavía.</p>
      ) : (
        <div className="progreso-grid">
          {progresosJuegos.map(pj => (
            <div key={pj.id} className="progreso-card">
              <h4>{juegosMap[pj.juego]?.titulo || pj.juego}</h4>
              <div className="progreso-info">
                <p>
                  <strong>Tiempo Jugado:</strong>
                  <span>{formatTiempo(pj.tiempo_jugado)}</span>
                </p>
                <p>
                  <strong>Última Actualización:</strong>
                  <span>{new Date(pj.actualizado).toLocaleString()}</span>
                </p>
                {pj.estadisticas && Object.keys(pj.estadisticas).length > 0 && (
                  <div>
                    <strong>Estadísticas:</strong>
                    <ul className="lista-estadisticas">
                      {Object.entries(pj.estadisticas).map(([clave, valor]) => (
                        <li key={clave}>
                          <strong>{traduccionEstadisticas[clave] || clave.replace(/_/g, ' ')}</strong>
                          <span>{formatearValor(clave, valor)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/**
 * DetalleCuentos: muestra tabla con cada progreso de cuento.
 */
function DetalleCuentos({ progresosCuentos, cuentosMap, formatTiempo }) {
  return (
    <section className="detalle-cuentos">
      <h3>Progreso por Cuento</h3>
      {progresosCuentos.length === 0 ? (
        <p>No hay registros de lectura todavía.</p>
      ) : (
        <div className="progreso-grid">
          {progresosCuentos.map(pc => {
            const cuentoInfo = cuentosMap[pc.cuento] || {};
            return (
              <div key={pc.id} className="progreso-card">
                <h4>{cuentoInfo.titulo || 'Cuento sin título'}</h4>
                <div className="progreso-info">
                  <p>
                    <strong>Tiempo Leído:</strong>
                    <span>{formatTiempo(pc.tiempo_leido || 0)}</span>
                  </p>
                  <p>
                    <strong>Estado:</strong>
                    <span className={`estado-badge ${pc.completado ? 'estado-completado' : 'estado-pendiente'}`}>
                      {pc.completado ? 'Completado' : 'En progreso'}
                    </span>
                  </p>
                  {cuentoInfo.categoria && (
                    <p>
                      <strong>Categoría:</strong>
                      <span>{cuentoInfo.categoria}</span>
                    </p>
                  )}
                  <p>
                    <strong>Última Actualización:</strong>
                    <span>{new Date(pc.actualizado).toLocaleString()}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

/**
 * ProgresoYLogros: componente principal que agrupa progreso y logros.
 *
 * Props:
 *  - perfilId (number): ID del PerfilInfantil del niño.
 */
const ProgresoYLogros = ({ perfilId }) => {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para progreso
  const [progresosJuegos, setProgresosJuegos] = useState([]);
  const [progresosCuentos, setProgresosCuentos] = useState([]);
  const [juegosMap, setJuegosMap] = useState({});   // { juegoId: { titulo, ... } }
  const [cuentosMap, setCuentosMap] = useState({}); // { cuentoId: { titulo, ... } }

  // Estados para logros
  const [logrosDesbloqueados, setLogrosDesbloqueados] = useState([]);
  const [todosLogrosActivos, setTodosLogrosActivos] = useState([]);

  // Helper: convierte segundos a "HH:mm:ss"
  const formatTiempo = (segundos) => {
    const hrs = Math.floor(segundos / 3600);
    const mins = Math.floor((segundos % 3600) / 60);
    const secs = segundos % 60;
    return [
      hrs.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };

  /**
   * Dada la lista de ProgresoJuego (por juego), devuelve un objeto:
   *   { juegoId: { tiempo_jugado, estadisticas, actualizado } }
   */
  const mapProgresoJuegoPorId = (listaProgs) => {
    const obj = {};
    listaProgs.forEach(pj => {
      obj[pj.juego] = pj;
    });
    return obj;
  };

  /**
   * Dada la lista de ProgresoCuento (por cuento), devuelve un objeto:
   *   { cuentoId: { tiempo_leido, completado, actualizado } }
   */
  const mapProgresoCuentoPorId = (listaProgs) => {
    const obj = {};
    listaProgs.forEach(pc => {
      obj[pc.cuento] = pc;
    });
    return obj;
  };

  useEffect(() => {
    const fetchDatos = async () => {
      setLoading(true);
      setError(null);

      try {
        // --- 1) Configurar encabezado Authorization
        const token = localStorage.getItem('access_token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        // --- 2) Obtener lista de juegos (para mapear ID→título)
        const [resJuegos] = await Promise.all([ axios.get('/api/juegos/') ]);
        const mapaJ = {};
        resJuegos.data.forEach(j => {
          mapaJ[j.id] = {
            titulo: j.titulo,
            tipo_nombre: j.tipo_nombre || null
          };
        });
        setJuegosMap(mapaJ);

        // --- 3) Obtener lista de cuentos (para mapear ID→título)
        const [resCuentos] = await Promise.all([ axios.get('/api/cuentos/') ]);
        const mapaC = {};
        resCuentos.data.forEach(c => {
          mapaC[c.id] = {
            titulo: c.titulo || 'Sin título',
            categoria: c.categoria || null,
            idioma: c.idioma || null,
            personalizable: c.personalizable || false
          };
        });
        setCuentosMap(mapaC);

        // --- 4) Obtener Progresos de Juegos
        const resProgJ = await axios.get(
          `/api/progreso/juegos/?perfil_infantil=${perfilId}`
        );
        setProgresosJuegos(resProgJ.data);
        const pjMap = mapProgresoJuegoPorId(resProgJ.data);

        // --- 5) Obtener Progresos de Cuentos
        const resProgC = await axios.get(
          `/api/progreso/cuentos/?perfil_infantil=${perfilId}`
        );
        // Asegurarnos de que los datos tienen el formato correcto
        const progresosCuentosFormateados = resProgC.data.map(pc => ({
          ...pc,
          tiempo_leido: pc.tiempo_leido || 0,
          completado: pc.completado || false,
          actualizado: pc.actualizado || new Date().toISOString()
        }));
        setProgresosCuentos(progresosCuentosFormateados);
        const pcMap = mapProgresoCuentoPorId(progresosCuentosFormateados);

        // --- 6) Obtener logros DESBLOQUEADOS de la app "logros"
        const resLogrosDesc = await axios.get(
          `/api/logros/perfil/?perfil_infantil=${perfilId}`
        );
        const listaDescAplanada = resLogrosDesc.data
          .map(item => {
            if (!item.logro) return null;
            return {
              id: item.logro.id,
              codigo: item.logro.codigo,
              titulo: item.logro.titulo,
              descripcion: item.logro.descripcion,
              juego_id: item.logro.juego_id,
              cuento_id: item.logro.cuento_id,
              umbral: item.logro.umbral,
              activo: item.logro.activo,
              fecha_creacion: item.logro.fecha_creacion,
              fecha_desbloqueado: item.fecha_desbloqueado
            };
          })
          .filter(x => x !== null);
        setLogrosDesbloqueados(listaDescAplanada);

        // --- 7) Obtener TODOS los logros ACTIVOS (para "Todos los Logros")
        const resTodosLogros = await axios.get('/api/logros/');
        const enriquecido = resTodosLogros.data.map(logro => {
          const { id, codigo, titulo, descripcion, juego_id, cuento_id, umbral } = logro;
          let valorActual = 0;
          let cumplido = false;

          if (juego_id !== null) {
            // Logro de juego → miramos estadísticas guardadas en pjMap[juego_id]
            const pj = pjMap[juego_id];
            if (pj) {
              const estad = pj.estadisticas || {};
              switch (juego_id) {
                case 1: // MatchingGame → "pairs_found"
                  valorActual = typeof estad.pairs_found === 'number' ? estad.pairs_found : 0;
                  break;
                case 2: // MemoryGame → "matches_found"
                  valorActual = typeof estad.matches_found === 'number' ? estad.matches_found : 0;
                  break;
                case 3: // PuzzleGame → "completado" boolean (umbral=1)
                  valorActual = estad.completado === true ? 1 : 0;
                  break;
                case 4: // SimonGame → "max_round"
                  valorActual = typeof estad.max_round === 'number' ? estad.max_round : 0;
                  break;
                case 5: // SnakeGame → "apple_count"
                  valorActual = typeof estad.apple_count === 'number' ? estad.apple_count : 0;
                  break;
                case 6: // WhackAMole → "score"
                  valorActual = typeof estad.score === 'number' ? estad.score : 0;
                  break;
                default:
                  valorActual = 0;
              }
            } else {
              valorActual = 0;
            }
            cumplido = umbral > 0 ? valorActual >= umbral : (valorActual === 1);
          }
          else if (cuento_id !== null) {
            // Logro de cuento → miramos progreso en pcMap[cuento_id]
            const pc = pcMap[cuento_id];
            if (pc) {
              if (umbral > 0) {
                valorActual = typeof pc.tiempo_leido === 'number' ? pc.tiempo_leido : 0;
                cumplido = valorActual >= umbral;
              } else {
                // umbral == 0 → criterio sólo completado
                valorActual = pc.completado ? 1 : 0;
                cumplido = pc.completado === true;
              }
            } else {
              valorActual = 0;
              cumplido = false;
            }
          } else {
            // Logro genérico (sin juego ni cuento)
            valorActual = 0;
            cumplido = false;
          }

          let porcentaje = 0;
          if (umbral > 0) {
            porcentaje = Math.floor((valorActual / umbral) * 100);
            if (porcentaje > 100) porcentaje = 100;
            if (porcentaje < 0) porcentaje = 0;
          } else {
            porcentaje = cumplido ? 100 : 0;
          }

          return {
            id,
            codigo,
            titulo,
            descripcion,
            juego_id,
            cuento_id,
            umbral,
            valorActual,
            porcentaje,
            cumplido
          };
        });

        setTodosLogrosActivos(enriquecido);

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error al cargar datos de progreso o logros.');
        setLoading(false);
      }
    };

    fetchDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfilId]);

  // ➤ 1) Calculamos "tiempo en juegos" sumando todos los `tiempo_jugado`
  const tiempoJuegosSumados = progresosJuegos.reduce(
    (acc, pj) => acc + (pj.tiempo_jugado || 0),
    0
  );

  // ➤ 2) Calculamos "tiempo en cuentos" sumando todos los `tiempo_leido`
  const tiempoCuentosSumados = progresosCuentos.reduce(
    (acc, pc) => acc + (pc.tiempo_leido || 0),
    0
  );

  // ➤ 3) Tiempo total = suma de ambos
  const tiempoTotalSumado = tiempoJuegosSumados + tiempoCuentosSumados;

  // ➤ 4) Calculamos porcentajes para la tarjeta resumen
  const pctJuegos = tiempoTotalSumado > 0
    ? Math.round((tiempoJuegosSumados / tiempoTotalSumado) * 100)
    : 0;
  const pctCuentos = tiempoTotalSumado > 0
    ? Math.round((tiempoCuentosSumados / tiempoTotalSumado) * 100)
    : 0;

  // ➤ 5) Filtramos los logros que NO estén cumplidos todavía
  const logrosSinDesbloquear = todosLogrosActivos.filter(logro => !logro.cumplido);

  // --- Renderizado principal
  const renderProgreso = () => (
    <div className="progreso-container">
      {/* Fondo superior con curva y título */}
      <div
        className="background-wrap"
        style={{ backgroundImage: "url('/img/fondo-progreso.png')" }}
      >
        <h2 className="dashboard-title">Progreso de Aprendizaje</h2>
      </div>
  
      {/* ● ResumenGeneral */}
      <ResumenGeneral
        tiempoTotal={tiempoTotalSumado}
        tiempoJuegos={tiempoJuegosSumados}
        tiempoCuentos={tiempoCuentosSumados}
        pctJuegos={pctJuegos}
        pctCuentos={pctCuentos}
        formatTiempo={formatTiempo}
      />
  
      {/* ● Detalle de Juegos */}
      <DetalleJuegos
        progresosJuegos={progresosJuegos}
        juegosMap={juegosMap}
        formatTiempo={formatTiempo}
      />
  
      {/* ● Detalle de Cuentos */}
      <DetalleCuentos
        progresosCuentos={progresosCuentos}
        cuentosMap={cuentosMap}
        formatTiempo={formatTiempo}
      />
  
      {/* ● Logros Desbloqueados */}
      <section className="seccion-logros">
        <h3 className="seccion-logros__titulo">Logros Desbloqueados</h3>
        {logrosDesbloqueados.length === 0 ? (
          <p className="seccion-logros__sin-logros">
            Aún no has desbloqueado logros. ¡Sigue aprendiendo y jugando!
          </p>
        ) : (
          <div className="seccion-logros__grid">
            {logrosDesbloqueados.map((logro) => (
              <div key={logro.id} className="logro-card desbloqueado">
                <h4 className="logro-card__titulo">{logro.titulo}</h4>
                <p className="logro-card__descripcion">{logro.descripcion}</p>
                <small className="logro-card__fecha">
                  Desbloqueado: {new Date(logro.fecha_desbloqueado).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </section>
  
      {/* ● Todos los Logros */}
      <div className="todos-logros">
        <h3>Todos los Logros (Progreso)</h3>
        <div className="grid-logros">
          {logrosSinDesbloquear.map((logro) => (
            <div key={logro.id} className="logro-card">
              <div className="logro-titulo-small">{logro.titulo}</div>
              {logro.umbral === 0 && logro.cumplido ? (
                <div className="barra-exterior">
                  <div className="barra-interior" style={{ width: '100%' }} />
                  <div className="barra-texto">✅ Completado</div>
                </div>
              ) : logro.umbral === 0 && !logro.cumplido ? (
                <div className="barra-exterior">
                  <div className="barra-interior" style={{ width: '0%' }} />
                  <div className="barra-texto">0 / 1</div>
                </div>
              ) : (
                <div className="barra-exterior">
                  <div
                    className="barra-interior"
                    style={{ width: `${logro.porcentaje}%` }}
                  />
                  <div className="barra-texto">
                    {logro.valorActual} / {logro.umbral}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
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
  

  if (loading) {
    return <div className="progreso-container">Cargando progreso...</div>;
  }
  if (error) {
    return <div className="progreso-container error">{error}</div>;
  }

  return renderProgreso();
};

export default ProgresoYLogros;