import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CELL_TYPE } from 'consts/cell';
import './cell.css';

class Cell extends PureComponent {
  render() {
    const { type, className } = this.props;
    const cellClass = classnames('cell', className, {
      'cell--empty': type === CELL_TYPE.EMPTY,
      'cell--miss': type === CELL_TYPE.MISS,
      'cell--ship': type === CELL_TYPE.SHIP,
      'cell--hit': type === CELL_TYPE.HIT,
      'cell--destroy': type === CELL_TYPE.DESTROY,
    });

    return <div className={cellClass} />;
  }
}

Cell.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Cell;
