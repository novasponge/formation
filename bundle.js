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
	
	var _stick_view = __webpack_require__(1);
	
	var _stick_view2 = _interopRequireDefault(_stick_view);
	
	var _shuffle = __webpack_require__(5);
	
	var _bubble_sort = __webpack_require__(6);
	
	var _quick_sort = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementById("canvas-shuffle");
	  canvasEl.width = 1024;
	  canvasEl.height = 200;
	  var ctx = canvasEl.getContext("2d");
	  var sticksView = new _stick_view2.default(ctx);
	  sticksView.sticks.adopAlgorithm(_shuffle.shuffle, true);
	  sticksView.start();
	});
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementById("canvas-bubblesort");
	  canvasEl.width = 1024;
	  canvasEl.height = 200;
	  var ctx = canvasEl.getContext("2d");
	  var sticksView = new _stick_view2.default(ctx);
	  sticksView.sticks.adopAlgorithm(_shuffle.shuffle);
	  sticksView.sticks.adopAlgorithm(_bubble_sort.bubbleSort);
	  sticksView.start();
	});
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementById("canvas-quicksort");
	  canvasEl.width = 1024;
	  canvasEl.height = 200;
	  var ctx = canvasEl.getContext("2d");
	  var sticksView = new _stick_view2.default(ctx);
	  sticksView.sticks.adopAlgorithm(_shuffle.shuffle);
	  sticksView.sticks.adopAlgorithm(_quick_sort.quickSort);
	  sticksView.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _stick_arr = __webpack_require__(2);
	
	var _stick_arr2 = _interopRequireDefault(_stick_arr);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SticksView = function () {
	  function SticksView(ctx) {
	    _classCallCheck(this, SticksView);
	
	    this.sticks = new _stick_arr2.default(ctx);
	    this.ctx = ctx;
	  }
	
	  _createClass(SticksView, [{
	    key: "start",
	    value: function start() {
	      this.lastTime = Date.now();
	      this.sticks.draw(this.ctx);
	      window.requestAnimationFrame(this.render.bind(this));
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var time = Date.now();
	      var timeDelta = time - this.lastTime;
	      this.sticks.step(timeDelta);
	      this.sticks.draw(this.ctx);
	      this.lastTime = time;
	
	      window.requestAnimationFrame(this.render.bind(this));
	    }
	  }]);
	
	  return SticksView;
	}();
	
	exports.default = SticksView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _stick = __webpack_require__(3);
	
	var _stick2 = _interopRequireDefault(_stick);
	
	var _util = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sticks = function () {
	  function Sticks() {
	    _classCallCheck(this, Sticks);
	
	    this.DIM_X = 1024;
	    this.DIM_Y = 200;
	    this.sticks = [];
	    this.NUM_STICK = 99;
	    this.MID_NUM = (this.NUM_STICK - 1) / 2;
	    this.dangle = Math.PI / 180;
	    this.addSticks(this.ctx);
	    this.cons = 0;
	    this.swapPos = [];
	  }
	
	  _createClass(Sticks, [{
	    key: 'addSticks',
	    value: function addSticks() {
	      var mid_stick = new _stick2.default({ lineHead: [512, 100], lineTail: [512, 40] });
	      this.sticks.push(mid_stick);
	
	      for (var _i = 1; _i < this.MID_NUM + 1; _i++) {
	        var leftOne = Object.assign({}, this.sticks[0]);
	        var leftAngle = Math.PI / 2 - this.dangle * _i;
	        var rightOne = Object.assign({}, this.sticks[this.sticks.length - 1]);
	        var rightAngle = Math.PI / 2 + this.dangle * _i;
	
	        leftOne.lineHead = [leftOne.lineHead[0] - 8, leftOne.lineHead[1]];
	        leftOne.lineTail = _util.Util.findLineTail(leftOne.lineHead, leftAngle);
	        this.sticks.unshift(new _stick2.default(leftOne));
	
	        rightOne.lineHead = [rightOne.lineHead[0] + 8, rightOne.lineHead[1]];
	        rightOne.lineTail = _util.Util.findLineTail(rightOne.lineHead, rightAngle);
	        this.sticks.push(new _stick2.default(rightOne));
	      }
	
	      for (var i = 0; i < this.sticks.length; i++) {
	        this.sticks[i].pos = i;
	      }
	    }
	  }, {
	    key: 'checkFinishSwap',
	    value: function checkFinishSwap(stick1, stick2) {
	      return stick1.checkFinishMove() && stick2.checkFinishMove();
	    }
	  }, {
	    key: 'updateSticks',
	    value: function updateSticks(timeDelta) {
	      var swapPos = this.swapPos;
	      if (this.cons < swapPos.length) {
	        var swaps = swapPos[this.cons];
	        var stick1 = this.sticks[swaps[0]];
	        var stick2 = this.sticks[swaps[1]];
	        if (stick1 !== stick2) {
	          stick1.getEndpos(stick2);
	          stick2.getEndpos(stick1);
	          this.swap(stick1, stick2, timeDelta);
	        } else {
	          this.cons++;
	          return;
	        }
	      } else {
	        console.log(1 + 1);
	        return;
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step(timeDelta) {
	      this.updateSticks(timeDelta);
	    }
	  }, {
	    key: 'adopAlgorithm',
	    value: function adopAlgorithm(algorithm, isShuffle) {
	      this.swapPos = this.swapPos.concat(algorithm(this.sticks));
	    }
	  }, {
	    key: 'swap',
	    value: function swap(stick1, stick2, timeDelta) {
	      if (this.checkFinishSwap(stick1, stick2)) {
	        this.cons++;
	        console.log(this.cons);
	      } else {
	        stick1.moveTo(stick1.endPos, timeDelta);
	        stick2.moveTo(stick2.endPos, timeDelta);
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	
	      this.sticks.forEach(function (stick) {
	        stick.draw(ctx);
	      });
	    }
	  }]);
	
	  return Sticks;
	}();
	
	exports.default = Sticks;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(4);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Stick = function () {
	  function Stick(options) {
	    _classCallCheck(this, Stick);
	
	    this.lineHead = options.lineHead;
	    this.lineTail = options.lineTail;
	    this.color = "#909090";
	    this.pos = options.pos;
	    this.endPos = null;
	  }
	
	  _createClass(Stick, [{
	    key: "getEndpos",
	    value: function getEndpos(anotherStick) {
	      if (!this.endPos) {
	        this.endPos = anotherStick.lineHead[0];
	      }
	    }
	  }, {
	    key: "moveTo",
	    value: function moveTo(endPos, timeDelta) {
	      if (!this.checkFinishMove()) {
	        this.color = "#f00";
	        var speed = _util.Util.moveSpeed(this.lineHead[0], endPos, timeDelta);
	        this.lineHead[0] = this.lineHead[0] + speed;
	        this.lineTail[0] = this.lineTail[0] + speed;
	      }
	    }
	  }, {
	    key: "checkFinishMove",
	    value: function checkFinishMove() {
	      if (this.lineHead[0] === this.endPos) {
	        this.color = "#000";
	        this.endPos = null;
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.strokeStyle = this.color;
	      ctx.beginPath();
	      ctx.moveTo.apply(ctx, _toConsumableArray(this.lineHead));
	      ctx.lineTo.apply(ctx, _toConsumableArray(this.lineTail));
	      ctx.stroke();
	    }
	  }]);
	
	  return Stick;
	}();
	
	exports.default = Stick;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Util = exports.Util = {
	  findLineTail: function findLineTail(lineHead, angle) {
	    var dy = Math.sin(angle) * 60;
	    var dx = Math.cos(angle) * 60;
	    return [lineHead[0] - dx, lineHead[1] - dy];
	  },
	  moveSpeed: function moveSpeed(linePos, endPos, timeDelta) {
	    var distance = Math.abs(endPos - linePos);
	    if (distance === 0) {
	      return 0;
	    }
	
	    var direction = distance / (endPos - linePos);
	    var vel = void 0;
	
	    if (distance > 20) {
	      vel = distance / timeDelta;
	    } else if (distance > 1) {
	      vel = 1;
	    } else {
	      vel = distance;
	    }
	    return vel * direction;
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var shuffle = exports.shuffle = function shuffle(arr) {
	  var n = arr.length,
	      t = void 0,
	      i = void 0;
	  var swapPos = [];
	  while (n) {
	    i = Math.random() * n-- | 0;
	    t = arr[n];
	    arr[n] = arr[i];
	    arr[i] = t;
	    swapPos.push([n, i]);
	  }
	  return swapPos;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var bubbleSort = exports.bubbleSort = function bubbleSort(arr) {
	  var swapPos = [];
	  for (var i = 0; i < arr.length - 1; i++) {
	    for (var j = i + 1; j < arr.length; j++) {
	      if (arr[i].pos > arr[j].pos) {
	        var _ref = [arr[j], arr[i]];
	        arr[i] = _ref[0];
	        arr[j] = _ref[1];
	
	        swapPos.push([i, j]);
	      }
	    }
	  }
	  return swapPos;
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var swap = function swap(arr, i, j, swapPos) {
	  var temp = arr[i];
	  arr[i] = arr[j];
	  arr[j] = temp;
	  swapPos.push([i, j]);
	};
	
	var quickSort = exports.quickSort = function quickSort(arr) {
	  var swapPos = [];
	  sort(arr, 0, arr.length - 1, swapPos);
	  return swapPos;
	};
	
	var sort = function sort(arr, left, right, swapPos) {
	  if (left >= right) return;
	
	  swap(arr, left, Math.floor((left + right) / 2), swapPos);
	
	  var last = left;
	  for (var i = left + 1; i <= right; i++) {
	    if (arr[i].pos < arr[left].pos) {
	      last++;
	      swap(arr, last, i, swapPos);
	    }
	  }
	
	  swap(arr, left, last, swapPos);
	  sort(arr, left, last - 1, swapPos);
	  sort(arr, last + 1, right, swapPos);
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map