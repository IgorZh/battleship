import Field from './field';
import { CELL_TYPE } from 'consts/cell';

test('should initialize to dimension square array', () => {
  const fieldSize = 10;
  const field = new Field(fieldSize);

  expect(field.cells.length).toEqual(fieldSize);

  field.cells.forEach(row => expect(row.length).toEqual(fieldSize));
});

test('should initialize with empty cells', () => {
  const fieldSize = 2;
  const field = new Field(fieldSize);

  field.cells.forEach(row =>
    row.every(cell => expect(cell).toBe(CELL_TYPE.EMPTY))
  );
});

test('should change cell', () => {
  const fieldSize = 2;
  const field = new Field(fieldSize);

  field.changeCellType(1, 1, CELL_TYPE.SHIP);

  expect(field.cells[1][1]).toBe(CELL_TYPE.SHIP);
});
