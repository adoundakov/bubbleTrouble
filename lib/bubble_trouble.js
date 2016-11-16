import GameView from './game_view';
import Game from './game';

// ************************* TESTING ************************************
import * as Util from './util';
window.util = Util;
// ************************* TESTING ************************************

$(() => {
  const canvas = document.getElementById('canvas');

  let height = $(window).height();
  let width = $(window).width();

  $('#canvas').attr('height', `${height}`);
  $('#canvas').attr('width', `${width}`);

  const ctx = canvas.getContext("2d");
  let gameOptions = {
    dimX: width, dimY: height, numBubbles: 75,
    ctx
  };

  let game = new Game(gameOptions);
  let gameView = new GameView(ctx, game);

  $(document).keydown((e) => {
    if (e.which === 32) {
      $('#newGame').removeClass('show');
      $('#newGameInfo').removeClass('show');
      gameView.start();
    }
  });

  // ************************* TESTING ************************************
  window.game = game;
  // ************************* TESTING ************************************
});


// To-do 11/16
//  Add controls with icons to (menu, brought up by hitting escape)
//  Add game controls to menu
//  Dead icons / controls are ok
//  Add better win / loss controls than alerts
//  Connect buttons to 3 different options hashes (button flag --> options hash)
//  Work on absorption? Adjust inflation rate, add bubbles around contact point
//  Other physical showcase, instead of wrap can bounce?
//  Add speed limit to game?
//  Zoom out on win mechanic, go through 3 stages then win?
//  Endless mode checkbox zooms out forever, basic blue background
