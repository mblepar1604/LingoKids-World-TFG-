import React, { useState, useEffect } from 'react';
import '../styles/games/MemoryGame.css';
import { getMemoryCards } from '../../utils/cardsData';
import PlayAgain from '../PlayAgain';
import LanguageSelect from '../LanguageSelect';

const MemoryGameHTML = ({ cards, flipped, matched, handleFlip, reiniciar, idioma, traduccion, onIdiomaChange, onTraduccionChange }) => {
  return (
    <div className="memory-container">
      <h1 className="memory-title">Memory Multilingüe</h1>
      <LanguageSelect idioma={idioma} traduccion={traduccion} onIdiomaChange={onIdiomaChange} onTraduccionChange={onTraduccionChange} />
      <PlayAgain onClick={reiniciar} />
      <div className="memory-grid">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(card.id);
          return (
            <div
              key={index}
              className={`memory-card ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleFlip(index)}
            >
              <div className="memory-front">
                {card.type === 'img'
                  ? <img src={card.content} alt="img" />
                  : <span>{card.content}</span>}
              </div>
              <div className="memory-back">?</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MemoryGame = () => {
  const [idioma, setIdioma] = useState('es');
  const [traduccion, setTraduccion] = useState('en');
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [bloqueado, setBloqueado] = useState(false);

  const reiniciar = () => {
    const nuevas = getMemoryCards(idioma, traduccion);
    setCards(nuevas);
    setFlipped([]);
    setMatched([]);
    setBloqueado(false);
  };

  useEffect(() => {
    reiniciar();
  }, [idioma, traduccion]);

  const handleFlip = (index) => {
    if (bloqueado || flipped.includes(index) || matched.includes(cards[index].id)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setBloqueado(true);
      setTimeout(() => {
        const [i, j] = newFlipped;
        if (cards[i].id === cards[j].id && cards[i].type !== cards[j].type) {
          setMatched([...matched, cards[i].id]);
        }
        setFlipped([]);
        setBloqueado(false);
      }, 1000);
    }
  };

  return (
    <MemoryGameHTML
      cards={cards}
      flipped={flipped}
      matched={matched}
      handleFlip={handleFlip}
      reiniciar={reiniciar}
      idioma={idioma}
      traduccion={traduccion}
      onIdiomaChange={setIdioma}
      onTraduccionChange={setTraduccion}
    />
  );
};

export default MemoryGame;