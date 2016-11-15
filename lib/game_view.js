class GameView {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    // starts animations for bubbleTrouble
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    // will use time to compute dt (time delta)
    this.game.step(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;
