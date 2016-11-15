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
	
	var _moving_object = __webpack_require__(1);
	
	var _moving_object2 = _interopRequireDefault(_moving_object);
	
	var _util = __webpack_require__(2);
	
	var Util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.util = Util;
	// ************************* TESTING ************************************
	
	// ************************* TESTING ************************************
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById('canvas');
	  // maybe set game height and width here? or keep defaults in html
	
	  var ctx = canvas.getContext("2d");
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	    key: "collideWith",
	    value: function collideWith(other) {
	      // stuff coming later
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.rad, 0, 2 * Math.PI, true);
	      ctx.fill();
	    }
	  }, {
	    key: "isCollidedWith",
	    value: function isCollidedWith(other) {
	      // coming soon
	    }
	  }, {
	    key: "move",
	    value: function move(dt) {
	      // increments postion by velocity
	      // if out of bounds, will wrap
	      // simple animation now, will add dt later
	
	      this.pos[0] += this.vel[0];
	      this.pos[1] += this.vel[1];
	    }
	  }, {
	    key: "remove",
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map