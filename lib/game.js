import Bubble from './bubble';
import { between, wrap } from './util';
import Ship from './ship';

class Game {
  constructor(options, ctx) {
    this.bubbles = [];
    this.ship = [];
    this.ctx = ctx;
    this.DIM_X = options.dimX;
    this.DIM_Y = options.dimY;
    this.over = false;
    this.numBubbles = options.numBubbles;
    this.sizeRange = options.sizeRange;
    this.endless = false;
  }

  configure(options) {
    this.numBubbles = options.numBubbles;
    this.sizeRange = options.sizeRange;
  }

  setUp() {
    this.addBubbles();
    this.addShip();
  }

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
      let width = this.DIM_X / 2;
      let height = this.DIM_Y / 2;
      let options = {
        vel: [0,0],
        game: this,
        pos: [width, height],
        height,
        width
      };
      this.ship = [new Ship(options)];
    }
  }

  addBubbles() {
    this.ctx.globalAlpha = 0;
    while (this.bubbles.length < this.numBubbles) {
      let testPos = this.randomPosition();
      let options = {pos: testPos,
                     game: this,
                     range: this.sizeRange,
                     offset: this.bubbles.length};
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
    if (ctx.globalAlpha < 1) {
      ctx.globalAlpha += 0.015;
    }
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
      this.gameWon();
    } else {
      this.resetShip = false;
      this.moveObjects(delta);
      this.checkCollisions();
    }
  }

  restart() {
    this.bubbles = [];
    this.ship[0].relocate();
    this.over = false;
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
    if (this.endless) {
      let width = Math.floor(this.DIM_X / 2);
      let height = Math.floor(this.DIM_Y / 2);
      this.bubbles = [];
      this.ship[0].moveCenter();
      this.resetShip = true;
      if (this.ship[0].atPos([width, height])) {
        this.addBubbles();
      }
    } else {
      this.bubbles = [];
      this.over = true;
      this.gameView.toggleRun();
      this.ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
      $('#winGame').addClass('show');
      $('#newGameInfo').addClass('show');
    }
  }
}

export default Game;
