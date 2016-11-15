class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.rad = options.rad;
    this.color = options.color;
    this.game = options.game;
  }

  collideWith(other) {
    // stuff coming later
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.rad, 0, 2*Math.PI, true);
    ctx.fill();
  }

  isCollidedWith(other) {
    // coming soon
  }

  move(dt) {
    // increments postion by velocity
    // if out of bounds, will wrap
    // simple animation now, will add dt later

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  remove() {
    this.game.remove(this);
  }
}

export default MovingObject;
