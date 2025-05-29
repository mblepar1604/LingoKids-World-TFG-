import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Progresos.css';

const Progresos = () => {
  const [progresos, setProgresos] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProgresos = async () => {
      try {
        const res = await axios.get('/api/progresos/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setProgresos(res.data);
      } catch (err) {
        console.error('Error al obtener progresos:', err);
      } finally {
        setCargando(false);
      }
    };

    fetchProgresos();
  }, []);

  if (cargando) return <p className="text-center text-gray-500">Cargando...</p>;

  if (!progresos) return <p className="text-center text-gray-500">No hay datos de progreso disponibles.</p>;

  return (
    <div className="progresos-container">
      <h1 className="progresos-title">Progresos</h1>
      <div className="progresos-grid">
        <div className="progreso-card">
          <h2>Cuentos Leídos</h2>
          <p>{progresos.cuentosLeidos} / {progresos.totalCuentos} ({((progresos.cuentosLeidos / progresos.totalCuentos) * 100).toFixed(2)}%)</p>
        </div>
        <div className="progreso-card">
          <h2>Juegos Jugados</h2>
          <p>{progresos.juegosJugados} / {progresos.totalJuegos} ({((progresos.juegosJugados / progresos.totalJuegos) * 100).toFixed(2)}%)</p>
        </div>
        <div className="progreso-card">
          <h2>Idiomas Practicados</h2>
          {Object.entries(progresos.idiomas).map(([idioma, datos]) => (
            <div key={idioma}>
              <h3>{idioma.toUpperCase()}</h3>
              <p>Cuentos: {datos.cuentosLeidos} / {datos.totalCuentos} ({((datos.cuentosLeidos / datos.totalCuentos) * 100).toFixed(2)}%)</p>
              <p>Juegos: {datos.juegosJugados} / {datos.totalJuegos} ({((datos.juegosJugados / datos.totalJuegos) * 100).toFixed(2)}%)</p>
            </div>
          ))}
        </div>
        <div className="progreso-card">
          <h2>Horas Gastadas</h2>
          <p>En Juegos: {progresos.horasJuegos.toFixed(2)} horas</p>
          <p>En Cuentos: {progresos.horasCuentos.toFixed(2)} horas</p>
          <p>Total: {progresos.horasTotales.toFixed(2)} horas</p>
        </div>
      </div>
    </div>
  );
};

export default Progresos;
