import React, { useState, useEffect } from 'react';
import '../styles/games/SimonGame.css';

const sonidos = [
    { id: 0, color: '#f44336', audio: '/sounds/rojo.mp3' },
    { id: 1, color: '#2196f3', audio: '/sounds/azul.mp3' },
    { id: 2, color: '#4caf50', audio: '/sounds/verde.mp3' },
    { id: 3, color: '#ffeb3b', audio: '/sounds/amarillo.mp3' }
];

const SecuenciaSonidosHTML = ({ ronda, sonidos, handleClick }) => {
    return (
        <div className="secuencia-container">
            <h1 className="secuencia-title">Secuencia de Sonidos</h1>
            <p className="secuencia-sub">Ronda: {ronda}</p>
            <div className="secuencia-botones">
                {sonidos.map(sonido => (
                    <button
                        key={sonido.id}
                        id={`sonido-${sonido.id}`}
                        className="boton-sonido"
                        style={{ backgroundColor: sonido.color }}
                        onClick={() => handleClick(sonido.id)}
                    >
                        {sonido.id + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

const SecuenciaSonidos = () => {
    const [secuencia, setSecuencia] = useState([]);
    const [jugador, setJugador] = useState([]);
    const [bloqueado, setBloqueado] = useState(true);
    const [ronda, setRonda] = useState(1);

    useEffect(() => {
        iniciarNuevaRonda();
    }, []);

    const reproducirSonido = (id) => {
        const audio = new Audio(sonidos[id].audio);
        audio.play();
    };

    const animarSecuencia = async (secuencia) => {
        setBloqueado(true);
        for (let i = 0; i < secuencia.length; i++) {
            reproducirSonido(secuencia[i]);
            await new Promise(r => setTimeout(r, 800));
        }
        setBloqueado(false);
    };

    const iniciarNuevaRonda = () => {
        const nuevoPaso = Math.floor(Math.random() * sonidos.length);
        const nuevaSecuencia = [...secuencia, nuevoPaso];
        setSecuencia(nuevaSecuencia);
        setJugador([]);
        setTimeout(() => animarSecuencia(nuevaSecuencia), 500);
    };

    const handleClick = (id) => {
        if (bloqueado) return;

        const boton = document.getElementById(`boton-${id}`);
            if (boton) {
                boton.classList.add('activo');
                setTimeout(() => boton.classList.remove('activo'), 300);
            }

        const nuevoJugador = [...jugador, id];
        setJugador(nuevoJugador);
        reproducirSonido(id);

        for (let i = 0; i < nuevoJugador.length; i++) {
            if (nuevoJugador[i] !== secuencia[i]) {
                alert('¡Fallaste! Volvemos a empezar');
                setSecuencia([]);
                setJugador([]);
                setRonda(1);
                setTimeout(() => iniciarNuevaRonda(), 800);
                return;
            }
        }

        if (nuevoJugador.length === secuencia.length) {
            setRonda(ronda + 1);
            setTimeout(() => iniciarNuevaRonda(), 1000);
        }
    };

    return <SecuenciaSonidosHTML ronda={ronda} sonidos={sonidos} handleClick={handleClick} />;
};

export default SecuenciaSonidos;