import React, { useState, useEffect } from 'react';
import '../styles/games/MatchingGame.css';
import { getMatchingPairs } from '../../utils/cardsData';

const MatchingGameHTML = ({ pairs, selectedWord, selectedImage, matchedIds, handleWordClick, handleImageClick }) => {
  return (
    <div className="matching-container">
      <h1 className="matching-title">Matching Words</h1>
      <div className="matching-grid">
        <div className="column words">
          {pairs.map(p => (
            <div
              key={p.id}
              className={`card-item word ${selectedWord === p.id ? 'selected' : ''} ${matchedIds.includes(p.id) ? 'matched' : ''}`}
              onClick={() => handleWordClick(p.id)}
            >
              {p.word}
            </div>
          ))}
        </div>
        <div className="column images">
          {pairs
            .map(p => ({ id: p.id, img: p.img }))
            .sort(() => Math.random() - 0.5)
            .map(p => (
              <div
                key={p.id}
                className={`card-item image ${selectedImage === p.id ? 'selected' : ''} ${matchedIds.includes(p.id) ? 'matched' : ''}`}
                onClick={() => handleImageClick(p.id)}
              >
                <img src={p.img} alt="" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const MatchingGame = ({ idioma = 'es' }) => {
  const [pairs, setPairs] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);

  useEffect(() => {
    setPairs(getMatchingPairs(idioma));
  }, [idioma]);

  const handleWordClick = (id) => {
    if (matchedIds.includes(id)) return;
    setSelectedWord(id);
  };

  const handleImageClick = (id) => {
    if (matchedIds.includes(id)) return;
    setSelectedImage(id);

    if (selectedWord === id) {
      setMatchedIds([...matchedIds, id]);
    }

    setTimeout(() => {
      setSelectedWord(null);
      setSelectedImage(null);
    }, 600);
  };

  return (
    <MatchingGameHTML
      pairs={pairs}
      selectedWord={selectedWord}
      selectedImage={selectedImage}
      matchedIds={matchedIds}
      handleWordClick={handleWordClick}
      handleImageClick={handleImageClick}
    />
  );
};

export default MatchingGame;