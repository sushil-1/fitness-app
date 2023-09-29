import React from 'react';
import BodyPart from './BodyPart';
import ExerciseCard from './ExerciseCard';
import '../styles/App.css';

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  return (
    <div className="horizontal-scroll-container">
      {data.map((item) => (
        <div
          key={item.id || item}
          itemID={item.id || item}
          title={item.id || item}
          className="scroll-item"
        >
          {bodyParts ? <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} /> : <ExerciseCard exercise={item} />}
        </div>
      ))}
    </div>
  );
}

export default HorizontalScrollbar;
