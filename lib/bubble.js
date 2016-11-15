import MovingObject from './moving_object';
import * as Util from './util';

class Bubble extends MovingObject {
  constructor(options) {
    options.color = Util.randomBlueWhite();
    options.rad = options.rad || Util.randomRadius(5,25);
    options.vel = Util.randomVel(0.1);
    options.pos = options.pos || options.game.randomPosition();
    super(options);
  }
}

export default Bubble;
