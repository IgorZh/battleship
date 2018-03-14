import { DIRECTIONS } from 'consts/directions';
import { ROTATIONS } from 'consts/rotations';
import { SHAPES } from 'consts/ship';

export const shipsDrafts = {
  [SHAPES.DOT]: [],
  [SHAPES.L]: [DIRECTIONS.RIGHT, DIRECTIONS.RIGHT, DIRECTIONS.TOP],
  [SHAPES.I]: [DIRECTIONS.RIGHT, DIRECTIONS.RIGHT, DIRECTIONS.RIGHT],
};

const directionRotations = {
  [DIRECTIONS.RIGHT]: DIRECTIONS.TOP,
  [DIRECTIONS.TOP]: DIRECTIONS.LEFT,
  [DIRECTIONS.LEFT]: DIRECTIONS.BOTTOM,
  [DIRECTIONS.BOTTOM]: DIRECTIONS.RIGHT,
};

export default class Shipyard {
  createShip(shape, rotation) {
    return this._rotateShipDraft(shipsDrafts[shape], rotation);
  }

  _rotateShipDraft(shipDraft, rotation) {
    return shipDraft.map(block => {
      switch (rotation) {
        case ROTATIONS.QUARTER:
          return directionRotations[block];
        case ROTATIONS.HALF:
          return [1, 2].reduce(
            (newBlock, index) => directionRotations[newBlock],
            block
          );
        case ROTATIONS.THREE_QUARTER:
          return [1, 2, 3].reduce(
            (newBlock, index) => directionRotations[newBlock],
            block
          );
        default:
          return block;
      }
    });
  }
}
