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
	
	var _quick_sort_revised = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementById("canvas-shuffle");
	  canvasEl.width = 1024;
	  canvasEl.height = 200;
	  var ctx = canvasEl.getContext("2d");
	  var sticksView = new _stick_view2.default(ctx);
	  sticksView.sticks.adopAlgorithm(_shuffle.shuffle);
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
	  sticksView.sticks.adopAlgorithm(_quick_sort_revised.quickSort);
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
	      var _this = this;
	
	      this.lastTime = 0;
	      this.sticks.draw(this.ctx);
	      this.interval = window.setInterval(function () {
	        _this.render();
	      }, 20);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      this.sticks.step();
	      this.sticks.draw(this.ctx);
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
	  function Sticks(ctx) {
	    _classCallCheck(this, Sticks);
	
	    this.ctx = ctx;
	    this.DIM_X = 1024;
	    this.DIM_Y = 480;
	    this.sticks = [];
	    this.NUM_STICK = 100;
	    this.MID_NUM = Math.floor(this.NUM_STICK / 2);
	    this.dangle = Math.PI / 180;
	    this.addSticks(this.ctx);
	    this.cons = 0;
	    this.swapPos = [];
	  }
	
	  _createClass(Sticks, [{
	    key: 'addSticks',
	    value: function addSticks() {
	      var mid_stick = new _stick2.default({ lineHead: [512, 100], lineTail: [512, 40], pos: this.MID_NUM });
	      this.sticks.push(mid_stick);
	
	      for (var i = 1; i < this.MID_NUM + 1; i++) {
	        var leftOne = Object.assign({}, this.sticks[0]);
	        var leftAngle = Math.PI / 2 - this.dangle * i;
	        var rightOne = Object.assign({}, this.sticks[this.sticks.length - 1]);
	        var rightAngle = Math.PI / 2 + this.dangle * i;
	
	        leftOne.lineHead = [leftOne.lineHead[0] - 9, leftOne.lineHead[1]];
	        leftOne.lineTail = _util.Util.findLineTail(leftOne.lineHead, leftAngle);
	        leftOne.pos = leftOne.pos - 1;
	        this.sticks.unshift(new _stick2.default(leftOne));
	
	        rightOne.lineHead = [rightOne.lineHead[0] + 9, rightOne.lineHead[1]];
	        rightOne.lineTail = _util.Util.findLineTail(rightOne.lineHead, rightAngle);
	        rightOne.pos = rightOne.pos + 1;
	        this.sticks.push(new _stick2.default(rightOne));
	      }
	    }
	  }, {
	    key: 'checkFinishSwap',
	    value: function checkFinishSwap(stick1, stick2) {
	      if (stick1 == stick2) {
	        return true;
	      }
	      return stick1.checkFinishMove() && stick2.checkFinishMove();
	    }
	  }, {
	    key: 'updateSticks',
	    value: function updateSticks() {
	      var swapPos = this.swapPos;
	      if (this.cons > swapPos.length - 1) {
	        return;
	      } else {
	        var swaps = swapPos[this.cons];
	        var stick1 = this.sticks[swaps[0]];
	        var stick2 = this.sticks[swaps[1]];
	        stick1.getEndpos(stick2);
	        stick2.getEndpos(stick1);
	        if (stick1 !== stick2) {
	          this.swap(this.sticks[swaps[0]], this.sticks[swaps[1]]);
	        }
	        if (this.checkFinishSwap(this.sticks[swaps[0]], this.sticks[swaps[1]])) {
	          this.cons++;
	        }
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.updateSticks();
	    }
	  }, {
	    key: 'adopAlgorithm',
	    value: function adopAlgorithm(algorithm) {
	      this.swapPos = this.swapPos.concat(algorithm(this.sticks));
	    }
	  }, {
	    key: 'swap',
	    value: function swap(stick1, stick2) {
	      stick1.moveTo(stick1.endPos);
	      stick2.moveTo(stick2.endPos);
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
	    this.color = "#000";
	    this.pos = options.pos;
	    this.endPos = null;
	    this.stg = options.stg;
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
	    value: function moveTo(endPos) {
	      if (!this.checkFinishMove()) {
	        var speed = _util.Util.moveSpeed(this.lineHead[0], endPos);
	        this.lineHead[0] = this.lineHead[0] + speed;
	        this.lineTail[0] = this.lineTail[0] + speed;
	      }
	    }
	  }, {
	    key: "checkFinishMove",
	    value: function checkFinishMove() {
	      if (this.lineHead[0] === this.endPos) {
	        this.endPos = null;
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      // if (this.checkFinishMove()) {
	      //   ctx.strokeStyle('black');
	      // } else {
	      //   ctx.strokeStyle("red");
	      // }
	
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
	  moveSpeed: function moveSpeed(linePos, endPos) {
	    var distance = Math.abs(endPos - linePos);
	    var direction = distance / (endPos - linePos);
	    var vel = void 0;
	    if (distance > 20) {
	      vel = 10;
	    } else if (distance > 10) {
	      vel = 2;
	    } else if (distance > 0) {
	      vel = 1;
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
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var quickSort = exports.quickSort = function quickSort(arr) {
	  var swapPos = [];
	  sort(arr, 0, arr.length - 1, swapPos);
	  return swapPos;
	};
	
	function sort(arr, oLeft, oRight, swapPos) {
	
	  var swapped = false;
	
	  //If you make any swaps the resulting sub arrays are of smaller length than the original
	  //so you just need to handle the case where no swaps are made.
	
	  var left = oLeft;
	  var right = oRight;
	
	  //I am not sure but you might need a check for right - left > -1.
	  if (right - left <= 1 && right >= left) {
	    if (arr[right].pos < arr[left].pos) {
	      var mix = arr[right];
	      arr[right] = arr[left];
	      arr[left] = mix;
	      swapPos.push([left, right]);
	    }
	  } else {
	    var plnd = Math.floor((left + right) / 2);
	    var pivot = arr[plnd];
	    while (left <= right) {
	      if (arr[left].pos > pivot.pos) {
	        var temp = arr[right];
	        arr[right] = arr[left];
	        arr[left] = temp;
	        swapPos.push([left, right]);
	        right = right - 1;
	        swapped = true;
	      } else {
	        left = left + 1;
	      }
	    }
	
	    if (swapped) {
	      sort(arr, oLeft, right, swapPos);
	      sort(arr, left, oRight, swapPos);
	    } else {
	      var _temp = arr[oRight];
	      arr[oRight] = arr[plnd];
	      arr[plnd] = _temp;
	      swapPos.push([plnd, oRight]);
	      sort(arr, oLeft, oRight - 1, swapPos);
	    }
	  }
	  console.log(arr);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map