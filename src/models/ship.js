import _isEqual from 'lodash/isEqual';
import { DIRECTIONS } from 'consts/directions';

export default class Ship {
  constructor(cells, fieldSize) {
    this.cells = cells;
    this.boundaryCells = [];
    this.hits = 0;

    this._calculateBoundaryCells(fieldSize);
  }

  isInShipTerritory(cell) {
    return (
      this.cells.some(shipCell => _isEqual(shipCell, cell)) ||
      this.boundaryCells.some(shipCell => _isEqual(shipCell, cell))
    );
  }

  tryDestroy(cell) {
    if (this.cells.some(shipCell => _isEqual(cell, shipCell))) {
      this.hits++;
      console.log(this.hits);
    }
    return this.isDestroyed ? this : null;
  }

  get isDestroyed() {
    return this.hits === this.cells.length;
  }

  _calculateBoundaryCells(fieldSize) {
    this.cells.forEach(cell => {
      this.boundaryCells = [
        ...this.boundaryCells,
        ...this._calculateCellNeighbors(cell, fieldSize),
      ];
    });
  }

  _calculateCellNeighbors(cell, fieldSize) {
    const b = Object.keys(DIRECTIONS)
      .map(direction => cell.getCellByDirection(direction))
      .filter(
        cell =>
          cell.isValid(fieldSize) &&
          this.cells.every(shipCell => !_isEqual(shipCell, cell))
      );

    return b;
  }
}
