const vocabulario = [
    { id: 1, es: 'manzana', en: 'apple', it: 'mela', fr: 'pomme', pt: 'maçã', img: '/img/games/fruta_manzana.png' },
    { id: 2, es: 'casa', en: 'house', it: 'casa', fr: 'maison', pt: 'casa', img: '/img/games/casa.png' },
    { id: 3, es: 'sol', en: 'sun', it: 'sole', fr: 'soleil', pt: 'sol', img: '/img/games/sol.png' },
    { id: 4, es: 'libro', en: 'book', it: 'libro', fr: 'livre', pt: 'livro', img: '/img/games/libro.png' },
    { id: 5, es: 'gato', en: 'cat', it: 'gatto', fr: 'chat', pt: 'gato', img: '/img/games/gato.png' },
    { id: 6, es: 'pelota', en: 'ball', it: 'palla', fr: 'balle', pt: 'bola', img: '/img/games/pelota.png' },
    { id: 7, es: 'estrella', en: 'star', it: 'stella', fr: 'étoile', pt: 'estrela', img: '/img/games/estrella.png' },
    { id: 8, es: 'perro', en: 'dog', it: 'cane', fr: 'chien', pt: 'cachorro', img: '/img/games/perro.png' },
    { id: 9, es: 'flor', en: 'flower', it: 'fiore', fr: 'fleur', pt: 'flor', img: '/img/games/flor.png' },
    { id: 10, es: 'árbol', en: 'tree', it: 'albero', fr: 'arbre', pt: 'árvore', img: '/img/games/arbol.png' },
    { id: 11, es: 'coche', en: 'car', it: 'macchina', fr: 'voiture', pt: 'carro', img: '/img/games/coche.png' },
    { id: 12, es: 'mesa', en: 'table', it: 'tavolo', fr: 'table', pt: 'mesa', img: '/img/games/mesa.png' },
    { id: 13, es: 'silla', en: 'chair', it: 'sedia', fr: 'chaise', pt: 'cadeira', img: '/img/games/silla.png' },
    { id: 14, es: 'puerta', en: 'door', it: 'porta', fr: 'porte', pt: 'porta', img: '/img/games/puerta.png' },
    { id: 15, es: 'ventana', en: 'window', it: 'finestra', fr: 'fenêtre', pt: 'janela', img: '/img/games/ventana.png' },
    { id: 16, es: 'zapato', en: 'shoe', it: 'scarpa', fr: 'chaussure', pt: 'sapato', img: '/img/games/zapato.png' },
    { id: 17, es: 'camisa', en: 'shirt', it: 'camicia', fr: 'chemise', pt: 'camisa', img: '/img/games/camisa.png' },
    { id: 18, es: 'reloj', en: 'watch', it: 'orologio', fr: 'montre', pt: 'relógio', img: '/img/games/reloj.png' },
    { id: 19, es: 'avión', en: 'plane', it: 'aereo', fr: 'avion', pt: 'avião', img: '/img/games/avion.png' },
    { id: 20, es: 'tren', en: 'train', it: 'treno', fr: 'train', pt: 'trem', img: '/img/games/tren.png' }
];

export const getMemoryCards = (idioma) => {
    const cards = vocabulario.flatMap(word => [
        { id: word.id, type: 'text', content: word[idioma] },
        { id: word.id, type: 'img', content: word.img }
    ]);
    return cards.sort(() => Math.random() - 0.5);
};

export const getMatchingPairs = (idioma) => {
    return vocabulario
        .sort(() => Math.random() - 0.5) // Mezcla aleatoriamente el vocabulario
        .slice(0, 10) // Limita a 10 elementos
        .map(v => ({
            id: v.id,
            word: v[idioma],
            img: v.img
        }));
};

export const getPuzzleFrases = (idioma) => {
    const frases_en = [
        'I am going to school',
        'She is reading a book',
        'We are playing outside',
        'They have a big dog',
        'He is eating an apple',
        'The cat is sleeping',
        'We are watching a movie',
        'She is writing a letter',
        'They are building a house',
        'I am learning English'
    ];

    const frases_es = [
        'Voy a la escuela',
        'Ella está leyendo un libro',
        'Estamos jugando afuera',
        'Tienen un perro grande',
        'Él está comiendo una manzana',
        'El gato está durmiendo',
        'Estamos viendo una película',
        'Ella está escribiendo una carta',
        'Están construyendo una casa',
        'Estoy aprendiendo inglés'
    ];

    const frases_it = [
        'Vado a scuola',
        'Lei sta leggendo un libro',
        'Stiamo giocando fuori',
        'Hanno un cane grande',
        'Lui sta mangiando una mela',
        'Il gatto sta dormendo',
        'Stiamo guardando un film',
        'Lei sta scrivendo una lettera',
        'Stanno costruendo una casa',
        'Sto imparando l\'inglese'
    ];

    const frases_fr = [
        'Je vais à l\'école',
        'Elle lit un livre',
        'Nous jouons dehors',
        'Ils ont un gros chien',
        'Il mange une pomme',
        'Le chat dort',
        'Nous regardons un film',
        'Elle écrit une lettre',
        'Ils construisent une maison',
        'J\'apprends l\'anglais'
    ];

    const frases_pt = [
        'Eu vou para a escola',
        'Ela está lendo um livro',
        'Estamos brincando lá fora',
        'Eles têm um cachorro grande',
        'Ele está comendo uma maçã',
        'O gato está dormindo',
        'Estamos assistindo a um filme',
        'Ela está escrevendo uma carta',
        'Eles estão construindo uma casa',
        'Estou aprendendo inglês'
    ];

    const frases = idioma === 'en' ? frases_en
        : idioma === 'es' ? frases_es
        : idioma === 'it' ? frases_it
        : idioma === 'fr' ? frases_fr
        : frases_pt;

    const seleccionada = frases[Math.floor(Math.random() * frases.length)];
    const original = seleccionada.split(' ');
    const shuffle = [...original].sort(() => Math.random() - 0.5);

    return { original, shuffle };
};