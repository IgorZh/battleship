import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Cell } from 'components';
import './field.css';

class Field extends Component {
  render() {
    const { cells, gameOver } = this.props;

    const fieldClass = classnames('field', { 'field--game-over': gameOver });

    return (
      <div className={fieldClass}>
        {cells.map((row, i) =>
          row.map((cell, j) => (
            <Cell key={cell.key} className="field__cell" type={cell.type} />
          ))
        )}
      </div>
    );
  }
}

Field.propTypes = {
  cells: PropTypes.array.isRequired,
  gameOver: PropTypes.bool.isRequired,
};

export default Field;
