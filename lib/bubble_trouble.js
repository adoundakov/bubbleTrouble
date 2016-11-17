import GameView from './game_view';
import Game from './game';

let gameOptions;

const handleDifficultyClick = e => {
  e.preventDefault();
  $('#difficulty').children().removeClass('selected');
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
      gameOptions = {dimX: width, dimY: height,
                     numBubbles: 30, sizeRange: [3, 20]};
      break;
    case 'med':
      gameOptions = {dimX: width, dimY: height,
                     numBubbles: 50, sizeRange: [6, 25]};
      break;
    case 'hard':
      gameOptions = {dimX: width, dimY: height,
                     numBubbles: 70, sizeRange: [6, 40]};
      break;
    default:
  }
};

$(() => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");


  setOptions('easy'); // default to easy game
  let game = new Game(gameOptions, ctx);
  let gameView = new GameView(ctx, game);

  $('#difficulty').children().click(handleDifficultyClick);

  $(document).keydown((e) => {
    if (e.which === 32) {
      $('.game-overlay').removeClass('show');
      gameView.start();
      $(document).off('keydown');
      $(document).keydown(event => {
        if (event.which === 80) {
          gameView.toggleRun();
        }
      });
    }
  });

  // ************************* TESTING ************************************
  window.game = game;
  // ************************* TESTING ************************************
});

// To-do 11/16
//  Refactor game ending into two methods, game view calls game.reset etc.
//  Refactor start into two methods, one to initialize, another to do the rest of the setup when user hits space
//  Work on absorption? Adjust inflation rate, add bubbles around contact point
//  Zoom out on win mechanic, go through 3 stages then win?
//  Endless mode checkbox zooms out forever, basic blue background
