import GameView from './game_view';
import Game from './game';
import { applyListeners, setOptions } from './util';

let gameOptions;

const handleDifficultyClick = (game) => {
  return e => {
    e.preventDefault();
    $('#difficulty').children().removeClass('selected');
    $(e.target).addClass('selected');
    game.configure(setOptions(e.target.id));
  };
};

const handleEndlessClick = (game) => {
  return e => {
    $(e.target).toggleClass('selected');
    game.endless = $(e.target).hasClass('selected');
  };
};

let ambient = new Howl({
  src: ['./lib/sounds/ambientslice.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.5,
  html5: true,
  preload: true
});

$(document).keypress((e) => {
  if (e.key === 'm') {
    if (ambient._muted) {
      ambient.mute(false);
    } else {
      ambient.mute(true);
    }
  }
});

$(() => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");

  gameOptions = setOptions(); // default to easy game
  let game = new Game(gameOptions, ctx);

  $('#difficulty').children().click(handleDifficultyClick(game));
  $('#endless').click(handleEndlessClick(game));

  let gameView = new GameView(ctx, game);


  applyListeners(gameView);

  // ************************* TESTING ************************************
  window.game = game;
  // ************************* TESTING ************************************
});

// To-do 11/16
//  Game settings are still clickable behind canvas
//  Work on absorption? Adjust inflation rate, add bubbles around contact point

//  Refactor game ending into two methods, game view calls game.reset etc.
//  Refactor start into two methods, one to initialize, another to do the rest of the setup when user hits space
