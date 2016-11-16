import Bubble from './bubble';
import { between, wrap } from './util';
import Ship from './ship';

class Game {
  constructor(ctx) {
    this.bubbles = [];
    this.ctx = ctx;
    this.addBubbles();
    this.addShip();
  }

  allObjects () {
    return this.bubbles.concat(this.ship);
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
    this.ship = [new Ship(options)];
    console.log(this.ship);
  }

  addBubbles() {
    while (this.bubbles.length < NUM_BUBBLES) {
      let testPos = this.randomPosition();
      let options = {pos: testPos,
                     game: this};
      let possBubble = new Bubble(options);

      if (!this.bubbles.some((bubble) => (bubble.isCollidedWith(possBubble)))) {
        this.bubbles.push(possBubble);
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
    } else if (obj instanceof Ship) {
      this.reset();                   // reset board
      this.ctx.clearRect(0,0,DIM_X, DIM_Y); // with a blank rect
      $('#newGame').addClass('show'); // offer to start new game
      alert('Game Over!');
    } else {
      throw "Error, tried to remove non-existing object.";
    }
  }

  step (ctx) {
    if (this.allObjects()[0] === this.ship[0] && this.ship.length !== 0) {
      alert('WINNER!');
      this.reset();
      this.ctx.clearRect(0,0,DIM_X, DIM_Y); // with a blank rect
      $('#newGame').addClass('show'); // offer to start new game
    } else {
      this.moveObjects();
      this.checkCollisions();
      this.draw(ctx);
    }
  }

  reset() {
    this.bubbles = [];
    this.ship = [];
  }

  restart() {
    if (this.allObjects().length === 0) {
      this.addBubbles();
      this.addShip();
    }
  }
}

const NUM_BUBBLES = 50;
const DIM_X = 700;
const DIM_Y = 600;

export default Game;
