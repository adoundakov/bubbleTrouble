import Bubble from './bubble';
import { between, wrap } from './util';
import Ship from './ship';

class Game {
  constructor() {
    this.bubbles = [];
    this.addBubbles();
    this.addShip();
  }

  allObjects () {
    return this.bubbles.concat([this.ship]);
  }

  wrap(pos) {
    pos[0] = wrap(pos[0], DIM_X);
    pos[1] = wrap(pos[1], DIM_Y);
    return pos;
  }

  addShip () {
    let options = {
      vel: [0,0],
      game: this
    };
    this.ship = new Ship(options);
  }

  addBubbles() {
    while (this.bubbles.length < NUM_BUBBLES) {
      let testPos = this.randomPosition();
      let options = {pos: testPos,
                     game: this};
      let possBubble = new Bubble(options);

      if (!this.bubbles.some((bubble) => (bubble.isCollidedWith(possBubble)))) {
        this.bubbles.push(new Bubble(options));
      }
    }
  }

  randomPosition() {
    let testPos = [Math.random() * DIM_X, Math.random() * DIM_Y];
    let xMin = DIM_X / 2 - 50;
    let xMax = DIM_X / 2 + 50;
    let yMin = DIM_Y / 2 - 50;
    let yMax = DIM_Y / 2 + 50;

    if (between(xMin, xMax, testPos[0])
          || between(yMin, yMax, testPos[1])) {
      testPos[0] += 125;
      testPos[1] += 125;
    }

    return testPos;
  }

  draw(ctx) {
    ctx.clearRect(0,0,DIM_X, DIM_Y);
    this.allObjects().forEach((el) => el.draw(ctx));
  }

  moveObjects() {
    this.allObjects().forEach((el) => el.move());
  }

  checkCollisions () {
    for (var i = 0; i < this.allObjects().length; i++) {
      for (var j = i+1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
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

const NUM_BUBBLES = 50;
const DIM_X = 700;
const DIM_Y = 600;

export default Game;
