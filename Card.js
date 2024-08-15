import React from 'react';

const Card = ({
  card,
  onDragStart,
  onDragEnd,
  onDrop,
  onResize,
  onSelect,
}) => {
  const [showMore, setShowMore] = useState(false);

  const handleDragStart = (event) => {
    onDragStart(card);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  const handleDrop = (event) => {
    onDrop(event);
  };

  const handleResize = (width, height) => {
    onResize(card, width, height);
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleClosePopup = () => {
    setShowMore(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: card.y,
        left: card.x,
        width: card.width,
        height: card.height,
        backgroundColor: 'white',
        border: '1px solid #ddd',
        padding: 10,
        cursor: 'move',
      }}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {card.text.substring(0, 20)}...
      </div>
      <button onClick={handleShowMore}>Show more</button>
      {showMore && (
        <Popup onClose={handleClosePopup}>
          <p>{card.text}</p>
        </Popup>
      )}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          cursor: 'nw-resize',
        }}
        onMouseDown={(event) => {
          const startX = event.clientX;
          const startY = event.clientY;
          const startWidth = card.width;
          const startHeight = card.height;

          const handleMouseMove = (event) => {
            const width = startWidth + event.clientX - startX