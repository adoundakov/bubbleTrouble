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
      let possBubble = new Bubble(options);

      if (!this.bubbles.some((bubble) => (bubble.isCollidedWith(possBubble)))) {
        this.bubbles.push(new Bubble(options));
      }
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

  checkCollisions () {
    for (var i = 0; i < this.bubbles.length; i++) {
      for (var j = i+1; j < this.bubbles.length; j++) {
        if (this.bubbles[i].isCollidedWith(this.bubbles[j])) {
          this.bubbles[i].collideWith(this.bubbles[j]);
        }
      }
    }
  }

  remove(obj) {
    if (obj instanceof Bubble) {
      this.bubbles.splice(this.bubbles.indexOf(obj), 1);
    } else {
      throw "Error, tried to remove non-existing object.";
    }
  }

  step (ctx) {
    this.moveObjects();
    this.checkCollisions();
    this.draw(ctx);
  }
}

const NUM_BUBBLES = 40;
const DIM_X = 700;
const DIM_Y = 600;

export default Game;
