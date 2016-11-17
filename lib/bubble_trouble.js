import GameView from './game_view';
import Game from './game';
import { applyListeners, setOptions } from './util';

let gameOptions;

const handleDifficultyClick = e => {
  e.preventDefault();
  $('#difficulty').children().removeClass('selected');
  $(e.target).addClass('selected');
  gameOptions = setOptions(e.target.id);
};

$(() => {
  $('#difficulty').children().click(handleDifficultyClick);
  gameOptions = setOptions(); // default to easy game

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext("2d");

  let game = new Game(gameOptions, ctx);
  let gameView = new GameView(ctx, game);

  applyListeners(gameView);

  // ************************* TESTING ************************************
  window.game = game;
  // ************************* TESTING ************************************
});

// To-do 11/16
//  Refactor game ending into two methods, game view calls game.reset etc.
//  Redo moves? can still queue moves while paused
//  Refactor start into two methods, one to initialize, another to do the rest of the setup when user hits space
//  Work on absorption? Adjust inflation rate, add bubbles around contact point
//  Zoom out on win mechanic, go through 3 stages then win?
//  Endless mode checkbox zooms out forever, basic blue background
