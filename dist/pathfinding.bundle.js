/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/pathfinding.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/heap/index.js":
/*!************************************!*\
  !*** ./node_modules/heap/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/heap */ \"./node_modules/heap/lib/heap.js\");\n\n\n//# sourceURL=webpack:///./node_modules/heap/index.js?");

/***/ }),

/***/ "./node_modules/heap/lib/heap.js":
/*!***************************************!*\
  !*** ./node_modules/heap/lib/heap.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {// Generated by CoffeeScript 1.8.0\n(function() {\n  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;\n\n  floor = Math.floor, min = Math.min;\n\n\n  /*\n  Default comparison function to be used\n   */\n\n  defaultCmp = function(x, y) {\n    if (x < y) {\n      return -1;\n    }\n    if (x > y) {\n      return 1;\n    }\n    return 0;\n  };\n\n\n  /*\n  Insert item x in list a, and keep it sorted assuming a is sorted.\n  \n  If x is already in a, insert it to the right of the rightmost x.\n  \n  Optional args lo (default 0) and hi (default a.length) bound the slice\n  of a to be searched.\n   */\n\n  insort = function(a, x, lo, hi, cmp) {\n    var mid;\n    if (lo == null) {\n      lo = 0;\n    }\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    if (lo < 0) {\n      throw new Error('lo must be non-negative');\n    }\n    if (hi == null) {\n      hi = a.length;\n    }\n    while (lo < hi) {\n      mid = floor((lo + hi) / 2);\n      if (cmp(x, a[mid]) < 0) {\n        hi = mid;\n      } else {\n        lo = mid + 1;\n      }\n    }\n    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);\n  };\n\n\n  /*\n  Push item onto heap, maintaining the heap invariant.\n   */\n\n  heappush = function(array, item, cmp) {\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    array.push(item);\n    return _siftdown(array, 0, array.length - 1, cmp);\n  };\n\n\n  /*\n  Pop the smallest item off the heap, maintaining the heap invariant.\n   */\n\n  heappop = function(array, cmp) {\n    var lastelt, returnitem;\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    lastelt = array.pop();\n    if (array.length) {\n      returnitem = array[0];\n      array[0] = lastelt;\n      _siftup(array, 0, cmp);\n    } else {\n      returnitem = lastelt;\n    }\n    return returnitem;\n  };\n\n\n  /*\n  Pop and return the current smallest value, and add the new item.\n  \n  This is more efficient than heappop() followed by heappush(), and can be\n  more appropriate when using a fixed size heap. Note that the value\n  returned may be larger than item! That constrains reasonable use of\n  this routine unless written as part of a conditional replacement:\n      if item > array[0]\n        item = heapreplace(array, item)\n   */\n\n  heapreplace = function(array, item, cmp) {\n    var returnitem;\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    returnitem = array[0];\n    array[0] = item;\n    _siftup(array, 0, cmp);\n    return returnitem;\n  };\n\n\n  /*\n  Fast version of a heappush followed by a heappop.\n   */\n\n  heappushpop = function(array, item, cmp) {\n    var _ref;\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    if (array.length && cmp(array[0], item) < 0) {\n      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];\n      _siftup(array, 0, cmp);\n    }\n    return item;\n  };\n\n\n  /*\n  Transform list into a heap, in-place, in O(array.length) time.\n   */\n\n  heapify = function(array, cmp) {\n    var i, _i, _j, _len, _ref, _ref1, _results, _results1;\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    _ref1 = (function() {\n      _results1 = [];\n      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }\n      return _results1;\n    }).apply(this).reverse();\n    _results = [];\n    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {\n      i = _ref1[_i];\n      _results.push(_siftup(array, i, cmp));\n    }\n    return _results;\n  };\n\n\n  /*\n  Update the position of the given item in the heap.\n  This function should be called every time the item is being modified.\n   */\n\n  updateItem = function(array, item, cmp) {\n    var pos;\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    pos = array.indexOf(item);\n    if (pos === -1) {\n      return;\n    }\n    _siftdown(array, 0, pos, cmp);\n    return _siftup(array, pos, cmp);\n  };\n\n\n  /*\n  Find the n largest elements in a dataset.\n   */\n\n  nlargest = function(array, n, cmp) {\n    var elem, result, _i, _len, _ref;\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    result = array.slice(0, n);\n    if (!result.length) {\n      return result;\n    }\n    heapify(result, cmp);\n    _ref = array.slice(n);\n    for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n      elem = _ref[_i];\n      heappushpop(result, elem, cmp);\n    }\n    return result.sort(cmp).reverse();\n  };\n\n\n  /*\n  Find the n smallest elements in a dataset.\n   */\n\n  nsmallest = function(array, n, cmp) {\n    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    if (n * 10 <= array.length) {\n      result = array.slice(0, n).sort(cmp);\n      if (!result.length) {\n        return result;\n      }\n      los = result[result.length - 1];\n      _ref = array.slice(n);\n      for (_i = 0, _len = _ref.length; _i < _len; _i++) {\n        elem = _ref[_i];\n        if (cmp(elem, los) < 0) {\n          insort(result, elem, 0, null, cmp);\n          result.pop();\n          los = result[result.length - 1];\n        }\n      }\n      return result;\n    }\n    heapify(array, cmp);\n    _results = [];\n    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {\n      _results.push(heappop(array, cmp));\n    }\n    return _results;\n  };\n\n  _siftdown = function(array, startpos, pos, cmp) {\n    var newitem, parent, parentpos;\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    newitem = array[pos];\n    while (pos > startpos) {\n      parentpos = (pos - 1) >> 1;\n      parent = array[parentpos];\n      if (cmp(newitem, parent) < 0) {\n        array[pos] = parent;\n        pos = parentpos;\n        continue;\n      }\n      break;\n    }\n    return array[pos] = newitem;\n  };\n\n  _siftup = function(array, pos, cmp) {\n    var childpos, endpos, newitem, rightpos, startpos;\n    if (cmp == null) {\n      cmp = defaultCmp;\n    }\n    endpos = array.length;\n    startpos = pos;\n    newitem = array[pos];\n    childpos = 2 * pos + 1;\n    while (childpos < endpos) {\n      rightpos = childpos + 1;\n      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {\n        childpos = rightpos;\n      }\n      array[pos] = array[childpos];\n      pos = childpos;\n      childpos = 2 * pos + 1;\n    }\n    array[pos] = newitem;\n    return _siftdown(array, startpos, pos, cmp);\n  };\n\n  Heap = (function() {\n    Heap.push = heappush;\n\n    Heap.pop = heappop;\n\n    Heap.replace = heapreplace;\n\n    Heap.pushpop = heappushpop;\n\n    Heap.heapify = heapify;\n\n    Heap.updateItem = updateItem;\n\n    Heap.nlargest = nlargest;\n\n    Heap.nsmallest = nsmallest;\n\n    function Heap(cmp) {\n      this.cmp = cmp != null ? cmp : defaultCmp;\n      this.nodes = [];\n    }\n\n    Heap.prototype.push = function(x) {\n      return heappush(this.nodes, x, this.cmp);\n    };\n\n    Heap.prototype.pop = function() {\n      return heappop(this.nodes, this.cmp);\n    };\n\n    Heap.prototype.peek = function() {\n      return this.nodes[0];\n    };\n\n    Heap.prototype.contains = function(x) {\n      return this.nodes.indexOf(x) !== -1;\n    };\n\n    Heap.prototype.replace = function(x) {\n      return heapreplace(this.nodes, x, this.cmp);\n    };\n\n    Heap.prototype.pushpop = function(x) {\n      return heappushpop(this.nodes, x, this.cmp);\n    };\n\n    Heap.prototype.heapify = function() {\n      return heapify(this.nodes, this.cmp);\n    };\n\n    Heap.prototype.updateItem = function(x) {\n      return updateItem(this.nodes, x, this.cmp);\n    };\n\n    Heap.prototype.clear = function() {\n      return this.nodes = [];\n    };\n\n    Heap.prototype.empty = function() {\n      return this.nodes.length === 0;\n    };\n\n    Heap.prototype.size = function() {\n      return this.nodes.length;\n    };\n\n    Heap.prototype.clone = function() {\n      var heap;\n      heap = new Heap();\n      heap.nodes = this.nodes.slice(0);\n      return heap;\n    };\n\n    Heap.prototype.toArray = function() {\n      return this.nodes.slice(0);\n    };\n\n    Heap.prototype.insert = Heap.prototype.push;\n\n    Heap.prototype.top = Heap.prototype.peek;\n\n    Heap.prototype.front = Heap.prototype.peek;\n\n    Heap.prototype.has = Heap.prototype.contains;\n\n    Heap.prototype.copy = Heap.prototype.clone;\n\n    return Heap;\n\n  })();\n\n  if ( true && module !== null ? module.exports : void 0) {\n    module.exports = Heap;\n  } else {\n    window.Heap = Heap;\n  }\n\n}).call(this);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/heap/lib/heap.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/js/core/Grid.js":
/*!*****************************!*\
  !*** ./src/js/core/Grid.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Node = __webpack_require__(/*! ./Node */ \"./src/js/core/Node.js\"); //defining grid class\n//constructor\n\n\nfunction Grid(width, height) {\n  this.width = width;\n  this.height = height;\n  this.nodes = this.makenodes(width, height);\n} //function that returns height and width of grid\n\n\nGrid.prototype.dimention = function () {\n  return [this.height, this.width];\n}; //function that makes all nodes\n\n\nGrid.prototype.makenodes = function (width, height) {\n  var i, j;\n  var nodes = new Array(height);\n\n  for (i = 0; i < height; ++i) {\n    nodes[i] = new Array(width);\n\n    for (j = 0; j < width; ++j) {\n      nodes[i][j] = new Node(j, i);\n    }\n  }\n\n  return nodes;\n}; //Function that checks whether the given point is inside the grid\n\n\nGrid.prototype.isInside = function (x, y) {\n  return x >= 0 && x < this.width && y >= 0 && y < this.height;\n}; //function that returns the node at a particular index\n\n\nGrid.prototype.getNodeAt = function (x, y) {\n  if (this.isInside(x, y)) {\n    return this.nodes[y][x];\n  } else {\n    return false;\n  }\n}; //Adding class function to Array class to check if two arrays are the same\n\n\nArray.prototype.equals = function (arr) {\n  return this.length == arr.length && this.every(function (u, i) {\n    return u === arr[i];\n  });\n}; //function to check if array is present in list of blocked nodes\n// Grid.prototype.isBlock=function(x,y,block){\n// var i;\n// for(i=0;i<block.length ; ++i){\n// \tif(block[i].equals([x,y])){\n// \t\treturn true;\n// \t}\n// }\n// return false;\n// }\n//function to check if array is present in list of terrain nodes\n\n\nGrid.prototype.isterrain = function (x, y, node) {\n  // var x=node.x, y=node.y;\n  if (this.isHillAt(x, y) || this.isHillAt(node.x, node.y)) {\n    return true;\n  } else {\n    return false;\n  }\n}; //function to return all neighbours of a given node\n\n\nGrid.prototype.getNeighbours = function (node) {\n  var x = node.x,\n      y = node.y;\n  var dict = {};\n  neighbours = [];\n  weights = [];\n\n  if (this.isWalkableAt(x, y - 1)) {\n    neighbours.push(this.nodes[y - 1][x]);\n\n    if (this.isterrain(x, y - 1, node)) {\n      weights.push(4);\n    } else {\n      weights.push(1);\n    }\n  } // →\n\n\n  if (this.isWalkableAt(x + 1, y)) {\n    neighbours.push(this.nodes[y][x + 1]);\n\n    if (this.isterrain(x + 1, y, node)) {\n      weights.push(4);\n    } else {\n      weights.push(1);\n    }\n  } // ↓\n\n\n  if (this.isWalkableAt(x, y + 1)) {\n    neighbours.push(this.nodes[y + 1][x]);\n\n    if (this.isterrain(x, y + 1, node)) {\n      weights.push(4);\n    } else {\n      weights.push(1);\n    }\n  } // ←\n\n\n  if (this.isWalkableAt(x - 1, y)) {\n    neighbours.push(this.nodes[y][x - 1]);\n\n    if (this.isterrain(x - 1, y, node)) {\n      weights.push(4);\n    } else {\n      weights.push(1);\n    }\n  }\n\n  return [neighbours, weights];\n};\n\nGrid.prototype.isWalkableAt = function (x, y) {\n  return this.isInside(x, y) && this.nodes[y][x].walkable;\n};\n\nGrid.prototype.isHillAt = function (x, y) {\n  return this.isInside(x, y) && this.nodes[y][x].hill;\n};\n\nGrid.prototype.setWalkableAt = function (x, y, walkable) {\n  this.nodes[y][x].walkable = walkable;\n};\n\nGrid.prototype.setHillAt = function (x, y, hill) {\n  this.nodes[y][x].hill = hill;\n};\n\nGrid.prototype.clone = function () {\n  var i,\n      j,\n      width = this.width,\n      height = this.height,\n      thisNodes = this.nodes,\n      newGrid = new Grid(width, height),\n      newNodes = new Array(height);\n\n  for (i = 0; i < height; ++i) {\n    newNodes[i] = new Array(width);\n\n    for (j = 0; j < width; ++j) {\n      newNodes[i][j] = new Node(j, i, thisNodes[i][j].walkable, thisNodes[i][j].hill);\n    }\n  }\n\n  newGrid.nodes = newNodes;\n  return newGrid;\n};\n\nmodule.exports = Grid;\n\n//# sourceURL=webpack:///./src/js/core/Grid.js?");

/***/ }),

/***/ "./src/js/core/Node.js":
/*!*****************************!*\
  !*** ./src/js/core/Node.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//defining constructor for nodes\nfunction Node(x, y, walkable, hill) {\n  this.x = x;\n  this.y = y;\n  this.walkable = walkable === undefined ? true : walkable;\n  this.hill = hill === undefined ? false : hill;\n}\n\nNode.prototype.isEqual = function (nodeA) {\n  if (nodeA.x == this.x && nodeA.y == this.y) {\n    return true;\n  } else {\n    return false;\n  }\n};\n\nmodule.exports = Node;\n\n//# sourceURL=webpack:///./src/js/core/Node.js?");

/***/ }),

/***/ "./src/js/core/Util.js":
/*!*****************************!*\
  !*** ./src/js/core/Util.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//function to return path from the end node\nfunction backtrace(cellDetails, node) {\n  var path = [[node.x, node.y]];\n  x = node.x;\n  y = node.y;\n\n  while (!(cellDetails[x][y].parent_i == x && cellDetails[x][y].parent_j == y)) {\n    tempx = cellDetails[x][y].parent_i;\n    tempy = cellDetails[x][y].parent_j;\n    x = tempx;\n    y = tempy;\n    path.push([x, y]);\n  } // console.log('path', path)\n\n\n  return path.reverse();\n}\n\nexports.backtrace = backtrace;\n\nfunction pathLength(path) {\n  // change // TODO: add terrain path\n  var i,\n      sum = 0,\n      a,\n      b,\n      dx,\n      dy;\n\n  for (i = 1; i < path.length; ++i) {\n    a = path[i - 1];\n    b = path[i];\n    dx = a[0] - b[0];\n    dy = a[1] - b[1];\n    sum += Math.sqrt(dx * dx + dy * dy);\n  }\n\n  return sum;\n}\n\nexports.pathLength = pathLength;\n\n//# sourceURL=webpack:///./src/js/core/Util.js?");

/***/ }),

/***/ "./src/js/finders/A_star.js":
/*!**********************************!*\
  !*** ./src/js/finders/A_star.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Distance = __webpack_require__(/*! ./distance.js */ \"./src/js/finders/distance.js\");\n\nvar Util = __webpack_require__(/*! ../core/Util.js */ \"./src/js/core/Util.js\");\n\nvar CellAttributes = function CellAttributes(f, g, h, i, j) {\n  _classCallCheck(this, CellAttributes);\n\n  this.g = g;\n  this.f = f;\n  this.h = h;\n  this.parent_i = i;\n  this.parent_j = j;\n}; // Astar has attributes:-\n// htype = type of h distace to be cal\n\n\nfunction AstarSearch(obj) {\n  // if there is choice between distance then h type = manhattan by default\n  if (obj == undefined || obj.htype == undefined) {\n    this.htype = Distance.manhattan;\n  } else {\n    this.htype = obj.htype;\n  }\n}\n\nAstarSearch.prototype.minFscore = function (openList, cellDetails) {\n  minF = cellDetails[openList[0].x][openList[0].y].f;\n  index = 0;\n\n  for (var i = 1; i < openList.length; i++) {\n    if (cellDetails[openList[i].x][openList[i].y].f < minF) {\n      minF = cellDetails[openList[i].x][openList[i].y].f;\n      index = i;\n    } //  if f value is same then choose wrt h value\n    // else if(cellDetails[openList[i].x][openList[i].y].f = minF){\n    //         if(cellDetails[openList[i].x][openList[i].y].g < cellDetails[openList[index].x][openList[index].y].g){index=i}\n    // }\n\n  } //end for\n\n\n  return index;\n}; //end function\n\n\nAstarSearch.prototype.successor = function (cellDetails, cell, parentNode, endNode, weight, closedList, grid, openList) {\n  htype = this.htype;\n\n  if (cell.x == endNode.x && cell.y == endNode.y) {\n    cellDetails[cell.x][cell.y].parent_i = parentNode.x;\n    cellDetails[cell.x][cell.y].parent_j = parentNode.y;\n    return true; // break;\n  } // If the successor is already on the closed list or if it is blocked(the get neighbors fun takes care of it ie, does not return blocked neighbours), then ignore it. Else do the following\n  // && !grid.isBlock(cell.x, cell.y, block)\n  else if (closedList[cell.x][cell.y] == false) {\n      gnew = cellDetails[parentNode.x][parentNode.y].g + weight;\n      hnew = htype(cell.x, cell.y, endNode);\n      fnew = gnew + hnew; //\n      // If the cell isn't in the oprn list or if it there and we have f cost less that the previous one then update it\n\n      if (cellDetails[cell.x][cell.y].f == Number.MAX_VALUE || cellDetails[cell.x][cell.y].f > fnew) {\n        openList.push(cell);\n        cell.opened = true;\n        cellDetails[cell.x][cell.y].f = fnew;\n        cellDetails[cell.x][cell.y].g = gnew;\n        cellDetails[cell.x][cell.y].h = hnew;\n        cellDetails[cell.x][cell.y].parent_i = parentNode.x;\n        cellDetails[cell.x][cell.y].parent_j = parentNode.y;\n      }\n    }\n\n  return false;\n};\n\nAstarSearch.prototype.findPath = function (startX, startY, endX, endY, grid) {\n  // check if source and destination is inside the grid // TODO: see input is valid ouside the func before givig input?\n  sourceNode = grid.getNodeAt(startX, startY);\n  endNode = grid.getNodeAt(endX, endY); // check if either of the source or destination is blocked\n\n  if (!grid.isWalkableAt(startX, startY) || !grid.isWalkableAt(endX, endY)) {\n    return [];\n  } // check if source and destination is same\n\n\n  if (sourceNode.x == endNode.x && sourceNode.y == endNode.y) {\n    return [];\n  }\n\n  var openList = [];\n  var foundDest = false; // making 2d array for closed list\n\n  var values = grid.dimention();\n  closedList = [];\n  var i, j;\n\n  for (i = 0; i < values[0]; ++i) {\n    closedList.push([]);\n\n    for (j = 0; j < values[1]; ++j) {\n      closedList[i].push(false);\n    }\n  } // 2d array that holds details of cell\n\n\n  var cellDetails = [];\n\n  for (var _i = 0; _i < values[0]; _i++) {\n    for (var _j = 0; _j < values[1]; _j++) {\n      cellDetails[_i] = [].concat(_toConsumableArray(cellDetails[_i] ? cellDetails[_i] : []), [new CellAttributes(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, -1, -1)]);\n    }\n  } // parameters of starting node\n\n\n  cellDetails[sourceNode.x][sourceNode.y].f = 0.0;\n  cellDetails[sourceNode.x][sourceNode.y].g = 0.0;\n  cellDetails[sourceNode.x][sourceNode.y].h = 0.0;\n  cellDetails[sourceNode.x][sourceNode.y].parent_i = sourceNode.x;\n  cellDetails[sourceNode.x][sourceNode.y].parent_j = sourceNode.y; // // TODO: check if same node is being pushed (can it be pushed?)\n\n  openList.push(sourceNode);\n  sourceNode.opened = true;\n\n  while (openList.length != 0) {\n    index = this.minFscore(openList, cellDetails);\n    cell = openList[index];\n\n    if (index > -1) {\n      openList.splice(index, 1);\n    }\n\n    closedList[cell.x][cell.y] = true;\n    cell.closed = true; //get neighbours\n\n    var _grid$getNeighbours = grid.getNeighbours(cell);\n\n    var _grid$getNeighbours2 = _slicedToArray(_grid$getNeighbours, 2);\n\n    neighbours = _grid$getNeighbours2[0];\n    weights = _grid$getNeighbours2[1];\n\n    // console.log(neighbours, weights)\n    for (var i = 0; i < weights.length; i++) {\n      foundDest = this.successor(cellDetails, neighbours[i], cell, endNode, weights[i], closedList, grid, openList);\n\n      if (foundDest) {\n        break;\n      }\n    } // end for loop\n\n\n    if (foundDest) {\n      break;\n    }\n\n    console.log(openList);\n  } //end while loop\n\n\n  if (foundDest == 0) {\n    return 'not found';\n  } else {\n    // console.log(closedList)\n    // console.log(cellDetails)\n    return Util.backtrace(cellDetails, endNode);\n  }\n};\n\nmodule.exports = AstarSearch;\n\n//# sourceURL=webpack:///./src/js/finders/A_star.js?");

/***/ }),

/***/ "./src/js/finders/distance.js":
/*!************************************!*\
  !*** ./src/js/finders/distance.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  // manhatten distance is absolute difference between 2 nodes\n  manhattan: function manhattan(x, y, node) {\n    return Math.abs(x - node.x) + Math.abs(y - node.y);\n  },\n  // euclidian distance is the square root of sq of diff between nodes\n  euclidean: function euclidean(x, y, node) {\n    return Math.sqrt((x - node.x) * (x - node.x) + (y - node.y) * (y - node.y));\n  },\n  // diagonal distance is the maximum distance between x and y difference\n  diagonal: function diagonal(x, y, node) {\n    return Math.max(Math.abs(x - node.x), Math.abs(y - node.y));\n  },\n  // in djkstra, distance function gives zero\n  dijkstraFinder: function dijkstraFinder(x, y, node) {\n    return 0;\n  }\n};\n\n//# sourceURL=webpack:///./src/js/finders/distance.js?");

/***/ }),

/***/ "./src/js/pathfinding.js":
/*!*******************************!*\
  !*** ./src/js/pathfinding.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pathfinding = {\n  'Heap': __webpack_require__(/*! heap */ \"./node_modules/heap/index.js\"),\n  'Node': __webpack_require__(/*! ./core/Node */ \"./src/js/core/Node.js\"),\n  'Grid': __webpack_require__(/*! ./core/Grid */ \"./src/js/core/Grid.js\"),\n  'Util': __webpack_require__(/*! ./core/Util */ \"./src/js/core/Util.js\"),\n  // 'DiagonalMovement'          : require('./core/DiagonalMovement'),\n  // 'Heuristic'                 : require('./core/Heuristic'),\n  'Distance': __webpack_require__(/*! ./finders/distance */ \"./src/js/finders/distance.js\"),\n  'AstarSearch': __webpack_require__(/*! ./finders/A_star */ \"./src/js/finders/A_star.js\") // 'BestFirstFinder'           : require('./finders/BestFirstFinder'),\n  // 'BreadthFS'                 : require('./finders/BreadthFirstSearch'),\n  // 'DijkstraFinder'            : require('./finders/DijkstraFinder'),\n  // 'BiAStarFinder'             : require('./finders/BiAStarFinder'),\n  // 'BiBestFirstFinder'         : require('./finders/BiBestFirstFinder'),\n  // 'BiBreadthFirstFinder'      : require('./finders/BiBreadthFirstFinder'),\n  // 'BiDijkstraFinder'          : require('./finders/BiDijkstraFinder'),\n  // 'IDAStarFinder'             : require('./finders/IDAStarFinder'),\n  // 'JumpPointFinder'           : require('./finders/JumpPointFinder'),\n\n};\nwindow.PF = pathfinding;\n\n//# sourceURL=webpack:///./src/js/pathfinding.js?");

/***/ })

/******/ });