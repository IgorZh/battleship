import { CELL_TYPE } from 'consts/cell';

export default class Field {
  constructor(size, autoFire) {
    this.cells = [];
    this.autoFire = autoFire;

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push({ key: `${i}${j}`, x: j, y: i, type: CELL_TYPE.EMPTY });
        this.autoFire.addCell(j, i);
      }

      this.cells.push(row);
    }
  }

  changeCellsType(cells, cellType) {
    cells.forEach(cell => {
      this.changeCellType(cell, cellType);
    });
  }

  changeCellType(cell, cellType) {
    this.cells[cell.y][cell.x].type = cellType;
  }

  getCellType(cell) {
    return this.cells[cell.y][cell.x].type;
  }

  getNotFiredRandomCell() {
    return this.autoFire.getRandomCell();
  }
}
