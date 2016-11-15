import MovingObject from './moving_object';
import * as Util from './util';

class Bubble extends MovingObject {
  constructor(options) {
    options.color = Util.randomBlueWhite();
    options.rad = Util.randomRadius(5,35);
    options.vel = Util.randomVel(0.25);
    options.pos = options.pos || options.game.randomPosition();
    super(options);
  }
}

export default Bubble;
