class GameView {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    // starts animations for bubbleTrouble
    this.bindKeys();
    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeys() {
    const ship = this.game.ship;
    const MOVES = {
      "w": [ 0, -1],
      "a": [-1,  0],
      "s": [ 0,  1],
      "d": [ 1,  0],
      "up": [ 0, -1],
      "left": [-1,  0],
      "down": [ 0,  1],
      "right": [ 1,  0],
    };

    Object.keys(MOVES).forEach((k) => {
      let command = MOVES[k];
      key(k, () => { ship.power(MOVES[k]);});
    });
  }

  animate(time) {
    // will use time to compute dt (time delta)
    this.game.step(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
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
