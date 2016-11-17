import { applyListeners } from './util';

class GameView {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
    this.game.gameView = this;
    this.run = true;
    this.toggleRun.bind(this);
  }

  start() {
    // starts animations for bubbleTrouble
    this.game.restart();
    this.run = true;
    this.bindKeys();
    this.animate();
  }

  bindKeys() {
    const ship = this.game.ship[0];  // since ship is stored in an array
    const self = this;
    const MOVES = {
      "w": [ 0, -.75],
      "a": [-.75,  0],
      "s": [ 0,  .75],
      "d": [ .75,  0],
      "up": [ 0, -.75],
      "left": [-.75,  0],
      "down": [ 0,  .75],
      "right": [ .75,  0],
    };

    Object.keys(MOVES).forEach((k) => {
      let command = MOVES[k];
      key(k, () => {
        if (self.run) {
          ship.power(MOVES[k]);
        }
      });
    });
  }

  toggleRun () {
    this.run = !this.run;

    if (this.game.over) {
      applyListeners(this);
    }

    if (this.run && !this.game.over) {
      this.animate();
      $('#canvas').removeClass('blur');
      $('#paused').removeClass('show');
    } else if (!this.run && !this.game.over) {
      $('#canvas').addClass('blur');
      $('#paused').addClass('show');
    }
  }

  animate() {
    if (this.run) {
      this.game.step(this.ctx);
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

export default GameView;
