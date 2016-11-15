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
	
	var _game_view = __webpack_require__(3);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	var _game = __webpack_require__(4);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _util = __webpack_require__(2);
	
	var Util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.util = Util;
	// ************************* TESTING ************************************
	
	// ************************* TESTING ************************************
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById('canvas');
	  var ctx = canvas.getContext("2d");
	  // maybe set game height and width here? or keep defaults in html
	
	  var game = new _game2.default();
	  var gameView = new _game_view2.default(ctx, game);
	  gameView.start();
	
	  // ************************* TESTING ************************************
	  window.game = game;
	  // ************************* TESTING ************************************
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
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
/* 2 */
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

/***/ },
/* 3 */
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
	  }
	
	  _createClass(GameView, [{
	    key: "start",
	    value: function start() {
	      // starts animations for bubbleTrouble
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }, {
	    key: "animate",
	    value: function animate(time) {
	      // will use time to compute dt (time delta)
	      this.game.step(this.ctx);
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _bubble = __webpack_require__(5);
	
	var _bubble2 = _interopRequireDefault(_bubble);
	
	var _util = __webpack_require__(2);
	
	var _ship = __webpack_require__(6);
	
	var _ship2 = _interopRequireDefault(_ship);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.bubbles = [];
	    this.addBubbles();
	    this.addShip();
	  }
	
	  _createClass(Game, [{
	    key: 'allObjects',
	    value: function allObjects() {
	      return this.bubbles.concat([this.ship]);
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap(pos) {
	      if (pos[0] > DIM_X + 50) {
	        pos[0] = -49;
	      } else if (pos[0] < -50) {
	        pos[0] = 749;
	      }
	
	      if (pos[1] > DIM_Y + 50) {
	        pos[1] = -49;
	      } else if (pos[1] < -50) {
	        pos[1] = 749;
	      }
	
	      return pos;
	    }
	  }, {
	    key: 'addShip',
	    value: function addShip() {
	      var options = {
	        vel: [0, 0],
	        game: this
	      };
	      this.ship = new _ship2.default(options);
	    }
	  }, {
	    key: 'addBubbles',
	    value: function addBubbles() {
	      var _this = this;
	
	      var _loop = function _loop() {
	        var testPos = _this.randomPosition();
	        var options = { pos: testPos,
	          game: _this };
	        var possBubble = new _bubble2.default(options);
	
	        if (!_this.bubbles.some(function (bubble) {
	          return bubble.isCollidedWith(possBubble);
	        })) {
	          _this.bubbles.push(new _bubble2.default(options));
	        }
	      };
	
	      while (this.bubbles.length < NUM_BUBBLES) {
	        _loop();
	      }
	    }
	  }, {
	    key: 'randomPosition',
	    value: function randomPosition() {
	      var testPos = [Math.random() * DIM_X, Math.random() * DIM_Y];
	      var xMin = DIM_X / 2 - 50;
	      var xMax = DIM_X / 2 + 50;
	      var yMin = DIM_Y / 2 - 50;
	      var yMax = DIM_Y / 2 + 50;
	
	      if ((0, _util.between)(xMin, xMax, testPos[0]) || (0, _util.between)(yMin, yMax, testPos[1])) {
	        testPos[0] += 125;
	        testPos[1] += 125;
	      }
	
	      return testPos;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, DIM_X, DIM_Y);
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
	      } else {
	        throw "Error, tried to remove non-existing object.";
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step(ctx) {
	      this.moveObjects();
	      this.checkCollisions();
	      this.draw(ctx);
	    }
	  }]);
	
	  return Game;
	}();
	
	var NUM_BUBBLES = 50;
	var DIM_X = 700;
	var DIM_Y = 600;
	
	exports.default = Game;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(1);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _util = __webpack_require__(2);
	
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
	
	    options.color = Util.randomBlueWhite();
	    options.rad = options.rad || Util.randomRadius(5, 20);
	    options.vel = Util.randomVel(0.1);
	    options.pos = options.pos || options.game.randomPosition();
	    return _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).call(this, options));
	  }
	
	  _createClass(Bubble, [{
	    key: 'collideWith',
	    value: function collideWith(other) {
	      // should change this to handle absorption
	      if (other instanceof _ship2.default) {
	        other.relocate();
	      } else {
	        if (this.rad >= other.rad) {
	          this.rad += other.rad;
	          other.remove();
	        } else {
	          other.rad += this.rad;
	          this.remove();
	        }
	      }
	    }
	  }]);
	
	  return Bubble;
	}(_moving_object2.default);
	
	exports.default = Bubble;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _moving_object = __webpack_require__(1);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
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
	    options.pos = options.pos || [350, 300];
	    return _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, options));
	  }
	
	  _createClass(Ship, [{
	    key: "power",
	    value: function power(impulse) {
	      this.vel[0] += impulse[0];
	      this.vel[1] += impulse[1];
	    }
	
	    // will replace with either lives or some sort of game over trigger
	
	  }, {
	    key: "relocate",
	    value: function relocate() {
	      this.pos = [350, 300];
	      this.vel = [0, 0];
	    }
	  }]);
	
	  return Ship;
	}(_moving_object2.default);
	
	exports.default = Ship;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map