import Bubble from './bubble';
import { between, wrap } from './util';
import Ship from './ship';

class Game {
  constructor(options, ctx) {
    this.bubbles = [];
    this.ctx = ctx;
    this.DIM_X = options.dimX;
    this.DIM_Y = options.dimY;
    this.over = false;
    this.numBubbles = options.numBubbles;
    this.sizeRange = options.sizeRange;
    this.addBubbles();
    this.addShip();
  }

  // configure(options) {
  //   // this.restart();
  //   this.numBubbles = options.numBubbles;
  // }

  allObjects () {
    return this.bubbles.concat(this.ship);
  }

  wrap(pos) {
    pos[0] = wrap(pos[0], this.DIM_X);
    pos[1] = wrap(pos[1], this.DIM_Y);
    return pos;
  }

  addShip () {
    if (this.addShip.length === 0) {
      let options = {
        vel: [0,0],
        game: this,
        pos: [(this.DIM_X / 2), (this.DIM_Y / 2)]
      };
      this.ship = [new Ship(options)];
    }
  }

  addBubbles() {
    while (this.bubbles.length < this.numBubbles) {
      let testPos = this.randomPosition();
      let options = {pos: testPos,
                     game: this,
                     range: this.sizeRange};
      let possBubble = new Bubble(options);
      if (!this.bubbles.some((bubble) => (bubble.isCollidedWith(possBubble)))) {
        this.bubbles.push(possBubble);
      }
    }
  }

  randomPosition() {
    let testPos = [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
    let xMin = this.DIM_X / 2 - 50;
    let xMax = this.DIM_X / 2 + 50;
    let yMin = this.DIM_Y / 2 - 50;
    let yMax = this.DIM_Y / 2 + 50;

    // ensures that no bubbles spawn too close to player
    if (between(xMin, xMax, testPos[0])
          || between(yMin, yMax, testPos[1])) {
      testPos[0] += 125;
      testPos[1] += 125;
    }

    return testPos;
  }

  draw(ctx) {
    ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    this.allObjects().forEach((el) => el.draw(ctx));
  }

  moveObjects(delta) {
    this.ship[0].power();
    this.allObjects().forEach((el) => el.move(delta));
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
      $(document).off('keydown');
      this.gameLost();
    } else {
      throw "Error, tried to remove non-existing object.";
    }
  }

  step(delta) {
    if (this.allObjects()[0] === this.ship[0] && this.ship[0].rad !== 10) {
      $(document).off('keydown');
      this.gameWon();
    } else {
      this.moveObjects(delta);
      this.checkCollisions();
    }
  }

  restart() {
    this.bubbles = [];
    this.ship[0].relocate();
    this.over = false;
    this.addBubbles();
    this.addShip();
  }

  gameLost() {
    this.bubbles = [];
    this.over = true;
    this.gameView.toggleRun();
    this.ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    $('#loseGame').addClass('show');
    $('#newGameInfo').addClass('show');
  }

  gameWon() {
    this.bubbles = [];
    this.over = true;
    this.gameView.toggleRun();
    this.ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    $('#winGame').addClass('show');
    $('#newGameInfo').addClass('show');
  }
}

export default Game;
