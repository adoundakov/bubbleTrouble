import MovingObject from './moving_object';

class Ship extends MovingObject {
  constructor(options) {
    options.color = "#C70039";
    options.rad = 10;
    options.pos = options.pos || [350, 300];
    super(options);
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  // will replace with either lives or some sort of game over trigger
  relocate () {
    this.pos = [350,300];
    this.vel = [0,0];
  }
}

export default Ship;
