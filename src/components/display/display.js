import React from 'react';

import './display.css';

const Display = ({data}) => {
  let fontSize;
  if (data === 'Деление на ноль невозможно') {
    fontSize = 'division_by_zero';
  } else if (data.length > 10) {
    fontSize = 'little';
  }

  return (
    <div className="display">
      <p className={fontSize}>{data}</p>
    </div>
  )
}

export default Display;