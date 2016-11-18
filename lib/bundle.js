/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game_view = __webpack_require__(1);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	var _game = __webpack_require__(2);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _util = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var gameOptions = void 0;
	
	var handleDifficultyClick = function handleDifficultyClick(game) {
	  return function (e) {
	    e.preventDefault();
	    $('#difficulty').children().removeClass('selected');
	    $(e.target).addClass('selected');
	    game.configure((0, _util.setOptions)(e.target.id));
	  };
	};
	
	var handleEndlessClick = function handleEndlessClick(game) {
	  return function (e) {
	    $(e.target).toggleClass('selected');
	    game.endless = $(e.target).hasClass('selected');
	  };
	};
	
	var ambient = new Howl({
	  src: ['./lib/sounds/ambientslice.mp3'],
	  autoplay: true,
	  loop: true,
	  volume: 0.5,
	  html5: true,
	  preload: true
	});
	
	$(document).keypress(function (e) {
	  if (e.key === 'm') {
	    if (ambient._muted) {
	      ambient.mute(false);
	    } else {
	      ambient.mute(true);
	    }
	  }
	});
	
	$(function () {
	  var canvas = document.getElementById('canvas');
	  var ctx = canvas.getContext("2d");
	
	  gameOptions = (0, _util.setOptions)(); // default to easy game
	  var game = new _game2.default(gameOptions, ctx);
	
	  $('#difficulty').children().click(handleDifficultyClick(game));
	  $('#endless').click(handleEndlessClick(game));
	
	  var gameView = new _game_view2.default(ctx, game);
	
	  (0, _util.applyListeners)(gameView);
	
	  // ************************* TESTING ************************************
	  window.game = game;
	  // ************************* TESTING ************************************
	});
	
	// To-do 11/16
	//  Game settings are still clickable behind canvas
	//  Work on absorption? Adjust inflation rate, add bubbles around contact point
	
	//  Refactor game ending into two methods, game view calls game.reset etc.
	//  Refactor start into two methods, one to initialize, another to do the rest of the setup when user hits space

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(ctx, game) {
	    _classCallCheck(this, GameView);
	
	    this.ctx = ctx;
	    this.game = game;
	    this.game.gameView = this;
	    this.run = true;
	    this.toggleRun.bind(this);
	  }
	
	  _createClass(GameView, [{
	    key: 'start',
	    value: function start() {
	      if (this.game.over) {
	        this.game.restart();
	      }
	      this.game.setUp();
	      this.lastTime = 0;
	      this.run = true;
	      this.bindKeys();
	      this.animate();
	    }
	  }, {
	    key: 'bindKeys',
	    value: function bindKeys() {
	      var ship = this.game.ship[0]; // since ship is stored in an array
	      $(document).keydown(function (e) {
	        return ship.accelerate(e);
	      });
	      $(document).keyup(function (e) {
	        return ship.accelerate(e);
	      });
	    }
	  }, {
	    key: 'toggleRun',
	    value: function toggleRun() {
	      this.run = !this.run;
	
	      if (this.game.over) {
	        (0, _util.applyListeners)(this);
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
	  }, {
	    key: 'animate',
	    value: function animate(time) {
	      var delta = time - this.lastTime;
	
	      if (this.run) {
	        this.game.step(delta);
	        this.game.draw(this.ctx);
	        this.lastTime = time;
	        requestAnimationFrame(this.animate.bind(this));
	      }
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _bubble = __webpack_require__(3);
	
	var _bubble2 = _interopRequireDefault(_bubble);
	
	var _util = __webpack_require__(5);
	
	var _ship = __webpack_require__(6);
	
	var _ship2 = _interopRequireDefault(_ship);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(options, ctx) {
	    _classCallCheck(this, Game);
	
	    this.bubbles = [];
	    this.ship = [];
	    this.ctx = ctx;
	    this.DIM_X = options.dimX;
	    this.DIM_Y = options.dimY;
	    this.over = false;
	    this.numBubbles = options.numBubbles;
	    this.sizeRange = options.sizeRange;
	    this.endless = false;
	  }
	
	  _createClass(Game, [{
	    key: 'configure',
	    value: function configure(options) {
	      this.numBubbles = options.numBubbles;
	      this.sizeRange = options.sizeRange;
	    }
	  }, {
	    key: 'setUp',
	    value: function setUp() {
	      this.addBubbles();
	      this.addShip();
	    }
	  }, {
	    key: 'allObjects',
	    value: function allObjects() {
	      return this.bubbles.concat(this.ship);
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap(pos) {
	      pos[0] = (0, _util.wrap)(pos[0], this.DIM_X);
	      pos[1] = (0, _util.wrap)(pos[1], this.DIM_Y);
	      return pos;
	    }
	  }, {
	    key: 'addShip',
	    value: function addShip() {
	      if (this.addShip.length === 0) {
	        var width = this.DIM_X / 2;
	        var height = this.DIM_Y / 2;
	        var options = {
	          vel: [0, 0],
	          game: this,
	          pos: [width, height],
	          height: height,
	          width: width
	        };
	        this.ship = [new _ship2.default(options)];
	      }
	    }
	  }, {
	    key: 'addBubbles',
	    value: function addBubbles() {
	      var _this = this;
	
	      this.ctx.globalAlpha = 0;
	
	      var _loop = function _loop() {
	        var testPos = _this.randomPosition();
	        var options = { pos: testPos,
	          game: _this,
	          range: _this.sizeRange,
	          offset: _this.bubbles.length };
	        var possBubble = new _bubble2.default(options);
	        if (!_this.bubbles.some(function (bubble) {
	          return bubble.isCollidedWith(possBubble);
	        })) {
	          _this.bubbles.push(possBubble);
	        }
	      };
	
	      while (this.bubbles.length < this.numBubbles) {
	        _loop();
	      }
	    }
	  }, {
	    key: 'randomPosition',
	    value: function randomPosition() {
	      var testPos = [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
	      var xMin = this.DIM_X / 2 - 50;
	      var xMax = this.DIM_X / 2 + 50;
	      var yMin = this.DIM_Y / 2 - 50;
	      var yMax = this.DIM_Y / 2 + 50;
	
	      // ensures that no bubbles spawn too close to player
	      if ((0, _util.between)(xMin, xMax, testPos[0]) || (0, _util.between)(yMin, yMax, testPos[1])) {
	        testPos[0] += 125;
	        testPos[1] += 125;
	      }
	
	      return testPos;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      if (ctx.globalAlpha < 1) {
	        ctx.globalAlpha += 0.015;
	      }
	      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	      this.allObjects().forEach(function (el) {
	        return el.draw(ctx);
	      });
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects(delta) {
	      this.ship[0].power();
	      this.allObjects().forEach(function (el) {
	        return el.move(delta);
	      });
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      for (var i = 0; i < this.allObjects().length; i++) {
	        for (var j = i + 1; j < this.allObjects().length; j++) {
	          if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
	            this.allObjects()[i].collideWith(this.allObjects()[j]);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'remove',
	    value: function remove(obj) {
	      if (obj instanceof _bubble2.default) {
	        this.bubbles.splice(this.bubbles.indexOf(obj), 1);
	      } else if (obj instanceof _ship2.default) {
	        $(document).off('keydown');
	        this.gameLost();
	      } else {
	        throw "Error, tried to remove non-existing object.";
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step(delta) {
	      if (this.allObjects()[0] === this.ship[0] && this.ship[0].rad !== 10) {
	        this.gameWon();
	      } else {
	        this.resetShip = false;
	        this.moveObjects(delta);
	        this.checkCollisions();
	      }
	    }
	  }, {
	    key: 'restart',
	    value: function restart() {
	      this.bubbles = [];
	      this.ship[0].relocate();
	      this.over = false;
	    }
	  }, {
	    key: 'gameLost',
	    value: function gameLost() {
	      this.bubbles = [];
	      this.over = true;
	      this.gameView.toggleRun();
	      this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	      $('#loseGame').addClass('show');
	      $('#newGameInfo').addClass('show');
	    }
	  }, {
	    key: 'gameWon',
	    value: function gameWon() {
	      if (this.endless) {
	        var width = Math.floor(this.DIM_X / 2);
	        var height = Math.floor(this.DIM_Y / 2);
	        this.bubbles = [];
	        this.ship[0].moveCenter();
	        this.resetShip = true;
	        if (this.ship[0].atPos([width, height])) {
	          this.addBubbles();
	        }
	      } else {
	        this.bubbles = [];
	        this.over = true;
	        this.gameView.toggleRun();
	        this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	        $('#winGame').addClass('show');
	        $('#newGameInfo').addClass('show');
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(4);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _util = __webpack_require__(5);
	
	var Util = _interopRequireWildcard(_util);
	
	var _ship = __webpack_require__(6);
	
	var _ship2 = _interopRequireDefault(_ship);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var pop = new Howl({
	  src: ["./lib/sounds/blop.mp3"],
	  html5: true,
	  preload: true,
	  volume: 0.3
	});
	
	var Bubble = function (_MovingObject) {
	  _inherits(Bubble, _MovingObject);
	
	  function Bubble(options) {
	    _classCallCheck(this, Bubble);
	
	    options.color = options.color || Util.randomBlueWhite();
	    options.rad = options.rad || Util.randomRadius(options.range[0], options.range[1], options.offset);
	    options.vel = options.val || Util.randomVel(0.08);
	    options.pos = options.pos || options.game.randomPosition();
	    return _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).call(this, options));
	  }
	
	  _createClass(Bubble, [{
	    key: 'collideWith',
	    value: function collideWith(other) {
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
	  }]);
	
	  return Bubble;
	}(_moving_object2.default);
	
	exports.default = Bubble;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MovingObject = function () {
	  function MovingObject(options) {
	    _classCallCheck(this, MovingObject);
	
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.rad = options.rad;
	    this.color = options.color;
	    this.game = options.game;
	  }
	
	  _createClass(MovingObject, [{
	    key: 'collideWith',
	    value: function collideWith(other) {
	      // default no-op
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.rad, 0, 2 * Math.PI, true);
	      ctx.shadowBlur = 6;
	      ctx.shadowColor = this.color;
	      ctx.fill();
	    }
	  }, {
	    key: 'isCollidedWith',
	    value: function isCollidedWith(other) {
	      // objects are collided when center distance is < sum(radii)
	      var centerDistance = (0, _util.distance)(this.pos, other.pos);
	      return centerDistance <= this.rad + other.rad;
	    }
	  }, {
	    key: 'move',
	    value: function move(delta) {
	      if (isNaN(delta)) {
	        delta = 16.6666667;
	      }
	
	      var velScale = delta / (1000 / 60),
	          offsetX = this.vel[0] * velScale,
	          offsetY = this.vel[1] * velScale;
	
	      this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	      this.pos = this.game.wrap(this.pos);
	    }
	  }, {
	    key: 'remove',
	    value: function remove() {
	      this.game.remove(this);
	    }
	  }]);
	
	  return MovingObject;
	}();
	
	exports.default = MovingObject;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var randomVel = exports.randomVel = function randomVel(max) {
	  var direction = 2 * Math.PI * Math.random();
	  var xVel = Math.sin(direction) * max;
	  var yVel = Math.cos(direction) * max;
	  return [xVel, yVel];
	};
	
	var randomBlueWhite = exports.randomBlueWhite = function randomBlueWhite() {
	  var COLORS = ["#4390BC", "#68A7CA", "#8DBDD8", "#B2D3E6", "#D8E9F3", "#456789", "#C4D9E4", "#BBD3E0", "#ABC9D9", "#99B4C3"];
	  return COLORS[Math.floor(Math.random() * COLORS.length)];
	};
	
	var randomRadius = exports.randomRadius = function randomRadius(min, max, offset) {
	  return Math.random() * max + min + offset / 20;
	};
	
	var distance = exports.distance = function distance(pos1, pos2) {
	  var xDist = Math.pow(pos1[0] - pos2[0], 2);
	  var yDist = Math.pow(pos1[1] - pos2[1], 2);
	
	  return Math.sqrt(xDist + yDist);
	};
	
	var between = exports.between = function between(a, b, num) {
	  return a < num && num < b;
	};
	
	var wrap = exports.wrap = function wrap(pos, max) {
	  if (pos < 0) {
	    return max - pos % max;
	  } else if (pos > max) {
	    return pos % max;
	  } else {
	    return pos;
	  }
	};
	
	var invert = exports.invert = function invert(vel, scale) {
	  return [-vel[0] * scale, -vel[1] * scale];
	};
	
	var offset = exports.offset = function offset(pos, vel, rad) {
	  var vSum = Math.abs(vel[0]) + Math.abs(vel[1]);
	  var offRad = 1.4 * rad;
	
	  var xOff = -(vel[0] / vSum * offRad);
	  var yOff = -(vel[1] / vSum * offRad);
	
	  return [pos[0] + xOff, pos[1] + yOff];
	};
	
	var applyListeners = exports.applyListeners = function applyListeners(gameView) {
	  $(document).on('keydown.start', function (e) {
	    if (e.which === 32) {
	      $('.game-overlay').removeClass('show');
	      $('#canvas').removeClass('blur');
	
	      gameView.start();
	
	      $('#difficulty').off('click');
	      $(document).off('keydown.start');
	
	      $(document).keydown(function (event) {
	        if (event.which === 80) {
	          gameView.toggleRun();
	        }
	      });
	    }
	  });
	};
	
	var setOptions = exports.setOptions = function setOptions(id) {
	  var height = $(window).height();
	  var width = $(window).width();
	
	  $('#canvas').attr('height', "" + height);
	  $('#canvas').attr('width', "" + width);
	
	  switch (id) {
	    case 'med':
	      return { dimX: width, dimY: height,
	        numBubbles: 100, sizeRange: [2, 20] };
	    case 'hard':
	      return { dimX: width, dimY: height,
	        numBubbles: 120, sizeRange: [2, 30] };
	    default:
	      // easy
	      return { dimX: width, dimY: height,
	        numBubbles: 80, sizeRange: [2, 20] };
	  }
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(4);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _bubble = __webpack_require__(3);
	
	var _bubble2 = _interopRequireDefault(_bubble);
	
	var _util = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ship = function (_MovingObject) {
	  _inherits(Ship, _MovingObject);
	
	  function Ship(options) {
	    _classCallCheck(this, Ship);
	
	    options.color = "#C70039";
	    options.rad = 10;
	    options.pos = options.pos;
	
	    var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, options));
	
	    _this.relocate = _this.relocate.bind(_this);
	    _this.height = options.height;
	    _this.width = options.width;
	    return _this;
	  }
	
	  _createClass(Ship, [{
	    key: 'accelerate',
	    value: function accelerate(event) {
	      var key = event.key;
	      if (key === 'w' || key === 'ArrowUp') {
	        if (event.type === 'keydown') {
	          this.up = true;
	        } else if (event.type === 'keyup') {
	          this.up = false;
	        }
	      }
	      if (key === 'a' || key === 'ArrowLeft') {
	        if (event.type === 'keydown') {
	          this.left = true;
	        } else if (event.type === 'keyup') {
	          this.left = false;
	        }
	      }
	
	      if (key === 's' || key === 'ArrowDown') {
	        if (event.type === 'keydown') {
	          this.down = true;
	        } else if (event.type === 'keyup') {
	          this.down = false;
	        }
	      }
	
	      if (key === 'd' || key === 'ArrowRight') {
	        if (event.type === 'keydown') {
	          this.right = true;
	        } else if (event.type === 'keyup') {
	          this.right = false;
	        }
	      }
	    }
	  }, {
	    key: 'power',
	    value: function power() {
	      if (this.up) {
	        this.vel[1] -= 0.1;
	      }
	      if (this.left) {
	        this.vel[0] -= 0.1;
	      }
	      if (this.down) {
	        this.vel[1] += 0.1;
	      }
	      if (this.right) {
	        this.vel[0] += 0.1;
	      }
	    }
	  }, {
	    key: 'relocate',
	    value: function relocate() {
	      this.pos = [this.height, this.width];
	      this.vel = [0, 0];
	      this.rad = 10;
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.pos[0] = Math.floor(this.pos[0]);
	      this.pos[1] = Math.floor(this.pos[1]);
	      this.vel = [0, 0];
	      this.up = false;
	      this.left = false;
	      this.down = false;
	      this.right = false;
	    }
	  }, {
	    key: 'moveCenter',
	    value: function moveCenter() {
	      this.stop();
	      if (this.height > this.pos[1]) {
	        this.pos[1] += 1;
	      } else if (this.height < this.pos[1]) {
	        this.pos[1] -= 1;
	      }
	
	      if (this.width > this.pos[0]) {
	        this.pos[0] += 1;
	      } else if (this.width < this.pos[0]) {
	        this.pos[0] -= 1;
	      }
	
	      if (this.rad > 10) {
	        this.rad *= 0.98;
	      } else if (this.rad < 10) {
	        this.rad *= 1.02;
	      }
	    }
	  }, {
	    key: 'atPos',
	    value: function atPos(tgtPos) {
	      if (this.pos[0] === tgtPos[0] && this.pos[1] === tgtPos[1]) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }]);
	
	  return Ship;
	}(_moving_object2.default);
	
	exports.default = Ship;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map