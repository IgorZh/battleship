import _random from 'lodash/random';
import _last from 'lodash/last';
import Cell from './cell';
import Ship from './ship';
import { CELL_TYPE } from 'consts/cell';
import { ROTATIONS } from 'consts/rotations';

export default class Battleship {
  constructor(field, shipyard, fieldSize, shipShapes) {
    this.field = field;
    this.shipyard = shipyard;
    this.fieldSize = fieldSize;
    this.ships = [];
    this.gameOver = false;
    this.fireInterval = null;

    shipShapes.forEach(shape => this.ships.push(this._tryCreateShip(shape)));

    this._markShipsOnField();
  }

  autoFire() {
    this.fireInterval = setInterval(() => this.fire(), 100);
  }

  get gameStarted() {
    return this.fireInterval !== null;
  }

  fire() {
    const randomCell = this.field.getNotFiredRandomCell();

    const cell = new Cell(randomCell.x, randomCell.y);
    const cellType = this.field.getCellType(cell);

    if (cellType === CELL_TYPE.EMPTY) {
      this.field.changeCellType(cell, CELL_TYPE.MISS);
    }
    if (cellType === CELL_TYPE.SHIP) {
      this.field.changeCellType(cell, CELL_TYPE.HIT);
      this._hitShip(cell);
    }

    if (this.ships.every(ship => ship.isDestroyed)) {
      this.gameOver = true;
      clearInterval(this.fireInterval);
    }

    if (this.reaction) {
      this.reaction();
    }
  }

  subscribe(reaction) {
    this.reaction = reaction;
  }

  _hitShip(cell) {
    const destroyed = this.ships
      .filter(ship => !ship.isDestroyed)
      .map(ship => ship.tryDestroy(cell))
      .find(ship => ship);

    if (destroyed) {
      this._markShipDestroyed(destroyed);
    }
  }

  _markShipDestroyed(ship) {
    this.field.changeCellsType(ship.cells, CELL_TYPE.DESTROY);
    this.field.changeCellsType(ship.boundaryCells, CELL_TYPE.MISS);
  }

  _tryCreateShip(shape) {
    while (true) {
      const shipDraft = this.shipyard.createShip(
        shape,
        this._getRandomRotation()
      );

      const cells = this._calculateShipCells(
        shipDraft,
        Cell.randomCell(this.fieldSize)
      );

      if (!this._validateCells(cells)) {
        continue;
      }

      return new Ship(cells, this.fieldSize);
    }
  }

  _calculateShipCells(shipDraft, startCell) {
    const cells = [startCell];

    shipDraft.forEach(block =>
      cells.push(_last(cells).getCellByDirection(block))
    );

    return cells;
  }

  _markShipsOnField() {
    this.ships.forEach(ship => {
      this.field.changeCellsType(ship.cells, CELL_TYPE.SHIP);
    });
  }

  _getRandomRotation() {
    const keys = Object.keys(ROTATIONS);

    return ROTATIONS[keys[_random(0, keys.length - 1)]];
  }

  _validateCells(cells) {
    if (cells.some(cell => !cell.isValid(this.fieldSize))) {
      return false;
    }

    if (
      cells.some(cell => this.ships.some(ship => ship.isInShipTerritory(cell)))
    ) {
      return false;
    }

    return true;
  }
}
