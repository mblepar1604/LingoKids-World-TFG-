import React, { createContext, useState, useContext } from 'react';

export const PerfilInfantilContext = createContext();

export function PerfilInfantilProvider({ children }) {
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);

  return (
    <PerfilInfantilContext.Provider value={{ perfilSeleccionado, setPerfilSeleccionado }}>
      {children}
    </PerfilInfantilContext.Provider>
  );
}

export function usePerfilInfantil() {
  return useContext(PerfilInfantilContext);
} 