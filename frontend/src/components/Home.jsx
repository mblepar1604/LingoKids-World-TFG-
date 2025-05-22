import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/index.css';

const Home = () => {
  // HTML extraído a función aparte
  const renderHome = () => (
    <div className="dashboard-bg">
      <h1 className="dashboard-title">LingoKids World</h1>
      <div className="menu">
        <div className="card" onClick={() => window.location.href='/cuentos'}>📚 Mundo de Cuentos</div>
        <div className="card" onClick={() => window.location.href='/juegos'}>🧠 Juegos Cognitivos</div>
        <div className="card" onClick={() => window.location.href='/avatar'}>🧸 Mi Avatar</div>
        <div className="card" onClick={() => window.location.href='/progreso'}>🏆 Progreso y Logros</div>
      </div>
    </div>
  );

  return renderHome();
};

export default Home;