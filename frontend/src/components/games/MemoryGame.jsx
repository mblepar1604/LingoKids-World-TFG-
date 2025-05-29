import React, { useState, useEffect } from 'react';
import '../styles/games/MemoryGame.css';
import { getMemoryCards } from '../../utils/cardsData';
import PlayAgain from './PlayAgain';
import LanguageSelect from './LanguageSelect';

const MemoryGameHTML = ({
  cards,
  flipped,
  matched,
  handleFlip,
  reiniciar,
  idioma,
  traduccion,
  onIdiomaChange,
  onTraduccionChange,
  transitionsEnabled
}) => {
  return (
    <div className={`memory-container ${transitionsEnabled ? 'transitions-enabled' : ''}`}>
      <h1 className="memory-title">Memory Multilingüe</h1>
      <LanguageSelect
        idioma={idioma}
        traduccion={traduccion}
        onIdiomaChange={onIdiomaChange}
        onTraduccionChange={onTraduccionChange}
      />

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
                  : <span>{card.content}</span>
                }
              </div>
              <div className="memory-back">?</div>
            </div>
          );
        })}
      </div>

      <div className="memory-footer">
        <PlayAgain onClick={reiniciar} />
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
  const [transitionsEnabled, setTransitionsEnabled] = useState(false);

  const reiniciar = () => {
    setTransitionsEnabled(false); // Desactiva transiciones antes de reiniciar
    const nuevas = getMemoryCards(idioma, traduccion);
    setCards(nuevas);
    setFlipped([]);
    setMatched([]);
    setBloqueado(false);
    // Reactiva transiciones después de que las cartas estén tapadas
    setTimeout(() => setTransitionsEnabled(true), 100);
  };

  // carga inicial y cada cambio de idioma/traducción
  useEffect(() => {
    reiniciar();
  }, [idioma, traduccion]);

  // habilitar transiciones justo después del primer render
  useEffect(() => {
    setTimeout(() => setTransitionsEnabled(true), 0);
  }, []);

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
      transitionsEnabled={transitionsEnabled}
    />
  );
};

export default MemoryGame;