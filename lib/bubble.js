import MovingObject from './moving_object';
import * as Util from './util';
import Ship from './ship';

class Bubble extends MovingObject {
  constructor(options) {
    options.color = options.color || Util.randomBlueWhite();
    options.rad = options.rad ||
                  Util.randomRadius(options.range[0],options.range[1]);
    options.vel = options.val || Util.randomVel(0.08);
    options.pos = options.pos || options.game.randomPosition();
    super(options);
  }

  collideWith(other) {
    if (this.rad >= other.rad) {
      this.rad += other.rad * 0.075;
      other.rad *= 0.80;
      if (other.rad < 2) {
        other.remove();
      }
    } else {
      other.rad += this.rad * 0.075;
      this.rad *= 0.80;
      if (this.rad < 2) {
        this.remove();
      }
    }
  }
}

export default Bubble;
