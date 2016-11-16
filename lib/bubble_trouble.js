import GameView from './game_view';
import Game from './game';

// ************************* TESTING ************************************
import * as Util from './util';
window.util = Util;
// ************************* TESTING ************************************

$(() => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");
  // maybe set game height and width here? or keep defaults in html

  let game = new Game(ctx);
  let gameView = new GameView(ctx, game);

  $('#newGame').click(() => {
    $('#newGame').removeClass('show');
    gameView.start();
  });

  // ************************* TESTING ************************************
  window.game = game;
  // ************************* TESTING ************************************
  $('#pause').click(() => gameView.toggleRun());
});
