import MovingObject from './moving_object';
import Bubble from './bubble';
import { invert, offset } from './util';

class Ship extends MovingObject {
  constructor(options) {
    options.color = "#C70039";
    options.rad = 10;
    options.pos = options.pos;
    super(options);
    this.relocate = this.relocate.bind(this);
    this.height = options.height;
    this.width = options.width;
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate () {
    this.pos = [this.height,this.width];
    this.vel = [0,0];
    this.rad = 10;
  }
}

export default Ship;
