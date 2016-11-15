import MovingObject from './moving_object';
import * as Util from './util';

class Bubble extends MovingObject {
  constructor(options) {
    this.color = Util.randomBlueWhite();
    this.rad = Util.randomRadius(5,35);
    this.vel = Util.randomVel(6);
    this.pos = options.pos || options.game.randomPosition();
    super(options);
  }
}

export default Bubble;
