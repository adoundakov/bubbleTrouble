import MovingObject from './moving_object';
import Bubble from './bubble';
import { invert, offset } from './util';

class Ship extends MovingObject {
  constructor(options) {
    let height = Math.floor($(window).height() / 2);
    let width = Math.floor($(window).width() / 2);
    options.color = "#C70039";
    options.rad = 10;
    options.pos = options.pos || [width, height];
    super(options);
    this.relocate = this.relocate.bind(this);
    this.height = height;
    this.width = width;
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    this.spawnBubble();
    this.rad *= 0.995;
  }

  spawnBubble() {
    this.game.addBubble({
      pos: offset(this.pos, this.vel, this.rad),
      vel: invert(this.vel),
      rad: 1,
      game: this.game,
      color: "#C70039"
    });
  }

  relocate () {
    this.pos = [this.height,this.width];
    this.vel = [0,0];
    this.rad = 10;
  }
}

export default Ship;
