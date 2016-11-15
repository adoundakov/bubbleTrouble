import Bubble from './bubble';

class Game {
  constructor() {
    this.bubbles = [];
    this.addBubbles();
  }

  addBubbles() {
    while (this.bubbles.length < NUM_BUBBLES) {
      let options = {pos: this.randomPosition()};
      this.bubbles.push(new Bubble(options));
    }
  }

  randomPosition() {
    return [Math.random() * DIM_X, Math.random() * DIM_Y];
  }

  draw(ctx) {
    ctx.clearRect();
    this.bubbles.forEach((bubble) => bubble.draw(ctx));
  }

  moveObjects() {
    this.bubbles.forEach((bubble) => bubble.move());
  }
}

const NUM_BUBBLES = 25;
const DIM_X = 700;
const DIM_Y = 600;

export default Game;
