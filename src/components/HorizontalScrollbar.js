import React from 'react';
import BodyPart from './BodyPart';
import ExerciseCard from './ExerciseCard';

const HorizontalScroll = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  const handleItemClick = (item) => {
    // Handle item click logic here
    console.log('Item clicked  in h-scroller:', item);
  };

  return (
    <div className="horizontal-scroll-container">
        {data.map((item, index) => (
          <div
            key={item.id || index}
            className="scroll-item"
            onClick={() => handleItemClick(item)}
          >
            {bodyParts ? (
              <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
            ) : (
              <ExerciseCard exercise={item} />
            )}
          </div>
        ))}
      </div>
  );
};

export default HorizontalScroll;
