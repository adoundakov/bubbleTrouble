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
    if (this.game.over) {
      this.game.restart();
    }

    this.lastTime = 0;
    this.run = true;
    this.bindKeys();
    this.animate();
  }

  bindKeys() {
    const ship = this.game.ship[0];  // since ship is stored in an array
    $(document).keydown(e => ship.accelerate(e));
    $(document).keyup(e => ship.accelerate(e));
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

  animate(time) {
    let delta = time - this.lastTime;

    if (this.run) {
      this.game.step(delta);
      this.game.draw(this.ctx);
      this.lastTime = time;
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

export default GameView;
