import React, { useState, useEffect, useRef } from 'react';
import '../styles/games/SimonGame.css';

const sonidos = [
  { id: 0, color: '#f44336', audio: '/sounds/rojo.mp3' },
  { id: 1, color: '#2196f3', audio: '/sounds/azul.mp3' },
  { id: 2, color: '#4caf50', audio: '/sounds/verde.mp3' },
  { id: 3, color: '#ffeb3b', audio: '/sounds/amarillo.mp3' }
];

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
        >{sonido.id + 1}</button>
      ))}
    </div>
  </div>
);

const SimonGame = () => {
  const [sequence, setSequence] = useState([]);
  const [playerSeq, setPlayerSeq] = useState([]);
  const [ronda, setRonda] = useState(0);
  const [blocked, setBlocked] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [popup, setPopup] = useState(false);

  const audioRef = useRef(null);
  const initialized = useRef(false);
  const animating = useRef(false);
  const timeouts = useRef([]);

  const clearAllTimeouts = () => {
    timeouts.current.forEach(id => clearTimeout(id));
    timeouts.current = [];
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  const resetAll = () => {
    // Stop ongoing animation
    animating.current = false;
    setBlocked(true);
    stopAudio();
    clearAllTimeouts();
    // Reset state
    setPlaybackRate(1);
    setRonda(1);
    setPlayerSeq([]);
    setSequence([]);
    initialized.current = false;
  };

  const delay = ms => new Promise(res => {
    const id = setTimeout(res, ms);
    timeouts.current.push(id);
  });

  // Reproducir sonido y evitar solapamientos
  const reproducirSonido = id => new Promise(resolve => {
    stopAudio();
    const audio = new Audio(sonidos[id].audio);
    audio.playbackRate = playbackRate;
    audioRef.current = audio;
    let ended = false;
    audio.onended = () => { if (!ended) { ended = true; audioRef.current = null; resolve(); } };
    audio.oncanplaythrough = () => audio.play().catch(() => { if (!ended) { ended = true; audioRef.current = null; resolve(); } });
    const tid = setTimeout(() => { if (!ended) { ended = true; audio.pause(); audioRef.current = null; resolve(); } }, 3000);
    timeouts.current.push(tid);
  });

  // Animación secuencial
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

  // Iniciar ronda
  const startRound = async (isFirst = false) => {
    resetAll();
    // Delay reset before starting
    const initialDelay = 1000;
    await delay(initialDelay);
    if (animating.current) return;
    if (isFirst) {
      setPlaybackRate(1);
      setRonda(1);
      const first = Math.floor(Math.random() * sonidos.length);
      const newSeq = [first];
      setSequence(newSeq);
      await animateSequence(newSeq);
    } else {
      setPlaybackRate(prev => prev + 0.1);
      setRonda(prev => prev + 1);
      const next = Math.floor(Math.random() * sonidos.length);
      const newSeq = [...sequence, next];
      setSequence(newSeq);
      await animateSequence(newSeq);
    }
    initialized.current = true;
  };

  // Manejo de visibilidad y montaje
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        // Salir de la página
        animating.current = false;
        resetAll();
      } else {
        // Volver a la página
        startRound(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    // Al montar
    startRound(true);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      resetAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        animating.current = false;
        setPopup(true);
        return;
      }
    }
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