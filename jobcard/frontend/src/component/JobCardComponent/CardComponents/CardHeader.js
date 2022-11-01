import React from 'react';

const CardHeader = ({name}) => {
  return (
    <div className="cardHeader">
      <p className="name">{name}</p>
    </div>
  );
};

export default CardHeader;
