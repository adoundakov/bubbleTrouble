import MovingObject from './moving_object';

class Ship extends MovingObject {
  constructor(options) {
    options.color = "#C70039";
    options.rad = 15;
    options.pos = options.pos || [350, 300];
    super(options);
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  relocate () {
    this.pos = [350,300];
    this.vel = [0,0];
  }
}

export default Ship;
