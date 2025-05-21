import '../styles/index.css';
import BienvenidaDashboard from "./BienvenidaDashboard";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-bg">
      <BienvenidaDashboard />
      <h1 className="dashboard-title">LingoKids World</h1>
      <div className="menu">
        <div className="card" onClick={() => navigate('/cuentos')}>📚 Mundo de Cuentos</div>
        <div className="card" onClick={() => navigate('/juegos')}>🧠 Juegos Cognitivos</div>
        <div className="card" onClick={() => navigate('/avatar')}>🧸 Mi Avatar</div>
        <div className="card" onClick={() => navigate('/progreso')}>🏆 Progreso y Logros</div>
      </div>
    </div>
  );
}