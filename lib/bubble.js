import MovingObject from './moving_object';
import * as Util from './util';
import Ship from './ship';

class Bubble extends MovingObject {
  constructor(options) {
    options.color = Util.randomBlueWhite();
    options.rad = options.rad || Util.randomRadius(5,25);
    options.vel = Util.randomVel(0.1);
    options.pos = options.pos || options.game.randomPosition();
    super(options);
  }

  collideWith(other) {
    // should change this to handle absorption
    if (other instanceof Ship) {
      other.relocate();
    } else {
      this.remove();
      other.remove();
    }
  }
}

export default Bubble;
