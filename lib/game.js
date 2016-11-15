import Bubble from './bubble';

class Game {
  constructor() {
    this.bubbles = [];
    this.addBubbles();
  }

  wrap(pos) {
    if (pos[0] > DIM_X + 50) {
      pos[0] = -49;
    } else if (pos[0] < -50) {
      pos[0] = 749;
    }

    if (pos[1] > DIM_Y + 50) {
      pos[1] = -49;
    } else if (pos[1] < -50) {
      pos[1] = 749;
    }

    return pos;
  }
  addBubbles() {
    while (this.bubbles.length < NUM_BUBBLES) {
      let options = {pos: this.randomPosition(),
                     game: this};
      this.bubbles.push(new Bubble(options));
    }
  }

  randomPosition() {
    return [Math.random() * DIM_X, Math.random() * DIM_Y];
  }

  draw(ctx) {
    ctx.clearRect(0,0,DIM_X, DIM_Y);
    this.bubbles.forEach((bubble) => bubble.draw(ctx));
  }

  moveObjects() {
    this.bubbles.forEach((bubble) => bubble.move());
  }
}

const NUM_BUBBLES = 50;
const DIM_X = 700;
const DIM_Y = 600;

export default Game;
