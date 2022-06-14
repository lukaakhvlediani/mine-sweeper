import React from 'react';
import PropTypes from 'prop-types';

export const Cell = ({ cells, visitCell, buttonStyle, visitStyle }) => {
  Cell.propTypes = {
    cells: PropTypes.number,
    visitCell: PropTypes.array,
    buttonStyle: PropTypes.string,
    visitStyle: PropTypes.string,
  };

  return (
    <div>
      {cells.bombs.map((arr, index) => (
        <div>
          {arr.map((elem, i) => (
            <div
              onClick={() => visitCell(index, i)}
              style={cells.visited[index][i] === 0 ? buttonStyle : visitStyle}
            >
              {(() => {
                if (cells.visited[index][i] === 0) {
                  return null;
                }
                if (cells.bombs[index][i] === 0) {
                  return '';
                }
                return cells.bombs[index][i];
              })()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
