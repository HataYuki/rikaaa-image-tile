/**
 * @license
 * rikaaa-image-tile.js
 *
 * Generated : 2019-08-03
 * Version : 1.0.0
 * Author : rikaaa.org | Yuki Hata
 * Url : http://rikaaa.org
 *
 *
 * The MIT License (MIT)
 *
 * Copyright 2019 rikaaa.org | Yuki Hata
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var map = (function (value, istart, istop, ostart, ostop) {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
  });

  var constrain = (function (value, min, max) {
    return Math.max(min, Math.min(max, value));
  });

  var onebang = (function (func) {
    var _func,
        allow = true;

    return function () {
      if (!allow) {
        func = null;
        return false;
      }

      _func = func.apply(this, arguments);
      allow = false;
      return _func;
    };
  });

  var Ease =
  /*#__PURE__*/
  function () {
    function Ease(typestr, duration) {
      _classCallCheck(this, Ease);

      this._type = typestr ? typestr : 'linear';
      this._t = 0;
      this._d = duration;
    }

    _createClass(Ease, [{
      key: "Convarsion",
      value: function Convarsion(val) {
        return val >= 1 ? 1.0 : val;
      }
    }, {
      key: "ease_in",
      value: function ease_in() {
        return this._t * this._t;
      }
    }, {
      key: "ease_out",
      value: function ease_out() {
        return this._t * (2 - this._t);
      }
    }, {
      key: "ease_in_out",
      value: function ease_in_out() {
        return this._t < .5 ? 2 * this._t * this._t : -1 + (4 - 2 * this._t) * this._t;
      }
    }, {
      key: "linear",
      value: function linear() {
        return this._t;
      }
    }, {
      key: "Start",
      value: function Start(func) {
        this._now = performance.now();
        var that = this;
        requestAnimationFrame(loop);

        function loop(timedamp) {
          that.requ = requestAnimationFrame(loop);
          that._t = that.Convarsion((timedamp - that._now) / that._d);

          switch (that._type.replace(/-/g, '_')) {
            case 'linear':
              func(that.linear());
              break;

            case 'ease_in':
              func(that.ease_in());
              break;

            case 'ease_out':
              func(that.ease_out());
              break;

            case 'ease_in_out':
              func(that.ease_in_out());
              break;

            default:
              break;
          }

          if (that._t >= 1.0) {
            cancelAnimationFrame(that.requ);
            if (typeof that._endFunc === 'function') that._endFunc();
          }
        }
        return this;
      }
    }, {
      key: "End",
      value: function End(func) {
        this._endFunc = func;
      }
    }, {
      key: "Stop",
      value: function Stop(func) {
        cancelAnimationFrame(this.requ);
        if (typeof func === 'function') func();
      }
    }, {
      key: "duration",
      set: function set(n) {
        this._d = n;
      },
      get: function get() {
        return this._d;
      }
    }, {
      key: "type",
      set: function set(n) {
        this._type = n;
      }
    }]);

    return Ease;
  }();

  var StaticClick =
  /*#__PURE__*/
  function () {
    function StaticClick(func) {
      _classCallCheck(this, StaticClick);

      this.StaticClickFunction = func;
    }

    _createClass(StaticClick, [{
      key: "addEvent",
      value: function addEvent(targetElement) {
        this.targetElement = targetElement;
        this.clickStartFunction_binded = this.clickStartFunction.bind(this);
        this.clickEndFunction_binded = this.clickEndFunction.bind(this);
        this.addClickStartEvent(targetElement, this.clickStartFunction_binded);
      }
    }, {
      key: "removeEvent",
      value: function removeEvent(targetElement) {
        this.removeClickStartEvent(targetElement, this.clickStartFunction_binded);
        this.removeClickEndEvent(targetElement, this.clickEndFunction_binded);
      }
    }, {
      key: "getPageX",
      value: function getPageX(e) {
        return e.pageX;
      }
    }, {
      key: "clickEndFunction",
      value: function clickEndFunction(e) {
        this.removeClickEndEvent(this.targetElement, this.clickEndFunction_binded);
        this.addClickStartEvent(this.targetElement, this.clickStartFunction_binded);
        var PageXWhenclickEnd = e.pageX;
        if (PageXWhenclickEnd === this.PageXwhenclickStart) this.StaticClickFunction(e);
      }
    }, {
      key: "clickStartFunction",
      value: function clickStartFunction(e) {
        this.removeClickStartEvent(this.targetElement, this.clickStartFunction_binded);
        this.addClickEndEvent(this.targetElement, this.clickEndFunction_binded);
        this.PageXwhenclickStart = this.getPageX(e);
      }
    }, {
      key: "addClickStartEvent",
      value: function addClickStartEvent(targetElement, func) {
        targetElement.addEventListener('mousedown', func, false);
        targetElement.addEventListener('touchstart', func, false);
      }
    }, {
      key: "removeClickStartEvent",
      value: function removeClickStartEvent(targetElement, func) {
        targetElement.removeEventListener('mousedown', func, false);
        targetElement.removeEventListener('touchstart', func, false);
      }
    }, {
      key: "addClickEndEvent",
      value: function addClickEndEvent(targetElement, func) {
        targetElement.addEventListener('mouseup', func, false);
        targetElement.addEventListener('touchend', func, false);
        targetElement.addEventListener('mouseleave', func, false);
        targetElement.addEventListener('touchleave', func, false);
      }
    }, {
      key: "removeClickEndEvent",
      value: function removeClickEndEvent(targetElement, func) {
        targetElement.removeEventListener('mouseup', func, false);
        targetElement.removeEventListener('touchend', func, false);
        targetElement.removeEventListener('mouseleave', func, false);
        targetElement.removeEventListener('touchleave', func, false);
      }
    }]);

    return StaticClick;
  }();

  var Drag =
  /*#__PURE__*/
  function () {
    function Drag(func) {
      _classCallCheck(this, Drag);

      this.functionWhenDraging = func;
      this.isFunctionWhenDragStart = false;
      this.isFunctionWhenDragEnd = false;
      this.dragStartFuncOnec = null;
      this.amountOfMouseMovedbyPixel = {
        x: 0,
        y: 0
      };
    }

    _createClass(Drag, [{
      key: "addEvent",
      value: function addEvent(targetElement) {
        this.targetElement = targetElement;
        this.dragStartFunction_binded = this.dragStartFunction.bind(this);
        this.dragingFunction_binded = this.dragingFunction.bind(this);
        this.dragEndFunction_binded = this.dragEndFunction.bind(this);
        this.addDragStartEvent(this.targetElement, this.dragStartFunction_binded);
      }
    }, {
      key: "removeEvent",
      value: function removeEvent(targetElement) {
        this.removeDragStartEvent(targetElement, this.dragStartFunction_binded);
        this.removeDragingEvent(window, this.dragingFunction_binded);
        this.removeDragEndEvent(window, this.dragEndFunction_binded);
      }
    }, {
      key: "setDragStartFunc",
      value: function setDragStartFunc(func) {
        this.isFunctionWhenDragStart = typeof func === 'function' ? true : false;
        this.functionWhenDragStart = func;
        return this;
      }
    }, {
      key: "setDragEndFunc",
      value: function setDragEndFunc(func) {
        this.isFunctionWhenDragEnd = typeof func === 'function' ? true : false;
        this.functionWhenDragEnd = func;
        return this;
      }
    }, {
      key: "dragStartFunction",
      value: function dragStartFunction(e) {
        e.preventDefault();
        this.removeDragStartEvent(this.targetElement, this.dragStartFunction_binded);
        this.addDragingEvent(window, this.dragingFunction_binded);
        this.addDragEndEvent(window, this.dragEndFunction_binded);
        this.amountOfMouseMovedbyPixel.x = 0;
        this.amountOfMouseMovedbyPixel.y = 0;
        this.mousePositionWhenDragStart = {
          x: e.pageX,
          y: e.pageY
        };

        if (this.isFunctionWhenDragStart) {
          // this.functionWhenDragStart(this.targetElement, this.mousePositionWhenDragStart);
          this.dragStartFuncOnec = onebang(this.functionWhenDragStart);
        }
      }
    }, {
      key: "dragingFunction",
      value: function dragingFunction(e) {
        var currentMousePosition = {
          x: e.pageX,
          y: e.pageY
        };
        this.amountOfMouseMovedbyPixel = {
          x: currentMousePosition.x - this.mousePositionWhenDragStart.x,
          y: currentMousePosition.y - this.mousePositionWhenDragStart.y
        };
        if (this.amountOfMouseMovedbyPixel.x === 0 && this.amountOfMouseMovedbyPixel.y === 0) return false;
        if (this.dragStartFuncOnec !== null) this.dragStartFuncOnec(this.targetElement, this.mousePositionWhenDragStart);
        this.functionWhenDraging(e, this.mousePositionWhenDragStart, this.amountOfMouseMovedbyPixel);
      }
    }, {
      key: "dragEndFunction",
      value: function dragEndFunction(e) {
        e.preventDefault();
        this.addDragStartEvent(this.targetElement, this.dragStartFunction_binded);
        this.removeDragingEvent(window, this.dragingFunction_binded);
        this.removeDragEndEvent(window, this.dragEndFunction_binded);
        if (this.amountOfMouseMovedbyPixel.x === 0 && this.amountOfMouseMovedbyPixel.y === 0) return false;

        if (this.isFunctionWhenDragEnd) {
          this.functionWhenDragEnd(this.targetElement, this.mousePositionWhenDragStart, this.amountOfMouseMovedbyPixel);
        }

        if (this.isFunctionWhenDragStart) {
          this.dragStartFuncOnec = onebang(this.functionWhenDragStart);
        }
      }
    }, {
      key: "addDragingEvent",
      value: function addDragingEvent(targetElement, func) {
        targetElement.addEventListener('mousemove', func, false);
        targetElement.addEventListener('touchmove', func, false);
      }
    }, {
      key: "removeDragingEvent",
      value: function removeDragingEvent(targetElement, func) {
        targetElement.removeEventListener('mousemove', func, false);
        targetElement.removeEventListener('touchmove', func, false);
      }
    }, {
      key: "addDragStartEvent",
      value: function addDragStartEvent(targetElement, func) {
        targetElement.addEventListener('mousedown', func, false);
        targetElement.addEventListener('touchstart', func, false);
      }
    }, {
      key: "removeDragStartEvent",
      value: function removeDragStartEvent(targetElement, func) {
        targetElement.removeEventListener('mousedown', func, false);
        targetElement.removeEventListener('touchstart', func, false);
      }
    }, {
      key: "addDragEndEvent",
      value: function addDragEndEvent(targetElement, func) {
        targetElement.addEventListener('mouseup', func, false);
        targetElement.addEventListener('touchend', func, false);
        targetElement.addEventListener('mouseleave', func, false);
        targetElement.addEventListener('touchleave', func, false);
      }
    }, {
      key: "removeDragEndEvent",
      value: function removeDragEndEvent(targetElement, func) {
        targetElement.removeEventListener('mouseup', func, false);
        targetElement.removeEventListener('touchend', func, false);
        targetElement.removeEventListener('mouseleave', func, false);
        targetElement.removeEventListener('touchleave', func, false);
      }
    }]);

    return Drag;
  }();

  var hover =
  /*#__PURE__*/
  function () {
    function hover(func) {
      _classCallCheck(this, hover);

      this.hoverFunction = func;
    }

    _createClass(hover, [{
      key: "addEvent",
      value: function addEvent(targetElement) {
        this.targetElement = targetElement;
        this.mousePosWhenHoverStart = {
          x: 0,
          y: 0
        };
        this.mouseEnterFunction_binded = this.mouseEnterFuntion.bind(this);
        this.mouseMoveFunction_binded = this.mouseMoveFunction.bind(this);
        this.mouseOutFunction_binded = this.mouseOutFunction.bind(this);
        this.addMouseEnterEvent(targetElement, this.mouseEnterFunction_binded);
      }
    }, {
      key: "removeEvent",
      value: function removeEvent(targetElement) {
        this.removeMouseEnterEvent(targetElement, this.mouseEnterFunction_binded);
        this.removeMouseMoveEvent(targetElement, this.mouseMoveFunction_binded);
        this.removeMouseOutEvent(targetElement, this.mouseOutFunction_binded);
      }
    }, {
      key: "mouseEnterFuntion",
      value: function mouseEnterFuntion(e) {
        this.removeMouseEnterEvent(this.targetElement, this.mouseEnterFunction_binded);
        this.addMouseOutEvent(this.targetElement, this.mouseOutFunction_binded);
        this.addMouseMoveEvent(this.targetElement, this.mouseMoveFunction_binded);
        this.mousePosWhenHoverStart = {
          x: e.offsetX,
          y: e.offsetY
        };
        var ishover = true;
        this.hoverFunction(e, ishover);
      }
    }, {
      key: "mouseMoveFunction",
      value: function mouseMoveFunction(e) {
        var currentMousePos = {
          x: e.offsetX,
          y: e.offsetY
        };
        var mouseMoveAmount = {
          x: currentMousePos.x - this.mousePosWhenHoverStart.x,
          y: currentMousePos.y - this.mousePosWhenHoverStart.y
        };
        if (this.mouseMoveFunctionAble) this.functionWhenMouseMove(e, mouseMoveAmount, currentMousePos);
      }
    }, {
      key: "mouseOutFunction",
      value: function mouseOutFunction(e) {
        this.removeMouseOutEvent(this.targetElement, this.mouseOutFunction_binded);
        this.removeMouseMoveEvent(this.targetElement, this.mouseMoveFunction_binded);
        this.addMouseEnterEvent(this.targetElement, this.mouseEnterFunction_binded);
        this.mousePosWhenHoverStart = {
          x: 0,
          y: 0
        };
        var ishover = false;
        this.hoverFunction(e, ishover);
      }
    }, {
      key: "setMouseMoveFunc",
      value: function setMouseMoveFunc(func) {
        this.mouseMoveFunctionAble = typeof func === 'function' ? true : false;
        this.functionWhenMouseMove = func;
        return this;
      }
    }, {
      key: "addMouseEnterEvent",
      value: function addMouseEnterEvent(targetElement, func) {
        targetElement.addEventListener('mouseenter', func, false);
      }
    }, {
      key: "removeMouseEnterEvent",
      value: function removeMouseEnterEvent(targetElement, func) {
        targetElement.removeEventListener('mouseenter', func, false);
      }
    }, {
      key: "addMouseOutEvent",
      value: function addMouseOutEvent(targetElement, func) {
        targetElement.addEventListener('mouseout', func, false);
      }
    }, {
      key: "removeMouseOutEvent",
      value: function removeMouseOutEvent(targetElement, func) {
        targetElement.removeEventListener('mouseout', func, false);
      }
    }, {
      key: "addMouseMoveEvent",
      value: function addMouseMoveEvent(targetElement, func) {
        targetElement.addEventListener('mousemove', func, false);
      }
    }, {
      key: "removeMouseMoveEvent",
      value: function removeMouseMoveEvent(targetElement, func) {
        targetElement.removeEventListener('mousemove', func, false);
      }
    }]);

    return hover;
  }();

  var valueObserver = (function (firstVal, func) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        observValKeyName = _ref.observValKeyName;

    var _func,
        _firstval = firstVal,
        _watchKeyName = observValKeyName ? observValKeyName : 'watch';

    return function () {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _objectDestructuringEmpty(_ref2);

      var originalArgument = [],
          watchVal = null;

      for (var i = 0; i < arguments.length; i++) {
        if (!arguments[i] || !(arguments[i].constructor == Object)) {
          originalArgument.push(arguments[i]);
        } else {
          watchVal = arguments[i][_watchKeyName];
          delete arguments[i][_watchKeyName];

          if (Object.keys(arguments[i]).length > 0) {
            originalArgument.push(arguments[i]);
          }
        }
      }

      if (_firstval === watchVal) {
        return false;
      }

      _firstval = watchVal;
      _func = func.apply(this, originalArgument);
      return _func;
    };
  });

  /**
   * @license
   * rikaaa-IntersectionWatcher.js
   *
   * Generated : 2019-07-19
   * Version : 0.5.0
   * Author : rikaaa.org | Yuki Hata
   * Url : http://rikaaa.org
   *
   *
   * The MIT License (MIT)
   *
   * Copyright 2019 rikaaa.org | Yuki Hata
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var isIntersecting_1 = createCommonjsModule(function (module, exports) {
    // import map from './map';
    // import constrain from './constrain';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var isIntersecting =
    /** @class */
    function () {
      function isIntersecting() {}

      isIntersecting.is = function (target, root, rootMargin) {
        if (rootMargin === void 0) {
          rootMargin = '0px';
        }

        var parentTree = isIntersecting.computeParentNode(root, target);
        if (parentTree === false) return false;
        var rectList = isIntersecting.computeCheckTargetRectList(root, parentTree, rootMargin);
        var targetRect = isIntersecting.getBoundingClientRect(target);
        var counter = 0;

        while (counter !== rectList.length) {
          var contanerRect = rectList[counter];

          if (contanerRect.width <= 0 || contanerRect.height <= 0) {
            return false;
          }

          if (contanerRect.bottom <= targetRect.top || contanerRect.top >= targetRect.bottom) {
            return false;
          }

          counter++;
        }

        return true;
      };

      isIntersecting.computeParentNode = function (root, target) {
        var rootNode = root ? root : document.documentElement;
        var tree = [];
        var html = document.documentElement;
        var parent = target;

        while (parent !== html) {
          parent = isIntersecting.getParentNode(parent);
          tree.push(parent);
        }

        if (!tree.includes(rootNode)) return false;
        return tree.splice(0, tree.indexOf(rootNode) + 1);
      };

      isIntersecting.computeCheckTargetRectList = function (root, parentTree, rootMargin) {
        var rootNode = root ? root : document.documentElement;
        var resultList = parentTree.map(function (parentNode) {
          if (parentNode !== rootNode) {
            return isIntersecting.getBoundingClientRect(parentNode);
          } else {
            return isIntersecting.getRootRect(parentNode, rootMargin);
          }
        });
        return resultList;
      };

      isIntersecting.getRootRect = function (rootNode, rootMargin) {
        var rect = null;
        var html = document.documentElement;

        if (rootNode !== html) {
          rect = isIntersecting.getBoundingClientRect(rootNode);
        } else {
          rect = {
            top: 0,
            bottom: html.clientHeight,
            right: html.clientWidth,
            left: 0,
            width: html.clientWidth,
            height: html.clientHeight
          };
        }

        return isIntersecting.applyRootMargin(rect, rootMargin);
      };

      isIntersecting.applyRootMargin = function (rect, rootMargin) {
        var margin = isIntersecting.parseRootMargin(rootMargin);
        var rectWidth = rect.width;
        var rectHeight = rect.height;
        var marginTop = margin.top[1] === 'px' ? margin.top[0] : rectHeight * margin.top[0] / 100;
        var marginBottom = margin.bottom[1] === 'px' ? margin.bottom[0] : rectHeight * margin.bottom[0] / 100;
        var marginRight = margin.right[1] === 'px' ? margin.right[0] : rectWidth * margin.right[0] / 100;
        var marginLeft = margin.left[1] === 'px' ? margin.left[0] : rectWidth * margin.left[0] / 100;
        var applyedRect = {
          top: rect.top - marginTop,
          bottom: rect.bottom + marginBottom,
          right: rect.right + marginRight,
          left: rect.left - marginLeft,
          width: 0,
          height: 0
        };
        applyedRect.width = applyedRect.right - applyedRect.left;
        applyedRect.height = applyedRect.bottom - applyedRect.top;
        return applyedRect;
      };

      isIntersecting.parseRootMargin = function (rootMargin) {
        var rootMarginArray = rootMargin.split(' ');

        var parser = function parser(rootMarginString) {
          return [parseFloat(rootMarginString), rootMarginString.match(/(px|%)/)[0]];
        };

        var result = {
          top: null,
          bottom: null,
          right: null,
          left: null
        };

        switch (rootMarginArray.length) {
          case 1:
            result.top = parser(rootMarginArray[0]);
            result.bottom = parser(rootMarginArray[0]);
            result.right = parser(rootMarginArray[0]);
            result.left = parser(rootMarginArray[0]);
            break;

          case 2:
            result.top = parser(rootMarginArray[0]);
            result.bottom = parser(rootMarginArray[0]);
            result.right = parser(rootMarginArray[1]);
            result.left = parser(rootMarginArray[1]);
            break;

          case 4:
            result.top = parser(rootMarginArray[0]);
            result.bottom = parser(rootMarginArray[2]);
            result.right = parser(rootMarginArray[1]);
            result.left = parser(rootMarginArray[3]);
            break;
        }

        return result;
      };

      isIntersecting.getParentNode = function (target) {
        var parent = target.parentNode;
        if (parent && parent.nodeType == 11 && parent.host) return parent.host;
        if (parent && parent.assignedSlot) return parent.assignedSlot.parentNode;
        return parent;
      };

      isIntersecting.getBoundingClientRect = function (target) {
        var empty = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0
        };
        var rect = null;

        try {
          return rect = target.getBoundingClientRect();
        } catch (error) {}

        if (rect === null) return empty;
      };

      return isIntersecting;
    }();

    exports.default = isIntersecting;
  });
  unwrapExports(isIntersecting_1);
  var IsDisplay = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (target) {
      var result = false;
      var style = target.currentStyle || getComputedStyle(target, '');
      result = style.display === 'none' ? false : true;
      return result;
    };
  });
  unwrapExports(IsDisplay);
  var onbang = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func) {
      var _func,
          allow = true;

      return function () {
        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        if (!allow) {
          func = null;
          return false;
        }

        _func = func.apply(this, arg);
        allow = false;
        return _func;
      };
    };
  });
  unwrapExports(onbang);
  var debounce = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func, interval) {
      var timer = null;
      return function () {
        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        clearTimeout(timer);
        timer = setTimeout(function () {
          return func.apply(this, arg);
        }, interval);
      };
    };
  });
  unwrapExports(debounce);
  var throttle = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func, interval) {
      var req = null;
      var startTime = null;
      var firstFunc = onbang.default(func);
      var lastFunc = debounce.default(func, interval);
      var clearFirstFunc = debounce.default(function () {
        firstFunc = onbang.default(func);
        startTime = null;
        cancelAnimationFrame(req);
      }, interval);
      return function () {
        var _this = this;

        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        firstFunc.apply(this, arg);
        req = requestAnimationFrame(function (timestamp) {
          if (startTime === null) startTime = timestamp;
          var elapsedTime = timestamp - startTime;

          if (elapsedTime >= interval) {
            startTime = null;
            cancelAnimationFrame(req);
            return func.apply(_this, arg);
          }
        });
        clearFirstFunc();
        return lastFunc.apply(this, arg);
      };
    };
  });
  unwrapExports(throttle);
  var valueObserver$1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (firstVal, func, option) {
      if (option === void 0) {
        option = {
          observValKeyName: 'watch'
        };
      }

      var _func,
          _firstval = firstVal,
          _watchKeyName = option.observValKeyName;

      return function (_a) {
        _a = {};
        var originalArgument = [],
            watchVal = null;

        for (var i = 0; i < arguments.length; i++) {
          if (!arguments[i] || !(arguments[i].constructor == Object)) {
            originalArgument.push(arguments[i]);
          } else {
            watchVal = arguments[i][_watchKeyName];
            delete arguments[i][_watchKeyName];

            if (Object.keys(arguments[i]).length > 0) {
              originalArgument.push(arguments[i]);
            }
          }
        }

        if (_firstval === watchVal) {
          return false;
        }

        _firstval = watchVal;
        _func = func.apply(this, originalArgument);
        return _func;
      };
    };
  });
  unwrapExports(valueObserver$1);

  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function value(searchElement, fromIndex) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        } // 1. Let O be ? ToObject(this value).


        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If len is 0, return false.

        if (len === 0) {
          return false;
        } // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)


        var n = fromIndex | 0; // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.

        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
        } // 7. Repeat, while k < len


        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          } // c. Increase k by 1. 


          k++;
        } // 8. Return false


        return false;
      }
    });
  }

  var Controller_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Controller =
    /** @class */
    function () {
      // public scrollbarbarThickness: Number | number = 0;
      function Controller() {
        this.instancesOfintersectionWatcher = [];
        this.targetsAll = [];
        this.scrollAreasOftargets = [];
        this.mutationObserverConfig = {
          childList: true,
          attributes: true,
          characterData: true,
          subtree: true
        };
        this.watcher_binded = throttle.default(Controller.watcher.bind(null, this), Controller.THROTTLE_INTERVAL);
        this.mo = new MutationObserver(this.watcher_binded); // this.scrollbarbarThickness = isIntersecting.getScrollbarThickness()

        this.firstCallback = debounce.default(onbang.default(function (entriesContaner) {
          entriesContaner.forEach(function (entries) {
            var callbackArg = entries.entries.map(function (entry) {
              var isDisplay = Controller.isDisplay(entry.target);
              if (isDisplay) return Object.freeze({
                target: entry.target,
                isIntersecting: entry.isIntersecting
              });
            }).filter(function (entry) {
              return typeof entry !== 'undefined';
            });
            if (callbackArg.length !== 0) entries.callback(callbackArg);
          });
        }), Controller.THROTTLE_INTERVAL);
      }

      Controller.prototype.init = function (instance) {
        this.instancesOfintersectionWatcher.push(instance);
      };

      Controller.prototype.observe = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.scrollAreasOftargets = Controller.updateScrollAreasOftargets(this.targetsAll);
        if (this.targetsAll.length !== 0) Controller.onWather(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
        this.firstCallback(this.entriesContaner);
      };

      Controller.prototype.unobserve = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
      };

      Controller.prototype.disconnect = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);

        if (this.targetsAll.length === 0) {
          Controller.offWather(this);
          this.scrollAreasOftargets = [];
        }
      };

      Controller.watcher = function (instanse) {
        instanse.entriesContaner.forEach(function (entries) {
          var callbackArg = entries.entries.map(function (entry) {
            var option = entries.option;
            var isDisplay = Controller.isDisplay(entry.target);
            var currentIntersecting = Controller.isIntersecting(entry.target, option.root, option.rootMargin);
            var isIntersectionChenge = entry.valueObserver({
              watch: currentIntersecting
            });
            if (isIntersectionChenge) entry.isIntersecting = currentIntersecting;
            if (isDisplay && isIntersectionChenge) return Object.freeze({
              target: entry.target,
              isIntersecting: entry.isIntersecting
            });
          }).filter(function (entry) {
            return typeof entry !== 'undefined';
          });
          if (callbackArg.length !== 0) entries.callback(callbackArg);
        });
      };

      Controller.calculateEntriesContaner = function (instances) {
        return instances.map(function (instance) {
          var option = instance.option;
          var entries = instance.targets.map(function (target) {
            var isIntersecting = Controller.isIntersecting(target, option.root, option.rootMargin);
            return {
              target: target,
              isIntersecting: isIntersecting,
              valueObserver: valueObserver$1.default(isIntersecting, function () {
                return true;
              })
            };
          });
          instance.entries = entries;
          return instance;
        });
      };

      Controller.updateTargetsAll = function (instance) {
        return instance.instancesOfintersectionWatcher.map(function (instance) {
          return instance.targets;
        }).reduce(function (a, c) {
          return a.concat(c);
        }, []);
      };

      Controller.updateScrollAreasOftargets = function (targetsAll) {
        var computeParentNode = function computeParentNode(target) {
          var tree = [];
          var html = document.documentElement;
          var parent = target;

          while (parent !== html) {
            parent = isIntersecting_1.default.getParentNode(parent);
            tree.push(parent);
          }

          return tree;
        };

        var scrollAreas = targetsAll.map(function (target) {
          var parents = computeParentNode(target);
          return parents.filter(function (parent) {
            var style = getComputedStyle(parent, '');
            var isScroll = style.overflow === 'scroll' || style.overflow === 'auto' || style.overflowY === 'scroll' || style.overflowY === 'auto';
            if (isScroll) return true;
          });
        });
        return scrollAreas.reduce(function (a, c) {
          return a.concat(c);
        }, []);
      };

      Controller.onWather = function (instance) {
        var scrollPassive = {
          passive: true
        };
        window.addEventListener('resize', instance.watcher_binded, false);
        window.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        document.documentElement.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        document.body.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        instance.mo.observe(document.querySelector('html'), instance.mutationObserverConfig);
        instance.scrollAreasOftargets.forEach(function (target) {
          target.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        });
      };

      Controller.offWather = function (instance) {
        window.removeEventListener('resize', instance.watcher_binded);
        window.removeEventListener('scroll', instance.watcher_binded);
        document.documentElement.removeEventListener('scroll', instance.watcher_binded);
        document.body.removeEventListener('scroll', instance.watcher_binded);
        instance.mo.disconnect();
        instance.scrollAreasOftargets.forEach(function (target) {
          target.removeEventListener('scroll', instance.watcher_binded);
        });
      };

      Controller.isIntersecting = function (target, root, rootMargin) {
        return isIntersecting_1.default.is(target, root, rootMargin);
      };

      Controller.isDisplay = function (target) {
        return IsDisplay.default(target);
      };

      Object.defineProperty(Controller, "THROTTLE_INTERVAL", {
        get: function get() {
          return 33;
        },
        enumerable: true,
        configurable: true
      });
      return Controller;
    }();

    exports.default = Controller;
  });
  unwrapExports(Controller_1);
  var rikaaaIntersectionWatcher_1 = createCommonjsModule(function (module, exports) {
    var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var defaultOption = {
      rootMargin: '0px',
      root: null
    };
    var controller = new Controller_1.default();

    var rikaaaIntersectionWatcher =
    /** @class */
    function () {
      function rikaaaIntersectionWatcher(callback, option) {
        if (option === void 0) {
          option = {};
        }

        this.callback = callback;
        this.targets = [];
        this.entries = [];
        this.option = __assign({}, defaultOption, option);
        controller.init(this);
      }

      rikaaaIntersectionWatcher.prototype.observe = function (target) {
        var exist = this.targets.includes(target);
        if (!exist) this.targets.push(target);
        controller.observe();
      };

      rikaaaIntersectionWatcher.prototype.unobserve = function (target) {
        this.targets = this.targets.filter(function (existTarget) {
          return existTarget !== target;
        });
        controller.unobserve();
      };

      rikaaaIntersectionWatcher.prototype.disconnect = function () {
        this.targets = [];
        controller.disconnect();
      };

      rikaaaIntersectionWatcher.isIntersecting = function (target, root, rootMargin) {
        return Controller_1.default.isIntersecting(target, root, rootMargin);
      };

      rikaaaIntersectionWatcher.isDisplay = function (target) {
        return Controller_1.default.isDisplay(target);
      };

      Object.defineProperty(rikaaaIntersectionWatcher, "THROTTLE_INTERVAL", {
        get: function get() {
          return Controller_1.default.THROTTLE_INTERVAL;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(rikaaaIntersectionWatcher, "CONTROLLER", {
        get: function get() {
          return controller;
        },
        enumerable: true,
        configurable: true
      });
      return rikaaaIntersectionWatcher;
    }();

    exports.default = rikaaaIntersectionWatcher;
  });
  var rikaaaIntersectionWatcher = unwrapExports(rikaaaIntersectionWatcher_1);

  if (!Array.prototype.filter) {
    Array.prototype.filter = function (func, thisArg) {

      if (!((typeof func === 'Function' || typeof func === 'function') && this)) throw new TypeError();
      var len = this.length >>> 0,
          res = new Array(len),
          // preallocate array
      t = this,
          c = 0,
          i = -1;

      if (thisArg === undefined) {
        while (++i !== len) {
          // checks to see if the key was set
          if (i in this) {
            if (func(t[i], i, t)) {
              res[c++] = t[i];
            }
          }
        }
      } else {
        while (++i !== len) {
          // checks to see if the key was set
          if (i in this) {
            if (func.call(thisArg, t[i], i, t)) {
              res[c++] = t[i];
            }
          }
        }
      }

      res.length = c; // shrink down array to proper size

      return res;
    };
  }

  if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
      value: function value(_value) {
        // Steps 1-2.
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }

        var O = Object(this); // Steps 3-5.

        var len = O.length >>> 0; // Steps 6-7.

        var start = arguments[1];
        var relativeStart = start >> 0; // Step 8.

        var k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len); // Steps 9-10.

        var end = arguments[2];
        var relativeEnd = end === undefined ? len : end >> 0; // Step 11.

        var final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len); // Step 12.

        while (k < final) {
          O[k] = _value;
          k++;
        } // Step 13.


        return O;
      }
    });
  }

  if (![].keys) {
    Array.prototype.keys = function () {
      var k,
          a = [],
          nextIndex = 0,
          ary = this;
      k = ary.length;

      while (k > 0) {
        a[--k] = k;
      }

      a.next = function () {
        return nextIndex < ary.length ? {
          value: nextIndex++,
          done: false
        } : {
          done: true
        };
      };

      return a;
    };
  }

  var _css = ':host {  display: block;  width: 100%;  position: relative; }  :host * {    -webkit-box-sizing: border-box;            box-sizing: border-box; }  :host canvas {    vertical-align: bottom; }  :host .canvas-overlay {    position: absolute;    width: 100%;    height: 100%;    pointer-events: none; }    :host .canvas-overlay .gide-ui {      display: none;      position: relative;      width: 100%;      height: 100%; }      :host .canvas-overlay .gide-ui .gide-wrap {        position: absolute; }        :host .canvas-overlay .gide-ui .gide-wrap .gide-inner {          width: 100%;          height: 100%; }        :host .canvas-overlay .gide-ui .gide-wrap.top-end-gide, :host .canvas-overlay .gide-ui .gide-wrap.bottom-end-gide {          width: 100%;          height: 3px; }        :host .canvas-overlay .gide-ui .gide-wrap.right-end-gide, :host .canvas-overlay .gide-ui .gide-wrap.left-end-gide {          width: 3px;          height: 100%; }          :host .canvas-overlay .gide-ui .gide-wrap.right-end-gide .gide-inner, :host .canvas-overlay .gide-ui .gide-wrap.left-end-gide .gide-inner {            position: relative; }            :host .canvas-overlay .gide-ui .gide-wrap.right-end-gide .gide-inner .bar, :host .canvas-overlay .gide-ui .gide-wrap.left-end-gide .gide-inner .bar {              position: absolute; }        :host .canvas-overlay .gide-ui .gide-wrap.top-end-gide {          top: 0; }        :host .canvas-overlay .gide-ui .gide-wrap.bottom-end-gide {          bottom: 0; }        :host .canvas-overlay .gide-ui .gide-wrap.right-end-gide {          right: 0; }        :host .canvas-overlay .gide-ui .gide-wrap.left-end-gide {          left: 0; }        :host .canvas-overlay .gide-ui .gide-wrap .bar {          background-color: white;          width: 100%;          height: 100%; }          :host .canvas-overlay .gide-ui .gide-wrap .bar.top-end-gide-bar, :host .canvas-overlay .gide-ui .gide-wrap .bar.bottom-end-gide-bar {            width: 100%;            margin: 0 auto; }          :host .canvas-overlay .gide-ui .gide-wrap .bar.right-end-gide-bar, :host .canvas-overlay .gide-ui .gide-wrap .bar.left-end-gide-bar {            height: 100%;            top: 50%;            bottom: 50%;            margin: auto 0; }';

  var _style = "<style>".concat(_css, "</style>");

  var _shadowdomHTML = "\n    ".concat(_style, "\n    <div class=\"canvas-overlay\">\n        <div class=\"gide-ui\">\n            <div class=\"gide-wrap top-end-gide\"><div class=\"gide-inner\"><div class=\"bar top-end-gide-bar\"></div></div></div>\n            <div class=\"gide-wrap right-end-gide\"><div class=\"gide-inner\"><div class=\"bar right-end-gide-bar\"></div></div></div>\n            <div class=\"gide-wrap bottom-end-gide\"><div class=\"gide-inner\"><div class=\"bar bottom-end-gide-bar\"></div></div></div>\n            <div class=\"gide-wrap left-end-gide\"><div class=\"gide-inner\"><div class=\"bar left-end-gide-bar\"></div></div></div>\n        </div>\n    </div>\n    <canvas>\n");

  var template = document.createElement('template');
  template.id = 'rikaaaimagetile';
  template.innerHTML = _shadowdomHTML;
  if (window.ShadyCSS) ShadyCSS.prepareTemplate(template, 'rikaaa-image-tile');
  var placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

  var rikaaaimagetile =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(rikaaaimagetile, _HTMLElement);

    function rikaaaimagetile() {
      var _this;

      _classCallCheck(this, rikaaaimagetile);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(rikaaaimagetile).call(this));
      if (window.ShadyCSS) ShadyCSS.styleElement(_assertThisInitialized(_this));

      _this.attachShadow({
        mode: 'open'
      });

      _this.shadowRoot.appendChild(template.content.cloneNode(true));

      _this.srcArrayOfImage = [];
      _this.loadedImageData = null;
      _this.isLoadedMainData = false;
      _this.isTryLoadMainData = false;
      _this.row = 4;
      _this.indexOfSelectedTile = 0;
      _this.duration = 500;
      _this.loadTiming = '100px 0px 100px 0px';
      _this.zoomAble = true;
      _this.dragAble = true;
      _this.hoverAble = true;
      _this.isZoomedStart = false;
      _this.opacityOfSelected = 0.7;
      _this.tileBackGroundColor = 'rgba(255,255,255,1)';
      _this.zoomEase = new Ease();
      _this.easeTypeOfZoomIn = 'ease-in-out';
      _this.easeTypeOfZoomOut = 'ease-in-out';
      _this.easeTypeOfTileShift = 'ease-in-out';
      _this.resolution = window.devicePixelRatio || 1;
      _this.clickPosition = {
        x: 0,
        y: 0
      };
      _this.isApplyOffsetInDrawLoop = true;
      _this.zoomRatio = 0;
      _this.canvas = _this.shadowRoot.querySelector('canvas');
      _this.ctx = _this.shadowRoot.querySelector('canvas').getContext('2d');
      _this.canvasOverlay = _this.shadowRoot.querySelector('.canvas-overlay');
      _this.gideUi = _this.shadowRoot.querySelector('.gide-ui');
      _this.gidebarOfTop = _this.shadowRoot.querySelector('.top-end-gide-bar');
      _this.gidebarOfBottom = _this.shadowRoot.querySelector('.bottom-end-gide-bar');
      _this.gidebarOfRight = _this.shadowRoot.querySelector('.right-end-gide-bar');
      _this.gidebarOfLeft = _this.shadowRoot.querySelector('.left-end-gide-bar');

      if (!window.IntersectionObserver && !window.WcRikaaaIntersectionObserver) {
        Object.defineProperty(window, 'WcRikaaaIntersectionObserver', {
          value: rikaaaIntersectionWatcher
        });
      }

      _this.intersectionobserver = window.IntersectionObserver || window.WcRikaaaIntersectionObserver;
      _this.loadMainImageOnece = onebang(_this.loadMainImage.bind(_assertThisInitialized(_this)));
      _this.zoomIn_click = new StaticClick(_this.clickOfZoomIn.bind(_assertThisInitialized(_this)));
      _this.zoomOut_click = new StaticClick(_this.clickOfZoomOut.bind(_assertThisInitialized(_this)));
      var edgeGideVisibrityWhenDrag = new Ease('ease-in');
      _this.drag = new Drag(function (targetElement, mousePositionWhenDragStart, amountOfMouseMove) {
        _this.dragTile(amountOfMouseMove);

        _this.isApplyOffsetInDrawLoop = false;
      }).setDragStartFunc(function () {
        _this.zoomOut_click.removeEvent(_this.canvas);

        _this.offsetOfSelectedTileWhenDragStart = _this.offsetOfSelectedTile;
        edgeGideVisibrityWhenDrag.Stop();

        _this.applyEndGideVisibrity(1);
      }).setDragEndFunc(function () {
        _this.tileShift(_this.indexOfSelectedTile, _this.duration, function () {
          _this.isApplyOffsetInDrawLoop = true;
        });

        edgeGideVisibrityWhenDrag.Stop();
        edgeGideVisibrityWhenDrag.duration = _this.duration;
        edgeGideVisibrityWhenDrag.Start(function (e) {
          _this.applyEndGideVisibrity(1 - e);
        }).End(function () {
          _this.zoomOut_click.addEvent(_this.canvas);
        });
      });
      _this.hover = new hover(function (e, ishover) {
        if (!ishover) _this.tileHoverEnd();
      }).setMouseMoveFunc(_this.tileHovering.bind(_assertThisInitialized(_this)));
      if (_this.zoomAble || _this.isZoomedStart === false) _this.zoomIn_click.addEvent(_this.canvas);
      if (_this.hoverAble) _this.hover.addEvent(_this.canvas);
      return _this;
    }

    _createClass(rikaaaimagetile, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.init();

        if (!this.elementInViewPort) {
          this.prepareIntersection(null, null);
        }

        this.dispatchEvent(new CustomEvent('load'));
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.elementInViewPort.unobserve(this);
        this.elementInViewPort.disconnect(this);
        this.zoomIn_click.removeEvent(this.canvas);
        this.zoomOut_click.removeEvent(this.canvas);
        this.drag.removeEvent(this.canvas);
        this.hover.removeEvent(this.canvas);
        cancelAnimationFrame(this.animation);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldval, newval) {
        var _this2 = this;

        if (attr === 'src' && newval !== '') {
          this.srcArrayOfImage = newval.split(',');
          if (this.isTryLoadMainData && this.isLoadedMainData === false) this.loadMainImage();
        }

        if (attr === 'row') {
          this.row = Math.max(Number(newval), 1);

          if (this.loadedImageData !== null) {
            this.tilesState = this.computeTilesState(this.loadedImageData, this.row, this.getBoundingClientRect().width);
          }
        }

        if (attr === 'imagesize') {
          var size = newval.split('x');
          this.useImageSize = {
            w: size[0],
            h: size[1]
          };
        }

        if (attr === 'imagelength') this.useImageLength = Number(newval);
        if (attr === 'duration') this.duration = Number(newval);
        if (attr === 'firstselect') this.indexOfSelectedTile = Number(newval);

        if (attr === 'zoomable') {
          this.zoomAble = newval.toLowerCase() === 'true';

          if (this.zoomAble) {
            if (this.zoomRatio <= 0.5) this.zoomIn_click.addEvent(this.canvas);else this.zoomOut_click.addEvent(this.canvas);
          } else {
            this.zoomIn_click.removeEvent(this.canvas);
            this.zoomOut_click.removeEvent(this.canvas);
          }
        }

        if (attr === 'dragable') {
          this.dragAble = newval.toLowerCase() === 'true';

          if (this.dragAble === false) {
            this.drag.removeEvent(this.canvas);
            this.tileShift(this.indexOfSelectedTile, this.duration, function () {
              _this2.isApplyOffsetInDrawLoop = true;
            });
          } else {
            if (this.zoomRatio === 1) this.drag.addEvent(this.canvas);
          }
        }

        if (attr === 'hoverable') {
          this.hoverAble = newval.toLowerCase() === 'true';

          if (this.hoverAble) {
            if (this.zoomRatio === 0) this.hover.addEvent(this.canvas);
          } else {
            this.hover.removeEvent(this.canvas);
          }
        }

        if (attr === 'iszoomedstart') {
          this.isZoomedStart = newval.toLowerCase() === 'true';

          if (this.isZoomedStart) {
            this.zoomIn_click.removeEvent(this.canvas);
            this.zoomOut_click.addEvent(this.canvas);
            this.drag.addEvent(this.canvas);
          }
        }

        if (attr === 'loadtiming') this.loadTiming = newval;
        if (attr === 'backgroundcolor') this.tileBackGroundColor = newval;
        if (attr === 'opacityofselected') this.opacityOfSelected = Number(newval);
        if (attr === 'endgideable') this.uiAble = newval.toLowerCase() === 'true';
        if (attr === 'endgidewidth') this.endGideBarWidth = Number(newval);
        if (attr === 'endgidebarcolor') this.endGideBarColor = newval;
      }
    }, {
      key: "init",
      value: function init() {
        var _this3 = this;

        this.loadImage().then(function (loadedImageData) {
          _this3.loadedImageData = loadedImageData;
          _this3.tilesState = _this3.computeTilesState(loadedImageData, _this3.row, _this3.getBoundingClientRect().width);
          _this3.offsetOfSelectedTile = _this3.calculatOffsetOfSelectedTile(_this3.indexOfSelectedTile, _this3.tilesState);

          _this3.applyRatioToEndGideBar(_this3.offsetOfSelectedTile.x, _this3.offsetOfSelectedTile.y);

          _this3.drawLoop(_this3.canvas, _this3.ctx);

          if (_this3.isZoomedStart) _this3.zoomIntoSelectedTile(_this3.indexOfSelectedTile, 0);
        });
      }
    }, {
      key: "prepareIntersection",
      value: function prepareIntersection(root, rootMargin) {
        if (this.elementInViewPort) {
          this.elementInViewPort.unobserve(this);
          this.elementInViewPort.disconnect();
        }

        var option = {};
        if (root) option.root = root;
        option.rootMargin = this.loadTiming || rootMargin;
        this.elementInViewPort = new this.intersectionobserver(this.whenInViewPort.bind(this), option);
        this.elementInViewPort.observe(this);
      }
    }, {
      key: "setRoot",
      value: function setRoot(node) {
        if (!this.isTryLoadMainData) this.prepareIntersection(node, this.loadTiming);
      }
    }, {
      key: "whenInViewPort",
      value: function whenInViewPort(event) {
        if (event[0].isIntersecting) {
          this.loadMainImageOnece();
          this.isTryLoadMainData = true;
        }
      }
    }, {
      key: "loadMainImage",
      value: function loadMainImage() {
        var _this4 = this;

        var isSrcExist = this.srcArrayOfImage.length === 0 ? false : true;
        if (isSrcExist === false || this.isLoadedMainData === true) return false;
        this.loadImage(this.srcArrayOfImage).then(function (loadedImageData) {
          _this4.loadedImageData = loadedImageData;
          _this4.tilesState = _this4.computeTilesState(loadedImageData, _this4.row, _this4.getBoundingClientRect().width);
          _this4.isLoadedMainData = true;

          _this4.dispatchEvent(new CustomEvent('tileLoad'));
        });
      }
    }, {
      key: "calculatTileWidthHeight",
      value: function calculatTileWidthHeight(oneOfLoadImageData, rowLength, widthOfTileArea) {
        return {
          width: widthOfTileArea / rowLength,
          height: widthOfTileArea / rowLength / oneOfLoadImageData.aspect.w * oneOfLoadImageData.aspect.h
        };
      }
    }, {
      key: "computeTabelOfTile",
      value: function computeTabelOfTile(loadedImageData_addedTileSize, rowLength) {
        var tileLength = loadedImageData_addedTileSize.length;
        var templateOfTable = new Array(Math.ceil(tileLength / rowLength)).fill(new Array(rowLength).fill(null));
        return templateOfTable.map(function (col, colIndex) {
          return col.map(function (row, rowIndex) {
            var imageData = loadedImageData_addedTileSize[rowIndex + rowLength * colIndex];

            if (imageData) {
              imageData.x = imageData.viewWdith * rowIndex;
              imageData.y = imageData.viewHeigth * colIndex;
            }

            return imageData ? imageData : null;
          });
        });
      }
    }, {
      key: "calculatTileAreaHeight",
      value: function calculatTileAreaHeight(TableOfTile) {
        return TableOfTile.map(function (row) {
          return row[0].viewHeigth;
        }).reduce(function (a, c) {
          return a + c;
        });
      }
    }, {
      key: "computeTilesState",
      value: function computeTilesState(loadedImageData, rowLength, widthOfTileArea) {
        var _this5 = this;

        // add view size of tiles to loadedImageData
        var loadedImageData_addedTileSize = loadedImageData.map(function (imageData) {
          var viewSize = _this5.calculatTileWidthHeight(imageData, rowLength, widthOfTileArea);

          imageData.viewWdith = viewSize.width;
          imageData.viewHeigth = viewSize.height;
          return imageData;
        });
        var table = this.computeTabelOfTile(loadedImageData_addedTileSize, rowLength);
        var tableFlat = table.reduce(function (a, c) {
          return a.concat(c);
        }, []).filter(function (v) {
          return v !== null;
        });
        var TileAreaHeight = this.calculatTileAreaHeight(table);
        return {
          table: table,
          tableFlat: tableFlat,
          tileAreaHeight: TileAreaHeight
        };
      }
    }, {
      key: "calculatOffsetOfSelectedTile",
      value: function calculatOffsetOfSelectedTile(selectedTileIndex, tilesState) {
        var selectedTileState = tilesState.tableFlat[selectedTileIndex];
        var offset = {
          x: (selectedTileState.x + selectedTileState.viewWdith / 2 - this.getBoundingClientRect().width / 2) * -1,
          y: (selectedTileState.y + selectedTileState.viewHeigth / 2 - tilesState.tileAreaHeight / 2) * -1
        };
        return offset;
      }
    }, {
      key: "updateTileState",
      value: function updateTileState(areaW) {
        this.tilesState = this.computeTilesState(this.loadedImageData, this.row, areaW);
      }
    }, {
      key: "drawLoop",
      value: function drawLoop(canvasElem, ctx) {
        var _this6 = this;

        this.watchOffset = valueObserver(this.offsetOfSelectedTile.x + this.offsetOfSelectedTile.y, this.offsetChangeReporter);
        this.watchindexOfSelected = valueObserver(this.indexOfSelectedTile, this.indexOfSelectedChangeReporter);
        this.watchViewSize = valueObserver(this.getBoundingClientRect().width, this.updateTileState);

        this.loop = function () {
          var areaW = _this6.getBoundingClientRect().width;

          _this6.watchViewSize(areaW, {
            watch: areaW
          });

          _this6.edgeOfMoveOffset = _this6.computeEdgeOfOffset(_this6.tilesState);
          var aspectOfSelectedTile = _this6.tilesState.tableFlat[_this6.indexOfSelectedTile].aspect;
          var screenWidth = areaW;
          var screenHeightWhenZoomOut = _this6.tilesState.tileAreaHeight;
          var screenHeightWhenZoomIn = screenWidth / aspectOfSelectedTile.w * aspectOfSelectedTile.h;
          var screenHeightDiff = screenHeightWhenZoomIn - screenHeightWhenZoomOut;
          var maxScreenHeight = Math.max(screenHeightWhenZoomIn, screenHeightWhenZoomOut);
          var minScreenHeight = Math.min(screenHeightWhenZoomIn, screenHeightWhenZoomOut);
          var screenHeight = Math.max(screenHeightWhenZoomOut * (1 - _this6.zoomRatio), screenHeightWhenZoomIn * _this6.zoomRatio);
          var screenHeight_Clicped = constrain(screenHeight, minScreenHeight, maxScreenHeight);
          _this6.screenWidth = screenWidth;
          _this6.screenHeight = screenHeightWhenZoomOut;
          var offset = _this6.offsetOfSelectedTile;

          if ((_this6.zoomRatio === 0 || _this6.zoomRatio === 1) && _this6.isApplyOffsetInDrawLoop) {
            offset = _this6.calculatOffsetOfSelectedTile(_this6.indexOfSelectedTile, _this6.tilesState);
            _this6.offsetOfSelectedTile = offset;
          }

          var offsetX = constrain(offset.x, _this6.edgeOfMoveOffset.minX, _this6.edgeOfMoveOffset.maxX) * _this6.zoomRatio;

          var offsetY = constrain(offset.y, _this6.edgeOfMoveOffset.minY, _this6.edgeOfMoveOffset.maxY) * _this6.zoomRatio;

          var scale = map(_this6.zoomRatio, 0, 1, 1, _this6.row);
          canvasElem.width = _this6.screenWidth * _this6.resolution;
          canvasElem.height = screenHeight_Clicped * _this6.resolution;
          canvasElem.style.width = "".concat(_this6.screenWidth, "px");
          canvasElem.style.height = "".concat(screenHeight_Clicped, "px");

          _this6.watchOffset(offsetX, offsetY, {
            watch: offset.x + offset.y
          });

          _this6.watchindexOfSelected(_this6.indexOfSelectedTile, {
            watch: _this6.indexOfSelectedTile
          });

          ctx.translate(_this6.screenWidth / 2 * _this6.resolution, _this6.screenHeight / 2 * _this6.resolution);
          ctx.scale(scale, scale); // zoom

          ctx.save();
          ctx.translate(offsetX * _this6.resolution, offsetY * _this6.resolution); // tile shift 

          ctx.save();
          ctx.translate(0, screenHeightDiff / 2 / _this6.row * _this6.zoomRatio * _this6.resolution); // fit tile top to canvas top

          ctx.save();
          ctx.translate(-1 * _this6.screenWidth / 2 * _this6.resolution, -1 * _this6.screenHeight / 2 * _this6.resolution); // centering 

          ctx.scale(_this6.resolution, _this6.resolution);

          _this6.tilesState.tableFlat.forEach(function (tile) {
            ctx.fillStyle = _this6.isLoadedMainData ? _this6.tileBackGroundColor : 'rgba(0,0,0,0)';
            ctx.fillRect(tile.x, tile.y, tile.viewWdith - 0.5, tile.viewHeigth - 0.5);
            if (_this6.hoverAble) ctx.globalAlpha = map(_this6.zoomRatio, 0, 1, tile.opacity, 1);
            ctx.drawImage(tile.img, tile.x, tile.y, tile.viewWdith, tile.viewHeigth);
          });

          ctx.restore();
          ctx.restore();
          ctx.restore();
          _this6.animation = requestAnimationFrame(_this6.loop);
        };

        this.loop();
      }
    }, {
      key: "clickOfZoomIn",
      value: function clickOfZoomIn(e) {
        var _this7 = this;

        this.clickPosition.x = e.offsetX;
        this.clickPosition.y = e.offsetY;
        var selected = this.calculatSelectedIndexFromClickPos(this.clickPosition.x, this.clickPosition.y, this.tilesState);
        this.dispatchEvent(new CustomEvent('tileClick', {
          detail: {
            zoomin: true,
            currentIndex: selected
          }
        }));

        if (selected !== false) {
          this.zoomIn_click.removeEvent(this.canvas); // this.hover.removeEvent(this.canvas);

          this.zoomIntoSelectedTile(selected, this.duration, function () {
            _this7.zoomOut_click.addEvent(_this7.canvas);

            if (_this7.dragAble) _this7.drag.addEvent(_this7.canvas);
          });
        }
      }
    }, {
      key: "clickOfZoomOut",
      value: function clickOfZoomOut() {
        var _this8 = this;

        this.zoomOut_click.removeEvent(this.canvas);
        this.dispatchEvent(new CustomEvent('tileClick', {
          detail: {
            zoomin: false,
            currentIndex: this.indexOfSelectedTile
          }
        }));
        this.zoomOut(this.duration, function () {
          _this8.zoomIn_click.addEvent(_this8.canvas); // if(this.hoverAble) this.hover.addEvent(this.canvas);


          _this8.drag.removeEvent(_this8.canvas);
        });
      }
    }, {
      key: "calculatSelectedIndexFromClickPos",
      value: function calculatSelectedIndexFromClickPos(clickPositionX, clickPositionY, tileState) {
        var tableFlat = tileState.tableFlat;
        var tileOfDetected = tableFlat.filter(function (imageData, i) {
          var detectionArea = {
            minX: imageData.x,
            maxX: imageData.x + imageData.viewWdith,
            minY: imageData.y,
            maxY: imageData.y + imageData.viewHeigth
          };
          var isHorizon = clickPositionX >= detectionArea.minX && clickPositionX < detectionArea.maxX;
          var isVertical = clickPositionY >= detectionArea.minY && clickPositionY < detectionArea.maxY;
          return isHorizon && isVertical ? true : false;
        });
        var indexOfSelectedTile = tableFlat.indexOf(tileOfDetected[0]);

        if (indexOfSelectedTile !== -1) {
          return indexOfSelectedTile;
        } else {
          return false;
        }
      }
    }, {
      key: "tileShift",
      value: function tileShift(indexOfSelectedTile, duration, shiftCompleteFunction) {
        var _this9 = this;

        this.indexOfSelectedTile = indexOfSelectedTile;
        var isCompleteFunction = typeof shiftCompleteFunction === 'function' ? true : false;
        var currentOffset = this.offsetOfSelectedTile;
        var newOffset = this.calculatOffsetOfSelectedTile(indexOfSelectedTile, this.tilesState);
        var offsetDiff = {
          x: newOffset.x - currentOffset.x,
          y: newOffset.y - currentOffset.y
        };
        var tileShiftEase = new Ease(this.easeTypeOfTileShift, duration);

        var easeFunction = function easeFunction(e) {
          var calculatedOffset = {
            x: currentOffset.x + offsetDiff.x * e,
            y: currentOffset.y + offsetDiff.y * e
          };
          _this9.offsetOfSelectedTile = calculatedOffset;
        };

        this.isApplyOffsetInDrawLoop = false;

        if (duration !== 0) {
          tileShiftEase.Start(function (e) {
            easeFunction(e);
          }).End(function () {
            if (isCompleteFunction) shiftCompleteFunction();
            _this9.indexOfSelectedTile = indexOfSelectedTile;
            _this9.isApplyOffsetInDrawLoop = true;
          });
        } else {
          easeFunction(1);
          if (isCompleteFunction) shiftCompleteFunction();
          this.indexOfSelectedTile = indexOfSelectedTile;
          this.isApplyOffsetInDrawLoop = true;
        }
      }
    }, {
      key: "zoom",
      value: function zoom(desireRatio, duration, easeType, zoomCompleteFunction) {
        var _this10 = this;

        var currentZoomRatio = this.zoomRatio;
        var diff = desireRatio - currentZoomRatio;
        var sign = diff / Math.abs(diff);
        var direction = sign === 1 ? true : false; // true/false = zoomin/zoomout

        this.zoomEase.Stop();
        this.zoomEase.duration = duration;
        this.zoomEase.type = easeType;
        var completeFunctionAble = typeof zoomCompleteFunction === 'function' ? true : false;

        var easingFunction = function easingFunction(e) {
          _this10.zoomRatio = currentZoomRatio + diff * e;

          _this10.dispatchEvent(new CustomEvent('zoom', {
            detail: {
              zoomin: direction,
              zoomRatio: _this10.zoomRatio
            }
          }));
        };

        if (duration !== 0) {
          this.zoomEase.Start(function (e) {
            easingFunction(e);
          }).End(function () {
            if (completeFunctionAble) zoomCompleteFunction();
          });
        } else {
          easingFunction(1);
          if (completeFunctionAble) zoomCompleteFunction();
        }
      }
    }, {
      key: "zoomIntoSelectedTile",
      value: function zoomIntoSelectedTile(indexOfSelectedTile, duration, zoomCompleteFunction) {
        var desireRatio = 1;
        this.tileShift(indexOfSelectedTile, duration);
        this.zoom(desireRatio, duration, this.easeTypeOfZoomIn, zoomCompleteFunction);
      }
    }, {
      key: "zoomOut",
      value: function zoomOut(duration, zoomCompleteFunction) {
        var desireRatio = 0;
        this.zoom(desireRatio, duration, this.easeTypeOfZoomOut, zoomCompleteFunction);
      }
    }, {
      key: "computeEdgeOfOffset",
      value: function computeEdgeOfOffset(tilesState) {
        var tableFlat = tilesState.tableFlat;
        var tileOfXIsMin = tableFlat.reduce(function (a, c) {
          return a.x <= c.x ? c : a;
        });
        var tileOfYIsMin = tableFlat.reduce(function (a, c) {
          return a.y <= c.y ? c : a;
        });
        var tileOfXIsMin_index = tableFlat.indexOf(tileOfXIsMin);
        var tileOfYIsMin_index = tableFlat.indexOf(tileOfYIsMin);
        var tileOfMaxEdge_offset = this.calculatOffsetOfSelectedTile(0, tilesState);
        var tileOfXIsMin_offset = this.calculatOffsetOfSelectedTile(tileOfXIsMin_index, tilesState);
        var tileOfYIsMin_offset = this.calculatOffsetOfSelectedTile(tileOfYIsMin_index, tilesState);
        return {
          minX: tileOfXIsMin_offset.x,
          maxX: tileOfMaxEdge_offset.x,
          minY: tileOfYIsMin_offset.y,
          maxY: tileOfMaxEdge_offset.y
        };
      }
    }, {
      key: "findTileFromOffset",
      value: function findTileFromOffset(offsetX, offsetY) {
        var _this11 = this;

        var tileLength = this.tilesState.tableFlat.length;

        var arrayOfOffsets = _toConsumableArray(Array(tileLength).keys()).map(function (index) {
          return _this11.calculatOffsetOfSelectedTile(index, _this11.tilesState);
        });

        var mostNearItemInOffsets = arrayOfOffsets.reduce(function (a, c) {
          var checkX = Math.abs(c.x - offsetX) < Math.abs(a.x - offsetX);
          var checkY = Math.abs(c.y - offsetY) < Math.abs(a.y - offsetY);
          return checkX || checkY ? c : a;
        });
        var mostNearTileIndex = arrayOfOffsets.indexOf(mostNearItemInOffsets);
        return mostNearTileIndex;
      }
    }, {
      key: "dragTile",
      value: function dragTile(amountOfMove) {
        var movedOffset = {
          x: this.offsetOfSelectedTileWhenDragStart.x + amountOfMove.x / this.row,
          y: this.offsetOfSelectedTileWhenDragStart.y + amountOfMove.y / this.row
        };
        this.indexOfSelectedTile = this.findTileFromOffset(movedOffset.x, movedOffset.y);
        this.offsetOfSelectedTile = movedOffset;
      }
    }, {
      key: "tileHovering",
      value: function tileHovering(event, amount, currentpagepos) {
        var indexOfselected = this.calculatSelectedIndexFromClickPos(currentpagepos.x, currentpagepos.y, this.tilesState);
        var prevSelectedData = this.tilesDataFilter('opacity', this.opacityOfSelected)[0];
        var indexOfPrevSelectedData = this.tilesState.tableFlat.indexOf(prevSelectedData);

        if (indexOfselected !== false) {
          this.canvas.style.cursor = 'pointer';
          this.tilesState.tableFlat[indexOfselected].opacity = this.opacityOfSelected;
        } else {
          this.canvas.style.cursor = '';
        }

        if (typeof prevSelectedData !== 'undefined' && indexOfselected !== indexOfPrevSelectedData) prevSelectedData.opacity = 1;
      }
    }, {
      key: "tileHoverEnd",
      value: function tileHoverEnd() {
        var prevSelectedData = this.tilesDataFilter('opacity', this.opacityOfSelected)[0];
        if (typeof prevSelectedData !== 'undefined') prevSelectedData.opacity = 1;
        this.canvas.style.cursor = '';
      }
    }, {
      key: "tilesDataFilter",
      value: function tilesDataFilter(key, value) {
        return this.tilesState.tableFlat.filter(function (tile) {
          return tile[key] === value;
        });
      }
    }, {
      key: "computeAspect",
      value: function computeAspect(w, h) {
        return [w, h].reduce(function (a, c, i, array) {
          var result = {};

          var gcd = function gcd(w, h) {
            if (!h) return w;else return gcd(h, w % h);
          };

          if (i === 0) result.w = c / gcd(array[1], array[0]);
          if (i === 1) result.h = c / gcd(array[1], array[0]);
          return Object.assign(a, result);
        }, {});
      }
    }, {
      key: "calculatOffsetByPixelToRatio",
      value: function calculatOffsetByPixelToRatio(offsetXByPixel, offsetYByPixel) {
        var edgeAmoutnOfTileMove = this.computeEdgeOfOffset(this.tilesState);
        var offsetXRatioFromLeft = map(offsetXByPixel, edgeAmoutnOfTileMove.minX, edgeAmoutnOfTileMove.maxX, 1, 0);
        var offsetYRatioFromTop = map(offsetYByPixel, edgeAmoutnOfTileMove.minY, edgeAmoutnOfTileMove.maxY, 1, 0);
        return {
          x: offsetXRatioFromLeft,
          y: offsetYRatioFromTop
        };
      }
    }, {
      key: "applyEndGideVisibrity",
      value: function applyEndGideVisibrity(desireVisibrityRatio) {
        // ratio 0 is hide. ratio 1 is show;
        var style = this.gideUi.style;
        style.opacity = desireVisibrityRatio;
        desireVisibrityRatio > 0 ? style.display = 'block' : style.display = 'none';
      }
    }, {
      key: "applyRatioToEndGideBar",
      value: function applyRatioToEndGideBar(offsetX, offsetY) {
        var offsetRatio = this.calculatOffsetByPixelToRatio(offsetX, offsetY);
        var barTopWidth = (1 - offsetRatio.y) * 100;
        var barBottomWidth = offsetRatio.y * 100;
        var barRightHeight = offsetRatio.x * 100;
        var barLeftHeight = (1 - offsetRatio.x) * 100;
        this.gidebarOfTop.style.width = "".concat(barTopWidth, "%");
        this.gidebarOfBottom.style.width = "".concat(barBottomWidth, "%");
        this.gidebarOfRight.style.height = "".concat(barRightHeight, "%");
        this.gidebarOfLeft.style.height = "".concat(barLeftHeight, "%");
      }
    }, {
      key: "offsetChangeReporter",
      value: function offsetChangeReporter(offsetX, offsetY) {
        this.applyRatioToEndGideBar(offsetX, offsetY);
        var offsetRatio = this.calculatOffsetByPixelToRatio(offsetX, offsetY);
        this.dispatchEvent(new CustomEvent('offsetChange', {
          detail: {
            offsetXFromCenter: offsetX,
            offsetYFromCenter: offsetY,
            offsetXRatioFromLeft: offsetRatio.x,
            offsetYRatioFromTop: offsetRatio.y
          }
        }));
      }
    }, {
      key: "indexOfSelectedChangeReporter",
      value: function indexOfSelectedChangeReporter(currentIndex) {
        this.dispatchEvent(new CustomEvent('selectedChange', {
          detail: {
            currentIndex: currentIndex
          }
        }));
      }
    }, {
      key: "loadImage",
      value: function loadImage(srcArray) {
        var _this12 = this;

        var isLoadPlaceholder = typeof srcArray === 'undefined' ? true : false;

        var PromiseOfLoadImage = _toConsumableArray(Array(this.useImageLength).keys()).map(function (index) {
          return new Promise(function (resolve, reject) {
            var img = new Image();
            img.addEventListener('load', function () {
              resolve(img);
            });
            img.src = isLoadPlaceholder ? placeholder : srcArray[index];
          });
        });

        return Promise.all(PromiseOfLoadImage).then(function (images) {
          return images.reduce(function (a, c) {
            return a.concat({
              img: c,
              width: _this12.useImageSize.w,
              height: _this12.useImageSize.h,
              aspect: _this12.computeAspect(_this12.useImageSize.w, _this12.useImageSize.h),
              opacity: 1
            });
          }, []);
        });
      }
    }, {
      key: "uiAble",
      set: function set(boolean) {
        this.canvasOverlay.style.display = boolean ? '' : 'none';
      }
    }, {
      key: "endGideBarWidth",
      set: function set(px) {
        this.gidebarOfTop.parentNode.parentNode.style.height = "".concat(px, "px");
        this.gidebarOfBottom.parentNode.parentNode.style.height = "".concat(px, "px");
        this.gidebarOfRight.parentNode.parentNode.style.width = "".concat(px, "px");
        this.gidebarOfLeft.parentNode.parentNode.style.width = "".concat(px, "px");
      }
    }, {
      key: "endGideBarColor",
      set: function set(cssColorStr) {
        this.gidebarOfTop.style.backgroundColor = cssColorStr;
        this.gidebarOfBottom.style.backgroundColor = cssColorStr;
        this.gidebarOfRight.style.backgroundColor = cssColorStr;
        this.gidebarOfLeft.style.backgroundColor = cssColorStr;
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['src', 'row', 'imagesize', 'imagelength', 'duration', 'zoomable', 'dragable', 'hoverable', 'iszoomedstart', 'firstselect', 'loadtiming', 'backgroundcolor', 'opacityofselected', 'endgideable', 'endgidewidth', 'endgidebarcolor'];
      }
    }]);

    return rikaaaimagetile;
  }(_wrapNativeSuper(HTMLElement));

  var ready = (function (fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
      setTimeout(function () {
        fn();
      }, 0);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  });

  ready(function () {
    customElements.define('rikaaa-image-tile', rikaaaimagetile);
  });

}());
