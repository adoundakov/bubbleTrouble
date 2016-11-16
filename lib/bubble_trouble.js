import GameView from './game_view';
import Game from './game';

// ************************* TESTING ************************************
import * as Util from './util';
window.util = Util;
// ************************* TESTING ************************************

let gameOptions;

const handleDifficultyClick = e => {
  e.preventDefault();
  $(e.currentTarget).children().removeClass('selected');
  $(e.target).addClass('selected');
  setOptions(e.target.id);
};

const setOptions = id => {
  let height = $(window).height();
  let width = $(window).width();

  $('#canvas').attr('height', `${height}`);
  $('#canvas').attr('width', `${width}`);

  switch (id) {
    case 'easy':
      gameOptions = {dimX: width, dimY: height, numBubbles: 25};
      break;
    case 'med':
      gameOptions = {dimX: width, dimY: height, numBubbles: 45};
      break;
    case 'hard':
      gameOptions = {dimX: width, dimY: height, numBubbles: 65};
      break;
    default:

  }
};

$(() => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");
  let game;
  setOptions('easy'); // default to easy game

  $('#difficulty').click(handleDifficultyClick);

  $(document).keydown((e) => {
    if (e.which === 32) {
      game = new Game(gameOptions, ctx);
      let gameView = new GameView(ctx, game);
      $('.game-overlay').removeClass('show');
      gameView.start();
    }
  });

  // ************************* TESTING ************************************
  window.game = game;
  // ************************* TESTING ************************************
});

// To-do 11/16
//  Work on absorption? Adjust inflation rate, add bubbles around contact point
//  Other physical showcase, instead of wrap can bounce?
//  Zoom out on win mechanic, go through 3 stages then win?
//  Endless mode checkbox zooms out forever, basic blue background
