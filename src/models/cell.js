import _random from 'lodash/random';
import { DIRECTIONS } from 'consts/directions';

const cellTransitions = {
  [DIRECTIONS.RIGHT]: cell => new Cell(cell.x + 1, cell.y),
  [DIRECTIONS.BOTTOM_RIGHT]: cell => new Cell(cell.x + 1, cell.y + 1),
  [DIRECTIONS.BOTTOM]: cell => new Cell(cell.x, cell.y + 1),
  [DIRECTIONS.BOTTOM_LEFT]: cell => new Cell(cell.x - 1, cell.y + 1),
  [DIRECTIONS.LEFT]: cell => new Cell(cell.x - 1, cell.y),
  [DIRECTIONS.TOP_LEFT]: cell => new Cell(cell.x - 1, cell.y - 1),
  [DIRECTIONS.TOP]: cell => new Cell(cell.x, cell.y - 1),
  [DIRECTIONS.TOP_RIGHT]: cell => new Cell(cell.x + 1, cell.y - 1),
};

export default class Cell {
  static randomCell(fieldSize) {
    return new Cell(_random(0, fieldSize - 1), _random(0, fieldSize - 1));
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getCellByDirection(direction) {
    return cellTransitions[direction](this);
  }

  isValid(fieldSize) {
    return (
      this.x >= 0 &&
      this.x <= fieldSize - 1 &&
      this.y >= 0 &&
      this.y <= fieldSize - 1
    );
  }
}
