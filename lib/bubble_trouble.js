import GameView from './game_view';
import Game from './game';

// ************************* TESTING ************************************
import * as Util from './util';
window.util = Util;
// ************************* TESTING ************************************

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");
  // maybe set game height and width here? or keep defaults in html

  let game = new Game();
  let gameView = new GameView(ctx, game);
  gameView.start();
});
