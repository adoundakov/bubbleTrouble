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
  loop: true,
  volume: 0,
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
  window.setTimeout(() => {
    ambient.play();
    ambient.fade(0,0.5,500);
  }, 250); // minimize cutting in of audio

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");

  gameOptions = setOptions(); // default to easy game
  let game = new Game(gameOptions, ctx);

  $('#difficulty').children().click(handleDifficultyClick(game));
  $('#endless').click(handleEndlessClick(game));

  let gameView = new GameView(ctx, game);


  applyListeners(gameView);
});

// To-do 11/18
//  Work on absorption? Adjust inflation rate, add bubbles around contact point?
