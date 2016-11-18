import { distance } from './util';

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.rad = options.rad;
    this.color = options.color;
    this.game = options.game;
  }

  collideWith(other) {
    // default no-op
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.rad, 0, 2*Math.PI, true);
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.fill();
  }

  isCollidedWith(other) {
    // objects are collided when center distance is < sum(radii)
    let centerDistance = distance(this.pos, other.pos);
    return centerDistance <= (this.rad + other.rad);
  }

  move(delta) {
    if (isNaN(delta)) {
      delta = 16.6666667;
    }

    let velScale = delta / (1000/60),
        offsetX = this.vel[0] * velScale,
        offsetY = this.vel[1] * velScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    this.pos = this.game.wrap(this.pos);
  }

  remove() {
    this.game.remove(this);
  }
}

export default MovingObject;
