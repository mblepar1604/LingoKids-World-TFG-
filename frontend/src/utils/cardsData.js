const vocabulario = [
    { id: 1, es: 'manzana', en: 'apple', img: '../../assets/img/games/fruta_manzana.png' },
    { id: 2, es: 'casa', en: 'house', img: '../../assets/img/games/casa.png' },
    { id: 3, es: 'sol', en: 'sun', img: '../../assets/img/games/sol.png' },
    { id: 4, es: 'libro', en: 'book', img: '../../assets/img/games/libro.png' },
    { id: 5, es: 'gato', en: 'cat', img: '../../assets/img/games/gato.png' },
    { id: 6, es: 'pelota', en: 'ball', img: '../../assets/img/games/pelota.png' },
    { id: 7, es: 'estrella', en: 'star', img: '../../assets/img/games/estrella.png' },
];

export const getMemoryCards = (idioma) => {
    const cards = vocabulario.flatMap(word => [
        { id: word.id, type: 'text', content: word[idioma] },
        { id: word.id, type: 'img', content: word.img }
    ]);
    return cards.sort(() => Math.random() - 0.5);
};

export const getMatchingPairs = (idioma = 'es') => {
      return vocabulario.map(v => ({
    id: v.id,
    word: v[idioma],
    img: v.img
  }));
};

export const getPuzzleFrases = () => {
  const frases = [
    'I am going to school',
    'She is reading a book',
    'We are playing outside',
    'They have a big dog'
  ];

  const seleccionada = frases[Math.floor(Math.random() * frases.length)];
  const original = seleccionada.split(' ');
  const shuffle = [...original].sort(() => Math.random() - 0.5);

  return { original, shuffle };
};