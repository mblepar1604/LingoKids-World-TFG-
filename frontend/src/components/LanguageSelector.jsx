import React from 'react';
import './styles/LanguageSelector.css';

const LanguageSelector = ({ idioma, setIdioma }) => {
  return (
    <div className="language-selector">
      <label htmlFor="idioma">Idioma:</label>
      <select
        id="idioma"
        value={idioma}
        onChange={(e) => setIdioma(e.target.value)}
      >
        <option value="es">Español</option>
        <option value="en">Inglés</option>
        <option value="it">Italiano</option>
        <option value="fr">Francés</option>
        <option value="pt">Portugués</option>
      </select>
    </div>
  );
};

export default LanguageSelector;