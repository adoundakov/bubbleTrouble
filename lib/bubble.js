import MovingObject from './moving_object';
import * as Util from './util';
import Ship from './ship';

let pop = new Howl({
  src: ["./lib/sounds/blop.mp3"],
  html5: true,
  preload: true,
  volume: 0.2
});

class Bubble extends MovingObject {
  constructor(options) {
    options.color = options.color || Util.randomBlueWhite();
    options.rad = options.rad ||
                  Util.randomRadius(options.range[0],
                                    options.range[1],
                                    options.offset);
    options.vel = options.val || Util.randomVel(0.08);
    options.pos = options.pos || options.game.randomPosition();
    super(options);
  }

  collideWith(other) {
    if (this.rad >= other.rad) {
      this.rad += other.rad * 0.025;
      other.rad *= 0.80;
      if (other.rad < 2) {
        pop.play();
        other.remove();
      }
    } else {
      other.rad += this.rad * 0.025;
      this.rad *= 0.80;
      if (this.rad < 2) {
        pop.play();
        this.remove();
      }
    }
  }
}

export default Bubble;
