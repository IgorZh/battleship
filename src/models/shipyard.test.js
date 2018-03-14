import Shipyard, { shipsDrafts } from './shipyard';
import { DIRECTIONS } from 'consts/directions';
import { ROTATIONS } from 'consts/rotations';
import { SHAPES } from 'consts/ship';

let shipyard;
beforeEach(() => (shipyard = new Shipyard()));

test('should create ship for any shape by draft', () => {
  Object.keys(SHAPES).forEach(shape => {
    expect(shipyard.createShip(shape)).toEqual(shipsDrafts[shape]);
  });
});

describe('rotations', () => {
  test('should rotate to quatre', () => {
    const shipsDraft = [DIRECTIONS.TOP];
    const rotated = shipyard._rotateShipDraft(shipsDraft, ROTATIONS.QUARTER);

    expect(rotated).toEqual([DIRECTIONS.LEFT]);
  });

  test('should rotate to half', () => {
    const shipsDraft = [DIRECTIONS.TOP];
    const rotated = shipyard._rotateShipDraft(shipsDraft, ROTATIONS.HALF);

    expect(rotated).toEqual([DIRECTIONS.BOTTOM]);
  });

  test('should rotate to three quatre', () => {
    const shipsDraft = [DIRECTIONS.TOP];
    const rotated = shipyard._rotateShipDraft(
      shipsDraft,
      ROTATIONS.THREE_QUARTER
    );

    expect(rotated).toEqual([DIRECTIONS.RIGHT]);
  });
});
