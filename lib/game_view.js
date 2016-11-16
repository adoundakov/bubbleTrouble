class GameView {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
    this.run = true;
    this.toggleRun.bind(this);
  }

  start() {
    // starts animations for bubbleTrouble
    this.game.restart();
    this.bindKeys();
    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeys() {
    const ship = this.game.ship[0];  // since ship is stored in an array
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
      key(k, () => { ship.power(MOVES[k]);});
    });

    key('p', () => this.toggleRun());
  }

  toggleRun () {
    this.run = !this.run;
    if (this.run) {
      this.animate();
      $('#canvas').removeClass('blur');
      $('#paused').removeClass('show');
    } else {
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

GameView.MOVES = {
  "w": [ 0, -1],
  "a": [-1,  0],
  "s": [ 0,  1],
  "d": [ 1,  0],
  "up": [ 0, -1],
  "left": [-1,  0],
  "down": [ 0,  1],
  "right": [ 1,  0],
};

export default GameView;
