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
/***/ function(module, exports) {

	let stage;
	let shape;
	
	document.addEventListener("DOMContentLoaded", () => {
	  window.createjs = createjs;
	  stage = new createjs.Stage('canvas');
	
	  shape = new createjs.Shape();
	  shape.graphics.beginFill('blue').drawRect(0, 0, 120, 120);
	  shape.regX = 60;
	  shape.regY = 60;
	  stage.addChild(shape);
	
	  createjs.Ticker.setFPS(60);
	  createjs.Ticker.addEventListener('tick', tick);
	  stage.update();
	});
	
	function tick () {
	  shape.x += (stage.mouseX - shape.x) * 0.1;
	  shape.y += (stage.mouseY - shape.y) * 0.1;
	  stage.update();
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map