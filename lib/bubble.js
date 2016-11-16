import MovingObject from './moving_object';
import * as Util from './util';
import Ship from './ship';

class Bubble extends MovingObject {
  constructor(options) {
    options.color = Util.randomBlueWhite();
    options.rad = options.rad || Util.randomRadius(5,20);
    options.vel = Util.randomVel(0.1);
    options.pos = options.pos || options.game.randomPosition();
    super(options);
  }

  collideWith(other) {
    // should change this to handle absorption
    if (this.rad >= other.rad) {
      this.rad += (other.rad / 6.667) / 4;
      other.rad *= 0.90;
    } else {
      other.rad += (this.rad / 6.667) / 4;
      this.rad *= 0.90;
    }

    if (this.rad < 3) {
      this.remove();
    } else if (other.rad < 1) {
      other.remove();
    }
  }
}

export default Bubble;
