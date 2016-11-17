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

  accelerate(event) {
    let key = event.key;
    if (key === 'w' || key === 'ArrowUp') {
      if (event.type === 'keydown') {
        this.up = true;
      } else if (event.type === 'keyup') {
        this.up = false;
      }
    }
    if (key === 'a' || key === 'ArrowLeft') {
      if (event.type === 'keydown') {
        this.left = true;
      } else if (event.type === 'keyup') {
        this.left = false;
      }    }

    if (key === 's' || key === 'ArrowDown') {
      if (event.type === 'keydown') {
        this.down = true;
      } else if (event.type === 'keyup') {
        this.down = false;
      }    }

    if (key === 'd' || key === 'ArrowRight') {
      if (event.type === 'keydown') {
        this.right = true;
      } else if (event.type === 'keyup') {
        this.right = false;
      }    }
  }

  power() {
    if (this.up) {
      this.vel[1] -= 0.2;
    }
    if (this.left) {
      this.vel[0] -= 0.2;
    }
    if (this.down) {
      this.vel[1] += 0.2;
    }
    if (this.right) {
      this.vel[0] += 0.2;
    }
  }

  relocate () {
    this.pos = [this.height,this.width];
    this.vel = [0,0];
    this.rad = 10;
  }
}

export default Ship;
