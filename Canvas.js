import React, { useState, useRef } from 'react';
import Card from './Card';
import Arrow from './Arrow';

const Canvas = () => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { id: 2, text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 3, text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  ]);

  const [arrows, setArrows] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [dragging, setDragging] = useState(false);
  const canvasRef = useRef(null);

  const handleDragStart = (card) => {
    setSelectedCard(card);
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    const card = selectedCard;
    const x = event.clientX;
    const y = event.clientY;
    card.x = x;
    card.y = y;
    setCards([...cards]);
  };

  const handleResize = (card, width, height) => {
    card.width = width;
    card.height = height;
    setCards([...cards]);
  };

  const handleConnect = (card1, card2) => {
    setArrows([...arrows, { from: card1.id, to: card2.id }]);
  };

  return (
    <div
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'auto',
        position: 'relative',
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          onResize={handleResize}
          onSelect={() => setSelectedCard(card)}
        />
      ))}
      {arrows.map((arrow) => (
        <Arrow key={arrow.from + '-' + arrow.to} from={arrow.from} to={arrow.to} />
      ))}
    </div>
  );
};

export default Canvas;