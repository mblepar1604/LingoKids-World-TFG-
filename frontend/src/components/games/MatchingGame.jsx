import React, { useState, useEffect } from 'react';
import '../styles/games/MatchingGame.css';
import { getMatchingPairs } from '../../utils/cardsData';
import PlayAgain from './PlayAgain';

const MatchingGameHTML = ({
  pairs,
  shuffledImages,
  selectedWord,
  selectedImage,
  matchedIds,
  handleWordClick,
  handleImageClick,
  reiniciar
}) => {
  return (
    <div className="matching-container">
      <h1 className="matching-title">Matching Words</h1>

      {/* Fila de imágenes */}
      <div className="images-grid">
        {shuffledImages.map(p => (
          <div
            key={p.id}
            className={`card-item image ${selectedImage === p.id ? 'selected' : ''} ${matchedIds.includes(p.id) ? 'matched' : ''}`}
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
            className={`card-item word ${selectedWord === p.id ? 'selected' : ''} ${matchedIds.includes(p.id) ? 'matched' : ''}`}
            onClick={() => handleWordClick(p.id)}
          >
            <span>{p.word}</span>
          </div>
        ))}
      </div>

      {/* Botón volver a jugar */}
      <div className="matching-footer">
        <PlayAgain onClick={reiniciar} />
      </div>
    </div>
  );
};

const MatchingGame = ({ idioma = 'es' }) => {
  const [pairs, setPairs] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);

  useEffect(() => {
    const newPairs = getMatchingPairs(idioma);
    setPairs(newPairs);
    const shuffled = [...newPairs]
      .map(p => ({ id: p.id, img: p.img }))
      .sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, [idioma]);

  // Nueva función para manejar la lógica de emparejamiento
  useEffect(() => {
    if (selectedWord !== null && selectedImage !== null) {
      if (selectedWord === selectedImage) {
        setMatchedIds(prev => [...prev, selectedWord]);
      }
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedImage(null);
      }, 600);
    }
  }, [selectedWord, selectedImage]);

  const handleWordClick = id => {
    if (matchedIds.includes(id) || selectedWord === id) return;
    setSelectedWord(id);
  };

  const handleImageClick = id => {
    if (matchedIds.includes(id) || selectedImage === id) return;
    setSelectedImage(id);
  };

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
    />
  );
};

export default MatchingGame;