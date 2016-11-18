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
      this.vel[1] -= 0.1;
    }
    if (this.left) {
      this.vel[0] -= 0.1;
    }
    if (this.down) {
      this.vel[1] += 0.1;
    }
    if (this.right) {
      this.vel[0] += 0.1;
    }
  }

  relocate() {
    this.pos = [this.height,this.width];
    this.vel = [0,0];
    this.rad = 10;
  }

  stop() {
    this.pos[0] = Math.floor(this.pos[0]);
    this.pos[1] = Math.floor(this.pos[1]);
    this.vel = [0,0];
    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;
  }

  moveCenter() {
    this.stop();
    if (this.height > this.pos[1]) {
      this.pos[1] += 1;
    } else if (this.height < this.pos[1]) {
      this.pos[1] -= 1;
    }

    if (this.width > this.pos[0]) {
      this.pos[0] += 1;
    } else if (this.width < this.pos[0]) {
      this.pos[0] -= 1;
    }

    if (this.rad > 10) {
      this.rad *= 0.98;
    } else if (this.rad < 10) {
      this.rad *= 1.02;
    }
  }

  atPos(tgtPos) {
    console.log('pos ' + this.pos + ' vs ' + tgtPos);
    if (this.pos[0] === tgtPos[0] && this.pos[1] === tgtPos[1]) {
      return true;
    } else {
      return false;
    }
  }
}

export default Ship;
