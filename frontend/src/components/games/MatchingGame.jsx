import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/games/MatchingGame.css';
import { getMatchingPairs } from '../../utils/cardsData';
import PlayAgain from './PlayAgain';
import axios from 'axios';

/**
 * MatchingGameHTML: Presentación visual del juego.
 */
const MatchingGameHTML = ({
  pairs,
  shuffledImages,
  selectedWord,
  selectedImage,
  matchedIds,
  handleWordClick,
  handleImageClick,
  reiniciar,
  showPlayAgain
}) => {
  return (
    <div className="matching-container">
      <h1 className="matching-title">Matching Words</h1>

      {/* Fila de imágenes */}
      <div className="images-grid">
        {shuffledImages.map(p => (
          <div
            key={p.id}
            className={`card-item image ${
              selectedImage === p.id ? 'selected' : ''
            } ${matchedIds.includes(p.id) ? 'matched' : ''}`}
            onClick={() => handleImageClick(p.id)}
          >
            <img src={p.img} alt="" />
          </div>
        ))}
      </div>

      {/* Fila de palabras */}
      <div className="words-grid">
        {pairs.map(p => (
          <div
            key={p.id}
            className={`card-item word ${
              selectedWord === p.id ? 'selected' : ''
            } ${matchedIds.includes(p.id) ? 'matched' : ''}`}
            onClick={() => handleWordClick(p.id)}
          >
            <span>{p.word}</span>
          </div>
        ))}
      </div>

      {/* Botón volver a jugar */}
      {showPlayAgain && (
        <div className="matching-footer">
          <PlayAgain onClick={reiniciar} />
        </div>
      )}
    </div>
  );
};

/**
 * MatchingGame: Lógica principal del juego de emparejar.
 *
 * Props esperadas:
 *   - idioma: código de idioma para obtener pares (por defecto 'es').
 *   - perfilId: id de PerfilInfantil (requerido para enviar progreso).
 *   - juegoId: id de Juego (requerido para enviar progreso).
 */
const MatchingGame = ({ perfilId, juegoId }) => {
  const location = useLocation();
  const idioma = location.state?.idioma || 'es';

  const [pairs, setPairs] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showPlayAgain, setShowPlayAgain] = useState(false);

  // Para medir tiempo de partida en milisegundos
  const startTimeRef = useRef(null);

  /**
   * Inicia o reinicia el juego: baraja, resetea contadores, marca hora de inicio.
   */
  const reiniciar = () => {
    const newPairs = getMatchingPairs(idioma);
    setPairs(newPairs);

    const shuffled = [...newPairs]
      .map(p => ({ id: p.id, img: p.img }))
      .sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);

    setSelectedWord(null);
    setSelectedImage(null);
    setMatchedIds([]);
    setFailedAttempts(0);
    setShowPlayAgain(false);

    // Establecer tiempo de inicio ahora
    startTimeRef.current = Date.now();
  };

  // Arranca el juego por primera vez
  useEffect(() => {
    reiniciar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idioma]);

  // Lógica de emparejamiento: si selecciona palabra e imagen, verifica match
  useEffect(() => {
    if (selectedWord !== null && selectedImage !== null) {
      if (selectedWord === selectedImage) {
        // Si coincide, registro como encontrado
        setMatchedIds(prev => [...prev, selectedWord]);
      } else {
        // Si no coincide, incrementamos contador de intentos fallidos
        setFailedAttempts(prev => prev + 1);
      }

      // Después de 600ms, reseteamos selección para siguiente intento
      const timeout = setTimeout(() => {
        setSelectedWord(null);
        setSelectedImage(null);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [selectedWord, selectedImage]);

  // Cuando matchedIds alcanza el total de pares, el juego terminó
  useEffect(() => {
    if (pairs.length > 0 && matchedIds.length === pairs.length) {
      // Mostrar el botón de reiniciar
      setShowPlayAgain(true);

      // Calcular tiempo en segundos
      const tiempoMs = Date.now() - startTimeRef.current;
      const tiempoSegs = Math.floor(tiempoMs / 1000);

      // Construir objeto de estadísticas
      const stats = {
        total_pairs: pairs.length,
        pairs_found: matchedIds.length,
        failed_attempts: failedAttempts,
        time_seconds: tiempoSegs
      };

      // Enviar al backend (POST /api/progreso/juegos/)
      axios
        .post('/api/progreso/juegos/', {
          perfil_infantil: perfilId,
          juego: juegoId,
          tiempo_jugado: tiempoSegs,
          estadisticas: stats
        })
        .catch(err => {
          console.error('Error enviando progreso MatchingGame:', err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedIds]);

  const handleWordClick = id => {
    if (matchedIds.includes(id) || selectedWord === id) return;
    setSelectedWord(id);
  };

  const handleImageClick = id => {
    if (matchedIds.includes(id) || selectedImage === id) return;
    setSelectedImage(id);
  };

  return (
    <MatchingGameHTML
      pairs={pairs}
      shuffledImages={shuffledImages}
      selectedWord={selectedWord}
      selectedImage={selectedImage}
      matchedIds={matchedIds}
      handleWordClick={handleWordClick}
      handleImageClick={handleImageClick}
      reiniciar={reiniciar}
      showPlayAgain={showPlayAgain}
    />
  );
};

export default MatchingGame;