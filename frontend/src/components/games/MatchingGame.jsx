import React, { useState, useEffect } from 'react';
import '../styles/games/MatchingGame.css';
import { getMatchingPairs } from '../../utils/cardsData';
import PlayAgain from '../PlayAgain';
import LanguageSelect from '../LanguageSelect';

const MatchingGameHTML = ({ pairs, images, selectedWord, selectedImage, matchedIds, handleWordClick, handleImageClick, idioma, onIdiomaChange }) => {
  return (
    <div className="matching-container">
      <h1 className="matching-title">Matching Words</h1>
      <LanguageSelect idioma={idioma} traduccion={idioma} onIdiomaChange={onIdiomaChange} onTraduccionChange={() => {}} />
      <PlayAgain onClick={() => window.location.reload()} />
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
          {images.map(p => (
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

const MatchingGame = () => {
  const [idioma, setIdioma] = useState('es');
  const [pairs, setPairs] = useState([]);
  const [shuffledImages, setShuffledImages] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);

  useEffect(() => {
    const fetchedPairs = getMatchingPairs(idioma);
    setPairs(fetchedPairs);

    const images = fetchedPairs
      .map(p => ({ id: p.id, img: p.img }))
      .sort(() => Math.random() - 0.5);
    setShuffledImages(images);
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
      images={shuffledImages}
      selectedWord={selectedWord}
      selectedImage={selectedImage}
      matchedIds={matchedIds}
      handleWordClick={handleWordClick}
      handleImageClick={handleImageClick}
      idioma={idioma}
      onIdiomaChange={setIdioma}
    />
  );
};

export default MatchingGame;