import MovingObject from './moving_object';

class Ship extends MovingObject {
  constructor(options) {
    options.color = "#C70039";
    options.rad = 15;
    options.pos = options.pos || [30, 300];
    super(options);
    this.impulse = 0;
    console.log(this);
  }

  relocate () {
    this.pos = [350,300];
  }
}

export default Ship;
