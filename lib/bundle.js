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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var gameOptions = void 0;
	
	var handleDifficultyClick = function handleDifficultyClick(e) {
	  e.preventDefault();
	  $('#difficulty').children().removeClass('selected');
	  $(e.target).addClass('selected');
	  setOptions(e.target.id);
	};
	
	var setOptions = function setOptions(id) {
	  var height = $(window).height();
	  var width = $(window).width();
	
	  $('#canvas').attr('height', '' + height);
	  $('#canvas').attr('width', '' + width);
	
	  switch (id) {
	    case 'easy':
	      gameOptions = { dimX: width, dimY: height,
	        numBubbles: 30, sizeRange: [3, 20] };
	      break;
	    case 'med':
	      gameOptions = { dimX: width, dimY: height,
	        numBubbles: 50, sizeRange: [6, 25] };
	      break;
	    case 'hard':
	      gameOptions = { dimX: width, dimY: height,
	        numBubbles: 70, sizeRange: [6, 40] };
	      break;
	    default:
	  }
	};
	
	$(function () {
	  var canvas = document.getElementById('canvas');
	  var ctx = canvas.getContext("2d");
	
	  setOptions('easy'); // default to easy game
	  var game = new _game2.default(gameOptions, ctx);
	  var gameView = new _game_view2.default(ctx, game);
	
	  $('#difficulty').children().click(handleDifficultyClick);
	
	  $(document).keydown(function (e) {
	    if (e.which === 32) {
	      $('.game-overlay').removeClass('show');
	      gameView.start();
	      $(document).off('keydown');
	      $(document).keydown(function (event) {
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	    key: "start",
	    value: function start() {
	      // starts animations for bubbleTrouble
	      this.game.restart();
	      this.run = true;
	      this.bindKeys();
	      this.animate();
	    }
	  }, {
	    key: "bindKeys",
	    value: function bindKeys() {
	      var ship = this.game.ship[0]; // since ship is stored in an array
	      var MOVES = {
	        "w": [0, -.75],
	        "a": [-.75, 0],
	        "s": [0, .75],
	        "d": [.75, 0],
	        "up": [0, -.75],
	        "left": [-.75, 0],
	        "down": [0, .75],
	        "right": [.75, 0]
	      };
	
	      Object.keys(MOVES).forEach(function (k) {
	        var command = MOVES[k];
	        key(k, function () {
	          ship.power(MOVES[k]);
	        });
	      });
	    }
	  }, {
	    key: "toggleRun",
	    value: function toggleRun() {
	      var _this = this;
	
	      this.run = !this.run;
	
	      if (this.game.over) {
	        $(document).keydown(function (e) {
	          if (e.which === 32) {
	            $('.game-overlay').removeClass('show');
	            $('#canvas').removeClass('blur');
	            _this.start();
	            $(document).off('keydown');
	            $(document).keydown(function (event) {
	              if (event.which === 80) {
	                _this.toggleRun();
	              }
	            });
	          }
	        });
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
	    key: "animate",
	    value: function animate() {
	      if (this.run) {
	        this.game.step(this.ctx);
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
	    this.ctx = ctx;
	    this.DIM_X = options.dimX;
	    this.DIM_Y = options.dimY;
	    this.over = false;
	    this.numBubbles = options.numBubbles;
	    this.sizeRange = options.sizeRange;
	    this.addBubbles();
	    this.addShip();
	  }
	
	  _createClass(Game, [{
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
	        var options = {
	          vel: [0, 0],
	          game: this,
	          pos: [this.DIM_X / 2, this.DIM_Y / 2]
	        };
	        this.ship = [new _ship2.default(options)];
	      }
	    }
	  }, {
	    key: 'addBubbles',
	    value: function addBubbles() {
	      var _this = this;
	
	      var _loop = function _loop() {
	        var testPos = _this.randomPosition();
	        var options = { pos: testPos,
	          game: _this,
	          range: _this.sizeRange };
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
	      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	      this.allObjects().forEach(function (el) {
	        return el.draw(ctx);
	      });
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects() {
	      this.allObjects().forEach(function (el) {
	        return el.move();
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
	    value: function step(ctx) {
	      if (this.allObjects()[0] === this.ship[0] && this.ship[0].rad !== 10) {
	        $(document).off('keydown');
	        this.gameWon();
	      } else {
	        this.moveObjects();
	        this.checkCollisions();
	        this.draw(ctx);
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.bubbles = [];
	      this.ship[0].relocate();
	    }
	  }, {
	    key: 'restart',
	    value: function restart() {
	      this.over = false;
	      if (this.allObjects().length === 1) {
	        this.addBubbles();
	        this.addShip();
	      }
	    }
	  }, {
	    key: 'gameLost',
	    value: function gameLost() {
	      this.over = true;
	      this.gameView.toggleRun();
	      this.reset();
	      this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	      $('#loseGame').addClass('show');
	      $('#newGameInfo').addClass('show');
	    }
	  }, {
	    key: 'gameWon',
	    value: function gameWon() {
	      this.over = true;
	      this.gameView.toggleRun();
	      this.reset();
	      this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	      $('#winGame').addClass('show');
	      $('#newGameInfo').addClass('show');
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
	
	var Bubble = function (_MovingObject) {
	  _inherits(Bubble, _MovingObject);
	
	  function Bubble(options) {
	    _classCallCheck(this, Bubble);
	
	    options.color = options.color || Util.randomBlueWhite();
	    options.rad = options.rad || Util.randomRadius(options.range[0], options.range[1]);
	    options.vel = options.val || Util.randomVel(0.1);
	    options.pos = options.pos || options.game.randomPosition();
	    return _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).call(this, options));
	  }
	
	  _createClass(Bubble, [{
	    key: 'collideWith',
	    value: function collideWith(other) {
	      if (this.rad >= other.rad) {
	        this.rad += other.rad / 6.667 / 3;
	        other.rad *= 0.75;
	        if (other.rad < 2) {
	          other.remove();
	        }
	      } else {
	        other.rad += this.rad / 6.667 / 3;
	        this.rad *= 0.75;
	        if (this.rad < 2) {
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
	      // adding soon
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.rad, 0, 2 * Math.PI, true);
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
	    value: function move(dt) {
	      // increments postion by velocity
	      // if out of bounds, will wrap
	      // simple animation now, will add dt later
	
	      this.pos[0] += this.vel[0];
	      this.pos[1] += this.vel[1];
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
	
	var randomRadius = exports.randomRadius = function randomRadius(min, max) {
	  return Math.random() * max + min;
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
	    key: 'power',
	    value: function power(impulse) {
	      this.vel[0] += impulse[0];
	      this.vel[1] += impulse[1];
	    }
	  }, {
	    key: 'relocate',
	    value: function relocate() {
	      this.pos = [this.height, this.width];
	      this.vel = [0, 0];
	      this.rad = 10;
	    }
	  }]);
	
	  return Ship;
	}(_moving_object2.default);
	
	exports.default = Ship;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map