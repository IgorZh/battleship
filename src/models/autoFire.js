import _random from 'lodash/random';

export default class AutoFire {
  constructor() {
    this.cells = [];
  }

  getRandomCell() {
    const cellIndex = _random(this.cells.length - 1);

    return this.cells.splice(cellIndex, 1)[0];
  }

  addCell(x, y) {
    this.cells.push({ x, y });
  }
}
