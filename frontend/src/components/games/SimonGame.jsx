import React, { useState, useEffect, useRef } from 'react';
import '../styles/games/SimonGame.css';
import axios from 'axios';

const sonidos = [
  { id: 0, color: '#f44336', audio: '/sounds/rojo.mp3' },
  { id: 1, color: '#2196f3', audio: '/sounds/azul.mp3' },
  { id: 2, color: '#4caf50', audio: '/sounds/verde.mp3' },
  { id: 3, color: '#ffeb3b', audio: '/sounds/amarillo.mp3' }
];

/**
 * Popup: Mensaje cuando el jugador falla.
 */
const Popup = ({ open, onClose, message }) => {
  if (!open) return null;
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

/**
 * SecuenciaSonidosHTML: Muestra los botones de cada color/sonido.
 */
const SecuenciaSonidosHTML = ({ ronda, sonidos, handleClick, animating }) => (
  <div className="secuencia-container">
    <h1 className="secuencia-title">Secuencia de Sonidos</h1>
    <p className="secuencia-sub">Ronda: {ronda}</p>
    <div className="secuencia-botones">
      {sonidos.map(sonido => (
        <button
          key={sonido.id}
          id={`boton-${sonido.id}`}
          className={`boton-sonido${animating ? ' apagado' : ''}`}
          style={{ backgroundColor: sonido.color }}
          onClick={() => handleClick(sonido.id)}
        >
          {sonido.id + 1}
        </button>
      ))}
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

/**
 * SimonGame: Lógica principal del juego "Simon dice".
 *
 * Props esperadas:
 *   - perfilId: id de PerfilInfantil para enviar progreso.
 *   - juegoId: id de Juego correspondiente.
 */
const SimonGame = ({ perfilId, juegoId }) => {
  const [sequence, setSequence] = useState([]);
  const [playerSeq, setPlayerSeq] = useState([]);
  const [ronda, setRonda] = useState(0);
  const [blocked, setBlocked] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [popup, setPopup] = useState(false);

  // Refs para controlar animación/tiempo
  const audioRef = useRef(null);
  const initialized = useRef(false);
  const animating = useRef(false);
  const timeouts = useRef([]);
  const startTimeRef = useRef(null);
  const bestRoundRef = useRef(0);
  const hasSentProgressRef = useRef(false);

  // Limpiar timeouts
  const clearAllTimeouts = () => {
    timeouts.current.forEach(id => clearTimeout(id));
    timeouts.current = [];
  };

  // Detener audio activo
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  // Resetea estado para una ronda nueva
  const resetAll = () => {
    animating.current = false;
    setBlocked(true);
    stopAudio();
    clearAllTimeouts();
    setPlaybackRate(1);
    setRonda(1);
    setPlayerSeq([]);
    setSequence([]);
    initialized.current = false;
    hasSentProgressRef.current = false;
    bestRoundRef.current = 0;
    startTimeRef.current = Date.now();
  };

  // Delay con promise
  const delay = ms =>
    new Promise(res => {
      const id = setTimeout(res, ms);
      timeouts.current.push(id);
    });

  // Reproduce un sonido y espera a que termine o 3s
  const reproducirSonido = id =>
    new Promise(resolve => {
      stopAudio();
      const audio = new Audio(sonidos[id].audio);
      audio.playbackRate = playbackRate;
      audioRef.current = audio;
      let ended = false;
      audio.onended = () => {
        if (!ended) {
          ended = true;
          audioRef.current = null;
          resolve();
        }
      };
      audio.oncanplaythrough = () =>
        audio.play().catch(() => {
          if (!ended) {
            ended = true;
            audioRef.current = null;
            resolve();
          }
        });
      const tid = setTimeout(() => {
        if (!ended) {
          ended = true;
          audio.pause();
          audioRef.current = null;
          resolve();
        }
      }, 3000);
      timeouts.current.push(tid);
    });

  // Reproduce la secuencia en pantalla
  const animateSequence = async seq => {
    animating.current = true;
    setBlocked(true);
    stopAudio();
    clearAllTimeouts();
    await delay(500);
    for (const id of seq) {
      if (!animating.current) break;
      await reproducirSonido(id);
      await delay(300);
    }
    setBlocked(false);
    animating.current = false;
  };

  // Inicia o continúa la ronda
  const startRound = async (isFirst = false) => {
    if (isFirst) {
      resetAll();
      // Le damos 1s antes de empezar la primera ronda
      await delay(1000);
      if (!animating.current) {
        setPlaybackRate(1);
        setRonda(1);
        const first = Math.floor(Math.random() * sonidos.length);
        const newSeq = [first];
        setSequence(newSeq);
        await animateSequence(newSeq);
        initialized.current = true;
      }
    } else {
      if (!initialized.current) return;
      setPlaybackRate(prev => prev + 0.1);
      setRonda(prev => prev + 1);
      // Registramos "mejor ronda alcanzada" antes de subir ronda
      bestRoundRef.current = ronda;
      const next = Math.floor(Math.random() * sonidos.length);
      const newSeq = [...sequence, next];
      setSequence(newSeq);
      await animateSequence(newSeq);
    }
  };

  // Maneja cambio de visibilidad de pestaña
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        // Cuando cambian de pestaña, cancelamos toda la animación
        animating.current = false;
        resetAll();
      } else {
        // Al volver, empezamos la primera ronda
        startRound(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    // Al montar por primera vez
    startRound(true);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      resetAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manejo de clics del usuario en botones
  const handleClick = id => {
    if (blocked || animating.current) return;
    const btn = document.getElementById(`boton-${id}`);
    if (btn) {
      btn.classList.add('activo');
      setTimeout(() => btn.classList.remove('activo'), 200);
    }
    const nextPlayer = [...playerSeq, id];
    setPlayerSeq(nextPlayer);
    for (let i = 0; i < nextPlayer.length; i++) {
      if (nextPlayer[i] !== sequence[i]) {
        // El jugador falló en la ronda actual
        animating.current = false;
        setPopup(true);

        // Calcular "mejor ronda": ronda - 1
        const rondaMax = bestRoundRef.current > 0 ? bestRoundRef.current : ronda - 1;
        // Calcular tiempo en segundos desde startTimeRef
        const tiempoMs = Date.now() - startTimeRef.current;
        const tiempoSegs = Math.floor(tiempoMs / 1000);

        // Si no hemos enviado progreso todavía, lo enviamos
        if (!hasSentProgressRef.current) {
          hasSentProgressRef.current = true;
          const stats = {
            max_round: rondaMax,
            time_seconds: tiempoSegs
          };
          axios
            .post('/api/progreso/juegos/', {
              perfil_infantil: perfilId,
              juego: juegoId,
              tiempo_jugado: tiempoSegs,
              estadisticas: stats
            })
            .catch(err => {
              console.error('Error enviando progreso SimonGame:', err);
            });
        }
        return;
      }
    }
    // Si el usuario completó la secuencia correctamente
    if (nextPlayer.length === sequence.length) {
      startRound(false);
    }
  };

  const handleClosePopup = () => {
    setPopup(false);
    startRound(true);
  };

  return (
    <>
      <SecuenciaSonidosHTML
        ronda={ronda}
        sonidos={sonidos}
        handleClick={handleClick}
        animating={animating.current}
      />
      <Popup open={popup} onClose={handleClosePopup} message="¡Fallaste! Volvemos a empezar" />
    </>
  );
};

export default SimonGame;