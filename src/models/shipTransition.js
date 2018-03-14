import { ROTATIONS } from 'consts/ship';

class ShipTransition {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  rotate(rotation) {
    const tmp = this.y;

    switch (rotation) {
      case ROTATIONS.QUOTER:
        this.y = -this.x;
        this.x = tmp;
        break;
      case ROTATIONS.HALF:
        this.y = -this.y;
        this.x = -this.x;
        break;
      case ROTATIONS.THREE_QUARTER:
        this.y = this.x;
        this.x = -tmp;
        break;
      default:
        break;
    }
  }
}
