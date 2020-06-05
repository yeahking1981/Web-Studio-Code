/*!
* web Studio Code - 🎉 An Editor Used on the Browser Side.
* git+https://github.com/yelloxing/Web-Studio-Code.git
*
* author 心叶
*
* version 1.7.0
*
* build Fri May 08 2020
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Fri Jun 05 2020 15:51:52 GMT+0800 (GMT+08:00)
*/

"use strict";

function _toConsumableArray2(arr) { return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread2(); }

function _nonIterableSpread2() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray2(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles2(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

(function () {
  'use strict';

  var _dictionary2;

  var toString = Object.prototype.toString;
  /**
   * 获取一个值的类型字符串[object type]
   *
   * @private
   * @param {*} value 需要返回类型的值
   * @returns {string} 返回类型字符串
   */

  function getType(value) {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]';
    }

    return toString.call(value);
  }
  /**
   * 判断一个值是不是一个朴素的'对象'
   *
   * @private
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是朴素的'对象'返回true，否则返回false
   */


  function isPlainObject(value) {
    if (value === null || _typeof2(value) !== 'object' || getType(value) != '[object Object]') {
      return false;
    } // 如果原型为null


    if (Object.getPrototypeOf(value) === null) {
      return true;
    }

    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  }
  /**
   * 判断一个值是不是结点元素。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是结点元素返回true，否则返回false
   */


  function isElement(value) {
    return value !== null && _typeof2(value) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
  }
  /**
   * 判断一个值是不是String。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是String返回true，否则返回false
   */


  function isString(value) {
    var type = _typeof2(value);

    return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getType(value) === '[object String]';
  }
  /**
   * 判断一个值是不是Object。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Object返回true，否则返回false
   */


  function isObject(value) {
    var type = _typeof2(value);

    return value != null && (type === 'object' || type === 'function');
  }
  /**
   * 判断一个值是不是Function。
   *
   * @since V0.1.2
   * @public
   * @param {*} value 需要判断类型的值
   * @returns {boolean} 如果是Function返回true，否则返回false
   */


  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }

    var type = getType(value);
    return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object Proxy]';
  } // 计算文字长度


  function textWidth(text) {
    this.__helpDOM.innerText = text;
    return this.__helpDOM.offsetWidth;
  } // 计算最佳光标左边位置


  function bestLeftNum(x, lineNum) {
    if (arguments.length < 2) lineNum = lineNum || this.__lineNum;
    var text = this._contentArray[lineNum];
    if (x <= 40) return 0;
    if (x - 40 >= this.$$textWidth(text)) return text.length;
    var dist = x - 40,
        i = 1;

    for (; i < text.length; i++) {
      var tempDist = Math.abs(x - 40 - this.$$textWidth(text.substr(0, i)));
      if (tempDist > dist) break;
      dist = tempDist;
    }

    return i - 1;
  } // 计算光标对应的x,y值


  function calcCanvasXY(leftNum, lineNum) {
    return {
      x: this.$$textWidth(this._contentArray[lineNum].substr(0, leftNum)),
      y: lineNum * 21
    };
  } // 判断选区是否为空


  function selectIsNotBlank() {
    return this.__cursor1.lineNum != this.__cursor2.lineNum || this.__cursor1.leftNum != this.__cursor2.leftNum;
  }

  var xhtml = {
    // 阻止冒泡
    "stopPropagation": function stopPropagation(event) {
      event = event || window.event;

      if (event.stopPropagation) {
        //这是其他非IE浏览器
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
    // 阻止默认事件
    "preventDefault": function preventDefault(event) {
      event = event || window.event;

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    // 绑定事件
    "bind": function bind(el, eventType, callback) {
      if (window.attachEvent) {
        el.attachEvent("on" + eventType, callback); // 后绑定的先执行
      } else {
        el.addEventListener(eventType, callback, false); // 捕获
      }
    },
    // 触发事件
    "trigger": function trigger(dom, eventType) {
      var event; //创建event的对象实例。

      if (document.createEventObject) {
        // IE浏览器支持fireEvent方法
        event = document.createEventObject();
        dom.fireEvent('on' + eventType, event);
      } // 其他标准浏览器使用dispatchEvent方法
      else {
          event = document.createEvent('HTMLEvents'); // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为

          event.initEvent(eventType, true, false);
          dom.dispatchEvent(event);
        }
    },
    // 变成结点
    "toNode": function toNode(template) {
      var frame = document.createElement("div");
      frame.innerHTML = template;
      var childNodes = frame.childNodes;

      for (var i = 0; i < childNodes.length; i++) {
        if (isElement(childNodes[i])) return childNodes[i];
      }

      return null;
    },
    // 结点
    "appendTo": function appendTo(el, template) {
      var node = isElement(template) ? template : this.toNode(template);
      el.appendChild(node);
      return node;
    },
    // 修改样式
    "css": function css(el, styles) {
      for (var key in styles) {
        el.style[key] = styles[key];
      }
    },
    // 修改属性
    "attr": function attr(el, attrs) {
      for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    },
    // 获取鼠标相对特定元素左上角位置
    "position": function position(el, event) {
      event = event || window.event; // 返回元素的大小及其相对于视口的位置

      var bounding = el.getBoundingClientRect();
      if (!event || !event.clientX) throw new Error('Event is necessary!');
      var temp = {
        // 鼠标相对元素位置 = 鼠标相对窗口坐标 - 元素相对窗口坐标
        "x": event.clientX - bounding.left + el.scrollLeft,
        "y": event.clientY - bounding.top + el.scrollTop
      };
      return temp;
    },
    // 复制到剪切板
    "copy": function copy(text) {
      var el = this.appendTo(document.body, '<textarea>' + text + '</textarea>'); // 执行复制

      el.select();

      try {
        var result = window.document.execCommand("copy", false, null);

        if (result) {// console.log('已经复制到剪切板！');
        } else {// console.log('复制到剪切板失败！');
          }
      } catch (e) {
        console.error(e); // console.log('复制到剪切板失败！');
      }

      document.body.removeChild(el);
    }
  }; // 初始化结点

  function initDom() {
    var _this = this;

    this._el.innerHTML = "";
    xhtml.css(this._el, {
      "font-size": "12px",
      position: "relative",
      cursor: "text",
      "font-family": this._fontFamily,
      "background": this._colorBackground,
      overflow: "auto"
    });
    xhtml.bind(this._el, 'click', function () {
      _this.__focusDOM.focus();
    }); // 辅助标签

    this.__helpDOM = xhtml.appendTo(this._el, "<span></span>");
    xhtml.css(this.__helpDOM, {
      position: "absolute",
      "z-index": "-1",
      "white-space": "pre",
      "top": 0,
      "left": 0,
      "font-weight": this._fontWeight
    }); // 光标

    this.__focusDOM = xhtml.appendTo(this._el, "<textarea></textarea>");
    xhtml.css(this.__focusDOM, {
      position: "absolute",
      width: "6px",
      "margin-top": "3px",
      height: "15px",
      "line-height": "15px",
      resize: "none",
      overflow: "hidden",
      padding: "0",
      outline: "none",
      border: "none",
      background: "rgba(0,0,0,0)",
      color: this._colorCursor
    });
    xhtml.attr(this.__focusDOM, {
      wrap: "off",
      autocorrect: "off",
      autocapitalize: "off",
      spellcheck: "false"
    }); // 显示区域

    this.__showDOM = xhtml.appendTo(this._el, "<div></div>");
    xhtml.css(this.__showDOM, {
      padding: "10px 0"
    }); // 选中区域

    this.__selectCanvas = xhtml.appendTo(this._el, "<canvas></canvas>");
    xhtml.css(this.__selectCanvas, {
      position: "absolute",
      left: "40px",
      top: "10px"
    });
    this.$$updateCanvasSize(1, 1);
  } // 初始化视图


  function initView() {
    // 初始化定位光标位置
    xhtml.css(this.__focusDOM, {
      left: 40 + this.$$textWidth(this._contentArray[this.__lineNum]) + "px",
      top: 10 + this.__lineNum * 21 + "px"
    });

    this.__focusDOM.focus();
  } // 更新编辑器内容视图


  function updateView() {
    var _this2 = this;

    var template = "";

    this.__formatData.forEach(function (line, index) {
      var bgcolor = "";

      if (index == _this2.__lineNum) {
        bgcolor = "background-color:" + _this2._colorEdit;
      }

      template += "<div style='min-width: fit-content;white-space: nowrap;line-height:21px;height:21px;" + bgcolor + "'>";
      template += "<em style='color:" + _this2._colorNumber + ";user-select: none;display:inline-block;font-style:normal;width:35px;text-align:right;margin-right:5px;'>" + (index + 1) + "</em>";
      line.forEach(function (text) {
        var contentText = text.content; // 提前对特殊字符进行处理

        contentText = contentText.replace(/\&/g, "&amp;");
        /*[&]*/

        contentText = contentText.replace(/</g, "&lt;");
        contentText = contentText.replace(/>/g, "&gt;");
        /*[<,>]*/

        template += "<span style='user-select: none;font-weight:" + _this2._fontWeight + ";white-space: pre;color:" + text.color + "'>" + contentText + "</span>";
      });
      template += "</div>";
    });

    this.__showDOM.innerHTML = template;
  } // 更新编辑器选中视图


  function updateSelectView() {
    var _this3 = this;

    var ctx = this.__selectCanvas.getContext('2d');

    ctx.fillStyle = this._colorSelect;
    ctx.clearRect(0, 0, this.__selectCanvas.scrollWidth, this.__selectCanvas.scrollHeight); // 绘制二个区间

    var drawerSelect = function drawerSelect(beginLeftNum, endLeftNum, lineNum) {
      var xy1 = _this3.$$calcCanvasXY(beginLeftNum, lineNum);

      var xy2 = _this3.$$calcCanvasXY(endLeftNum, lineNum);

      ctx.fillRect(xy1.x, xy1.y, xy2.x - xy1.x, 21);
    }; // 如果选中区域为空，不用绘制


    if (this.__cursor1.lineNum == this.__cursor2.lineNum && this.__cursor1.leftNum == this.__cursor2.leftNum) return;
    ctx.beginPath(); // 如果在一行

    if (this.__cursor1.lineNum == this.__cursor2.lineNum) {
      drawerSelect(this.__cursor1.leftNum, this.__cursor2.leftNum, this.__cursor1.lineNum);
    } // 如果选中的多于一行
    else {
        var beginCursor, endCursor;

        if (this.__cursor1.lineNum < this.__cursor2.lineNum) {
          beginCursor = this.__cursor1;
          endCursor = this.__cursor2;
        } else {
          beginCursor = this.__cursor2;
          endCursor = this.__cursor1;
        } // 绘制开始的结尾


        drawerSelect(beginCursor.leftNum, this._contentArray[beginCursor.lineNum].length, beginCursor.lineNum); // 绘制结束的开头

        drawerSelect(0, endCursor.leftNum, endCursor.lineNum); // 绘制两行之间

        for (var lineNum = beginCursor.lineNum + 1; lineNum < endCursor.lineNum; lineNum++) {
          drawerSelect(0, this._contentArray[lineNum].length, lineNum);
        }
      }
  } // 输入的时候更新光标位置


  function updateCursorPosition() {
    xhtml.css(this.__focusDOM, {
      top: this.__lineNum * 21 + 10 + "px",
      left: 40 + this.$$textWidth(this._contentArray[this.__lineNum].substring(0, this.__leftNum)) + "px"
    });
  } // 更新画布尺寸


  function updateCanvasSize(width, height) {
    if (arguments.length < 2) {
      width = this._el.scrollWidth - 40;
      height = this._el.scrollHeight - 10;
    }

    xhtml.css(this.__selectCanvas, {
      width: width + "px",
      height: height + "px"
    });
    xhtml.attr(this.__selectCanvas, {
      width: width,
      height: height
    });
  } // 取消选区


  function cancelSelect() {
    this.$$updateCanvasSize(1, 1);
    this.__cursor1 = {
      leftNum: 0,
      lineNum: 0
    };
    this.__cursor2 = {
      leftNum: 0,
      lineNum: 0
    };
  } // 删除选区


  function deleteSelect() {
    // 假定cursor2是结束光标
    var beginCursor = this.__cursor2,
        endCursor = this.__cursor1; // 根据行号来校对

    if (this.__cursor1.lineNum < this.__cursor2.lineNum) {
      beginCursor = this.__cursor1;
      endCursor = this.__cursor2;
    } else if (this.__cursor1.lineNum == this.__cursor2.lineNum) {
      // 根据列号来校对
      if (this.__cursor1.leftNum < this.__cursor2.leftNum) {
        beginCursor = this.__cursor1;
        endCursor = this.__cursor2;
      }
    }

    var newLineText = this._contentArray[beginCursor.lineNum].substr(0, beginCursor.leftNum) + this._contentArray[endCursor.lineNum].substr(endCursor.leftNum);

    this._contentArray.splice(beginCursor.lineNum, endCursor.lineNum - beginCursor.lineNum + 1, newLineText); // 校对光标和选区


    this.__leftNum = this.__cursor1.leftNum = this.__cursor2.leftNum = beginCursor.leftNum;
    this.__lineNum = this.__cursor1.lineNum = this.__cursor2.lineNum = beginCursor.lineNum;
    this.$$cancelSelect();
  } // 字典表


  var dictionary = (_dictionary2 = {
    // 数字
    48: [0, ')'],
    49: [1, '!'],
    50: [2, '@'],
    51: [3, '#'],
    52: [4, '$'],
    53: [5, '%'],
    54: [6, '^'],
    55: [7, '&'],
    56: [8, '*'],
    57: [9, '('],
    96: [0, 0],
    97: 1,
    98: 2,
    99: 3,
    100: 4,
    101: 5,
    102: 6,
    103: 7,
    104: 8,
    105: 9,
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    // 字母
    65: ["a", "A"],
    66: ["b", "B"],
    67: ["c", "C"],
    68: ["d", "D"],
    69: ["e", "E"],
    70: ["f", "F"],
    71: ["g", "G"],
    72: ["h", "H"],
    73: ["i", "I"],
    74: ["j", "J"],
    75: ["k", "K"],
    76: ["l", "L"],
    77: ["m", "M"],
    78: ["n", "N"],
    79: ["o", "O"],
    80: ["p", "P"],
    81: ["q", "Q"],
    82: ["r", "R"],
    83: ["s", "S"],
    84: ["t", "T"],
    85: ["u", "U"],
    86: ["v", "V"],
    87: ["w", "W"],
    88: ["x", "X"],
    89: ["y", "Y"],
    90: ["z", "Z"],
    // 方向
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    33: "page up",
    34: "page down",
    35: "end",
    36: "home",
    // 控制键
    16: "shift",
    17: "ctrl",
    18: "alt",
    91: "command",
    92: "command",
    93: "command",
    9: "tab",
    20: "caps lock",
    32: "spacebar",
    8: "backspace",
    13: "enter",
    27: "esc",
    46: "delete",
    45: "insert",
    144: "number lock",
    145: "scroll lock",
    12: "clear"
  }, _defineProperty2(_dictionary2, "45", "insert"), _defineProperty2(_dictionary2, 19, "pause"), _defineProperty2(_dictionary2, 112, "f1"), _defineProperty2(_dictionary2, 113, "f2"), _defineProperty2(_dictionary2, 114, "f3"), _defineProperty2(_dictionary2, 115, "f4"), _defineProperty2(_dictionary2, 116, "f5"), _defineProperty2(_dictionary2, 117, "f6"), _defineProperty2(_dictionary2, 118, "f7"), _defineProperty2(_dictionary2, 119, "f8"), _defineProperty2(_dictionary2, 120, "f9"), _defineProperty2(_dictionary2, 121, "f10"), _defineProperty2(_dictionary2, 122, "f11"), _defineProperty2(_dictionary2, 123, "f12"), _defineProperty2(_dictionary2, 189, ["-", "_"]), _defineProperty2(_dictionary2, 187, ["=", "+"]), _defineProperty2(_dictionary2, 219, ["[", "{"]), _defineProperty2(_dictionary2, 221, ["]", "}"]), _defineProperty2(_dictionary2, 220, ["\\", "|"]), _defineProperty2(_dictionary2, 186, [";", ":"]), _defineProperty2(_dictionary2, 222, ["'", '"']), _defineProperty2(_dictionary2, 188, [",", "<"]), _defineProperty2(_dictionary2, 190, [".", ">"]), _defineProperty2(_dictionary2, 191, ["/", "?"]), _defineProperty2(_dictionary2, 192, ["`", "~"]), _dictionary2); // 非独立键字典

  var help_key = ["shift", "ctrl", "alt"];
  /**
   * 键盘按键
   * 返回键盘此时按下的键的组合结果
   * @since V0.2.5
   * @public
   */

  function keyString(event) {
    event = event || window.event;
    var keycode = event.keyCode || event.which;
    var key = dictionary[keycode] || keycode;
    if (!key) return;
    if (key.constructor !== Array) key = [key, key];
    var shift = event.shiftKey ? "shift+" : "",
        alt = event.altKey ? "alt+" : "",
        ctrl = event.ctrlKey ? "ctrl+" : "";
    var resultKey = "",
        preKey = ctrl + shift + alt;

    if (help_key.indexOf(key[0]) >= 0) {
      key[0] = key[1] = "";
    } // 判断是否按下了caps lock


    var lockPress = event.code == "Key" + event.key && !shift; // 只有字母（且没有按下功能Ctrl、shift或alt）区分大小写

    resultKey = preKey + (preKey == '' && lockPress ? key[1] : key[0]);

    if (key[0] == "") {
      resultKey = resultKey.replace(/\+$/, '');
    }

    return resultKey;
  } // 绑定键盘和鼠标等交互事件处理


  function bindEvent() {
    var _this4 = this;

    var mouseDown = false; // 辅助计算选择光标位置

    var calcCursor = function calcCursor(event) {
      var position = xhtml.position(_this4._el, event);
      var topIndex = Math.round((position.y - 20.5) / 21);
      if (topIndex < 0) topIndex = 0;
      if (topIndex >= _this4._contentArray.length) topIndex = _this4._contentArray.length - 1;
      return {
        leftNum: _this4.$$bestLeftNum(position.x, topIndex),
        lineNum: topIndex
      };
    }; // 获取光标之间的内容


    var calcTwoCursor = function calcTwoCursor() {
      // 假定cursor2是结束光标
      var beginCursor = _this4.__cursor2,
          endCursor = _this4.__cursor1; // 根据行号来校对

      if (_this4.__cursor1.lineNum < _this4.__cursor2.lineNum) {
        beginCursor = _this4.__cursor1;
        endCursor = _this4.__cursor2;
      } else if (_this4.__cursor1.lineNum == _this4.__cursor2.lineNum) {
        // 根据列号来校对
        if (_this4.__cursor1.leftNum < _this4.__cursor2.leftNum) {
          beginCursor = _this4.__cursor1;
          endCursor = _this4.__cursor2;
        }

        return _this4._contentArray[beginCursor.lineNum].substring(beginCursor.leftNum, endCursor.leftNum);
      } // 余下的一定是多行


      var resultData = "";
      resultData += _this4._contentArray[beginCursor.lineNum].substr(beginCursor.leftNum) + "\n";

      for (var lineNum = beginCursor.lineNum + 1; lineNum < endCursor.lineNum; lineNum++) {
        resultData += _this4._contentArray[lineNum] + "\n";
      }

      resultData += _this4._contentArray[endCursor.lineNum].substr(0, endCursor.leftNum);
      return resultData;
    }; // 鼠标按下的时候，记录开始光标位置并标记鼠标按下动作


    xhtml.bind(document, 'mousedown', function (event) {
      mouseDown = true;
      _this4.__cursor2 = _this4.__cursor1 = calcCursor(event);

      _this4.$$updateCanvasSize(); // 绘制选中效果


      _this4.$$updateSelectView();
    }); // 移动的时候不停的同步结束光标位置

    xhtml.bind(document, 'mousemove', function (event) {
      if (!mouseDown) return;
      _this4.__cursor2 = calcCursor(event); // 绘制选中效果

      _this4.$$updateSelectView();
    }); // 鼠标分开或移出的时候，标记鼠标放开

    xhtml.bind(document, 'mouseup', function () {
      return mouseDown = false;
    });
    xhtml.bind(document, 'mouseout', function () {
      return mouseDown = false;
    }); // 点击编辑界面

    xhtml.bind(this._el, 'click', function (event) {
      var position = xhtml.position(_this4._el, event);
      var topIndex = Math.round((position.y - 20.5) / 21); // 如果超过了内容区域

      if (topIndex < 0 || topIndex >= _this4._contentArray.length) return;
      _this4.__lineNum = topIndex;
      _this4.__leftNum = _this4.$$bestLeftNum(position.x);

      _this4.$$updateCursorPosition();

      _this4.$$updateView();
    });

    var update = function update(text) {
      // 获取输入内容
      text = text || _this4.__focusDOM.value;
      text = _this4.$$filterText(text);
      _this4.__focusDOM.value = ""; // 如果有选区，先删除选区

      if (_this4.$$selectIsNotBlank()) _this4.$$deleteSelect(); // 如果输入的是回车，切割文本

      if (/^\n$/.test(text)) {
        if (_this4.__leftNum >= _this4._contentArray[_this4.__lineNum].length) {
          _this4._contentArray.splice(_this4.__lineNum + 1, 0, "");
        } else {
          _this4._contentArray.splice(_this4.__lineNum + 1, 0, _this4._contentArray[_this4.__lineNum].substring(_this4.__leftNum));

          _this4._contentArray[_this4.__lineNum] = _this4._contentArray[_this4.__lineNum].substring(0, _this4.__leftNum);
        }

        _this4.__lineNum += 1;
        _this4.__leftNum = 0;
      } // 否则就是一堆文本（包括复制来的）
      else {
          var textArray = text.split(/\n/); // 如果只有一行文本(分开是为了加速)

          if (textArray.length <= 1) {
            _this4._contentArray[_this4.__lineNum] = _this4._contentArray[_this4.__lineNum].substring(0, _this4.__leftNum) + text + _this4._contentArray[_this4.__lineNum].substring(_this4.__leftNum);
            _this4.__leftNum += text.length;
          } // 如果是复制的多行文本
          else {
              var _this4$_contentArray;

              // 需要切割的行两边文本
              var leftText = _this4._contentArray[_this4.__lineNum].substring(0, _this4.__leftNum);

              var rightText = _this4._contentArray[_this4.__lineNum].substring(_this4.__leftNum); // 旧行文本拼接进来


              textArray[0] = leftText + textArray[0];
              textArray[textArray.length - 1] += rightText; // 新内容记录下来

              (_this4$_contentArray = _this4._contentArray).splice.apply(_this4$_contentArray, [_this4.__lineNum, 1].concat(_toConsumableArray2(textArray)));

              _this4.__lineNum += textArray.length - 1;
              _this4.__leftNum = textArray[textArray.length - 1].length - rightText.length;
            }
        } // 着色并更新视图


      _this4.__formatData = _this4.$shader(_this4._contentArray.join('\n'), _this4._langColors);

      _this4.$$updateCursorPosition();

      _this4.$$updateView();
    }; // 中文输入开始


    xhtml.bind(this.__focusDOM, 'compositionstart', function () {
      _this4.__needUpdate = false;
      _this4.__focusDOM.style.color = "rgba(0,0,0,0)";
      _this4.__focusDOM.style.borderLeft = '1px solid ' + _this4._colorCursor;
    }); // 中文输入结束

    xhtml.bind(this.__focusDOM, 'compositionend', function () {
      _this4.__needUpdate = true;
      _this4.__focusDOM.style.color = _this4._colorCursor;
      _this4.__focusDOM.style.borderLeft = "none";
      update();
    }); // 输入

    xhtml.bind(this.__focusDOM, 'input', function () {
      // 如果是中文输入开始，不应该更新
      if (_this4.__needUpdate) update();
    }); // 处理键盘控制

    xhtml.bind(this._el, 'keydown', function (event) {
      switch (keyString(event)) {
        // 全选
        case "ctrl+a":
          {
            // 修改选区范围
            _this4.__cursor1 = {
              leftNum: 0,
              lineNum: 0
            };
            _this4.__cursor2 = {
              lineNum: _this4._contentArray.length - 1,
              leftNum: _this4._contentArray[_this4._contentArray.length - 1].length
            }; // 绘制选中效果

            _this4.$$updateSelectView();

            break;
          }
        // 复制

        case "ctrl+c":
          {
            if (_this4.$$selectIsNotBlank()) {
              xhtml.copy(calcTwoCursor());

              _this4.__focusDOM.focus();
            }

            break;
          }
        // 剪切

        case "ctrl+x":
          {
            if (_this4.$$selectIsNotBlank()) {
              xhtml.copy(calcTwoCursor());

              _this4.__focusDOM.focus();

              _this4.$$deleteSelect(); // 由于内容改变，需要重新调用着色


              _this4.__formatData = _this4.$shader(_this4._contentArray.join('\n'), _this4._langColors); // 更新视图

              _this4.$$updateCursorPosition();

              _this4.$$updateView();

              _this4.$$cancelSelect();
            }

            break;
          }
        // 多空格输入或多行移位

        case "tab":
          {
            // tab用来控制输入多个空格，默认事件需要禁止
            xhtml.stopPropagation(event);
            xhtml.preventDefault(event); // 计算空格

            var blanks = "";

            for (var i = 0; i < _this4._tabSpace; i++) {
              blanks += " ";
            } // 如果有选区，特殊处理


            if (_this4.$$selectIsNotBlank()) {
              var beginLineNum = _this4.__cursor1.lineNum,
                  endLineNum = _this4.__cursor2.lineNum;

              if (beginLineNum > endLineNum) {
                beginLineNum = _this4.__cursor2.lineNum;
                endLineNum = _this4.__cursor1.lineNum;
              } // 在开头追究tab


              for (var lineNum = beginLineNum; lineNum <= endLineNum; lineNum++) {
                _this4._contentArray[lineNum] = blanks + _this4._contentArray[lineNum];
              } // 校对选择区域


              _this4.__cursor1.leftNum += _this4._tabSpace;
              _this4.__cursor2.leftNum += _this4._tabSpace; // 校对光标

              _this4.__leftNum += _this4._tabSpace;
              _this4.__formatData = _this4.$shader(_this4._contentArray.join('\n'), _this4._langColors);

              _this4.$$updateCursorPosition();

              _this4.$$updateView();

              _this4.$$updateCanvasSize();

              _this4.$$updateSelectView();
            } else {
              update(blanks);
            }

            break;
          }
        // 光标向上

        case "up":
          {
            // 如果是第一行不需要任何处理
            if (_this4.__lineNum <= 0) return; // 向上一行

            _this4.__lineNum -= 1;
            _this4.__leftNum = _this4.$$bestLeftNum(_this4.$$textWidth(_this4._contentArray[_this4.__lineNum + 1].substr(0, _this4.__leftNum)) + 40);

            _this4.$$updateCursorPosition();

            _this4.$$updateView();

            _this4.$$cancelSelect();

            _this4._el.scrollTop -= 21;
            break;
          }
        // 光标向下

        case "down":
          {
            if (_this4.__lineNum >= _this4._contentArray.length - 1) return; // 向下一行

            _this4.__lineNum += 1;
            _this4.__leftNum = _this4.$$bestLeftNum(_this4.$$textWidth(_this4._contentArray[_this4.__lineNum - 1].substr(0, _this4.__leftNum)) + 40);

            _this4.$$updateCursorPosition();

            _this4.$$updateView();

            _this4.$$cancelSelect();

            _this4._el.scrollTop += 21;
            break;
          }
        // 光标向左

        case "left":
          {
            if (_this4.__leftNum <= 0) {
              if (_this4.__lineNum <= 0) return;
              _this4.__lineNum -= 1;
              _this4.__leftNum = _this4._contentArray[_this4.__lineNum].length;
            } else {
              _this4.__leftNum -= 1;
            }

            _this4.$$updateCursorPosition();

            _this4.$$cancelSelect();

            break;
          }
        // 光标向右

        case "right":
          {
            if (_this4.__leftNum >= _this4._contentArray[_this4.__lineNum].length) {
              if (_this4.__lineNum >= _this4._contentArray.length - 1) return;
              _this4.__lineNum += 1;
              _this4.__leftNum = 0;
            } else {
              _this4.__leftNum += 1;
            }

            _this4.$$updateCursorPosition();

            _this4.$$cancelSelect();

            break;
          }
        // 删除

        case "backspace":
          {
            // 如果有选区
            if (_this4.$$selectIsNotBlank()) {
              // 删除选区
              _this4.$$deleteSelect();
            } // 无选区的常规操作
            else {
                if (_this4.__leftNum <= 0) {
                  if (_this4.__lineNum <= 0) return;
                  _this4.__lineNum -= 1;
                  _this4.__leftNum = _this4._contentArray[_this4.__lineNum].length; // 一行的开头应该删除本行（合并到前一行）

                  _this4._contentArray[_this4.__lineNum] += _this4._contentArray[_this4.__lineNum + 1];

                  _this4._contentArray.splice(_this4.__lineNum + 1, 1);
                } else {
                  _this4.__leftNum -= 1;
                  _this4._contentArray[_this4.__lineNum] = _this4._contentArray[_this4.__lineNum].substring(0, _this4.__leftNum) + _this4._contentArray[_this4.__lineNum].substring(_this4.__leftNum + 1);
                }
              } // 由于内容改变，需要重新调用着色


            _this4.__formatData = _this4.$shader(_this4._contentArray.join('\n'), _this4._langColors); // 更新视图

            _this4.$$updateCursorPosition();

            _this4.$$updateView();

            _this4.$$cancelSelect();

            break;
          }
      }
    });
  } // 外来文本统一过滤处理


  function filterText(oralStr) {
    // 把tab统一变成空格
    var tab = "";

    for (var i = 0; i < this._tabSpace; i++) {
      tab += " ";
    }

    return oralStr.replace(/\t/g, tab);
  } // 合并内容


  function toShaderReult(words) {
    var resultData = [[]],
        lineNum = 0;
    words.forEach(function (word) {
      var codeArray = word.content.split(/\n/);
      resultData[lineNum].push({
        color: word.color,
        content: codeArray[0]
      });

      for (var index = 1; index < codeArray.length; index++) {
        lineNum += 1;
        resultData.push([]);
        resultData[lineNum].push({
          color: word.color,
          content: codeArray[index]
        });
      }
    });
    return resultData;
  } // 获取前置空格


  function getTabStringFactory(tabNumber) {
    var singleTab = "";

    for (var i = 0; i < tabNumber; i++) {
      singleTab += " ";
    }

    return function getTabString(num) {
      var temp = '';

      for (var j = 0; j < num; j++) {
        temp += singleTab;
      }

      return temp;
    };
  }

  function css_shader(textString, colors, notToResult) {
    var shaderArray = []; // 当前面对的

    var i = 0; // 获取往后n个值

    var nextNValue = function nextNValue(n) {
      return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = ""; // 1:选择器 tag
    // 2:属性名 attr
    // 3:属性值 string

    var state = "tag"; // 初始化模板，开始文本捕获

    var initTemplate = function initTemplate() {
      if (template != "") {
        shaderArray.push({
          color: colors[state],
          content: template
        });
      }

      template = "";
    };

    while (true) {
      /* 1.注释 */
      if (nextNValue(2) == '/*') {
        initTemplate();

        while (nextNValue(2) !== '*/' && i < textString.length) {
          template += textString[i++];
        }

        shaderArray.push({
          color: colors.annotation,
          content: template + nextNValue(2)
        });
        i += 2;
        template = "";
      }
      /* 2.字符串 */
      else if (["'", '"'].indexOf(nextNValue(1)) > -1) {
          var strBorder = nextNValue(1);
          initTemplate();

          do {
            template += textString[i++];
          } while (nextNValue(1) != strBorder && i < textString.length); // 因为可能是没有字符导致的结束


          if (nextNValue(1) != strBorder) {
            strBorder = "";
          } else {
            i += 1;
          }

          shaderArray.push({
            color: colors.string,
            content: template + strBorder
          });
          template = "";
        }
        /* 3.边界 */
        else if ([":", '{', '}', ";"].indexOf(nextNValue(1)) > -1) {
            initTemplate();
            shaderArray.push({
              color: colors.border,
              content: nextNValue(1)
            });
            template = "";

            if (nextNValue(1) == '{' || nextNValue(1) == ';') {
              state = 'attr';
            } else if (nextNValue(1) == '}') {
              state = 'tag';
            } else {
              state = 'string';
            }

            i += 1;
          }
          /* 追加字符 */
          else {
              if (i >= textString.length) {
                initTemplate();
                break;
              } else {
                template += textString[i++];
              }
            }
    }

    return notToResult ? shaderArray : toShaderReult(shaderArray);
  } // 关键字


  var keyWords = ["abstract", "arguments", "boolean", "break", "byte", "case", "catch", "char", "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"];

  function javascript_shader(textString, colors, notToResult) {
    var shaderArray = []; // 当前面对的

    var i = 0; // 获取往后n个值

    var nextNValue = function nextNValue(n) {
      return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = ""; // 初始化模板，开始文本捕获

    var initTemplate = function initTemplate() {
      if (template != "") {
        // 考虑开始的(s
        if (template[0] == '(') {
          shaderArray.push({
            color: colors.border,
            content: "("
          });
          template = template.substr(1);
        }

        shaderArray.push({
          color: colors.text,
          content: template
        });
      }

      template = "";
    };

    while (true) {
      /* 1.注释1 */
      if (nextNValue(2) == '/*') {
        initTemplate();

        while (nextNValue(2) !== '*/' && i < textString.length) {
          template += textString[i++];
        }

        shaderArray.push({
          color: colors.annotation,
          content: template + nextNValue(2)
        });
        i += 2;
        template = "";
      }
      /* 2.注释2 */
      else if (nextNValue(2) == '//') {
          initTemplate();

          while (nextNValue(1) !== '\n' && i < textString.length) {
            template += textString[i++];
          }

          shaderArray.push({
            color: colors.annotation,
            content: template
          });
          template = "";
        }
        /* 3.字符串 */
        else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {
            var strBorder = nextNValue(1);
            initTemplate();

            do {
              template += textString[i++];
            } while (nextNValue(1) != strBorder && i < textString.length); // 因为可能是没有字符导致的结束


            if (nextNValue(1) != strBorder) {
              strBorder = "";
            } else {
              i += 1;
            }

            shaderArray.push({
              color: colors.string,
              content: template + strBorder
            });
            template = "";
          }
          /* 4.函数定义 */
          else if (nextNValue(1) == '(' && (template[0] == ' ' || i - template.length - 1 >= 0 && textString[i - template.length - 1] == " ")) {
              shaderArray.push({
                color: colors.tag,
                content: template
              });
              i += 1;
              template = "(";
            }
            /* 5.方法调用 */
            else if (nextNValue(1) == '(') {
                shaderArray.push({
                  color: colors.attr,
                  content: template
                });
                i += 1;
                template = "(";
              }
              /* 6.边界 */
              else if ([";", '{', '}', '(', ')', '.', '\n', '=', '+', '>', '<', '[', ']', '-', '*', '/', '^', '*', '!'].indexOf(nextNValue(1)) > -1) {
                  initTemplate();
                  shaderArray.push({
                    color: colors.border,
                    content: nextNValue(1)
                  });
                  template = "";
                  i += 1;
                }
                /* 7.关键字 */
                else if (nextNValue(1) == ' ' && keyWords.indexOf(template.trim()) > -1) {
                    shaderArray.push({
                      color: colors.key,
                      content: template + " "
                    });
                    template = "";
                    i += 1;
                  }
                  /* 追加字符 */
                  else {
                      if (i >= textString.length) {
                        initTemplate();
                        break;
                      } else {
                        template += textString[i++];
                      }
                    }
    }

    return notToResult ? shaderArray : toShaderReult(shaderArray);
  }

  function html_shader(textString, colors) {
    var shaderArray = []; // 当前面对的

    var i = 0; // 获取往后n个值

    var nextNValue = function nextNValue(n) {
      return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = ""; // 初始化模板，开始文本捕获

    var initTemplate = function initTemplate() {
      if (template != "") {
        shaderArray.push({
          color: colors.text,
          content: template
        });
      }

      template = "";
    }; // 匹配属性值模板


    var getAttrValueTemplate = function getAttrValueTemplate() {
      var endStr = " "; // 寻找属性值边界

      if (nextNValue(1) == '"') endStr = '"';
      if (nextNValue(1) == "'") endStr = "'"; // 到达边界前一直寻找下一个

      do {
        template += textString[i++];
      } while (nextNValue(1) != endStr && i < textString.length); // 如果是匹配成功而不是匹配到末尾


      if (endStr != " " && i < textString.length) {
        template += endStr;
        i += 1;
      }

      shaderArray.push({
        color: colors.string,
        content: template
      });
      template = "";
    };

    while (true) {
      /* 1.注释 */
      if (nextNValue(4) == '<!--') {
        initTemplate();

        while (nextNValue(3) !== '-->' && i < textString.length) {
          template += textString[i++];
        }

        shaderArray.push({
          color: colors.annotation,
          content: template + nextNValue(3)
        });
        i += 3;
        template = "";
      }
      /* 2.</ */
      else if (nextNValue(2) == '</') {
          initTemplate();
          shaderArray.push({
            color: colors.border,
            content: "</"
          });
          i += 2;

          while (nextNValue(1) !== '>' && i < textString.length) {
            template += textString[i++];
          }

          if (template != "") {
            shaderArray.push({
              color: colors.tag,
              content: template
            });
            template = "";

            if (i < textString.length) {
              shaderArray.push({
                color: colors.border,
                content: ">"
              });
              i += 1;
            }
          }
        }
        /* 3.< */
        else if (nextNValue(1) == '<' && nextNValue(2) != '< ') {
            var specialTag = "";
            initTemplate();
            shaderArray.push({
              color: colors.border,
              content: "<"
            });
            i += 1; // 寻找标签名称

            while (nextNValue(1) != '>' && nextNValue(1) != ' ' && i < textString.length) {
              template += textString[i++];
            }

            if (template != '') {
              // 针对style和script这样特殊的标签，内部需要调用对应的着色器着色
              if (template == "style" || template == 'script') {
                specialTag = "</" + template + ">";
              }

              shaderArray.push({
                color: colors.tag,
                content: template
              });
              template = '';

              if (i < textString.length) {
                // 寻找标签属性
                while (i < textString.length) {
                  // 遇到这个表示标签结束了
                  // 也就意味着标签匹配结束
                  if (nextNValue(1) == ">") {
                    initTemplate();
                    shaderArray.push({
                      color: colors.border,
                      content: ">"
                    });
                    i += 1;
                    break;
                  } // 如果是空格，表示是属性之间，接着查看下一个即可
                  else if (nextNValue(1) != ' ') {
                      initTemplate(); // 匹配属性名称

                      if (nextNValue(1) != '"' && nextNValue(1) != "'") {
                        // 如果不是=或>和空格就继续
                        while (nextNValue(1) != "=" && nextNValue(1) != '>' && i < textString.length && nextNValue(1) != " ") {
                          template += textString[i++];
                        }

                        if (template != "") {
                          shaderArray.push({
                            color: colors.attr,
                            content: template
                          });
                          template = ""; // 如果下一个是=，就接着找属性值

                          if (nextNValue(1) == '=') {
                            shaderArray.push({
                              color: colors.text,
                              content: "="
                            });
                            i += 1;

                            if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {
                              // 寻找属性值
                              getAttrValueTemplate();
                            }
                          }
                        } else {
                          template += textString[i++];
                        }
                      } else if (nextNValue(1) == '=') {
                        shaderArray.push({
                          color: colors.text,
                          content: "="
                        });
                        i += 1;
                      } else {
                        if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {
                          getAttrValueTemplate();
                        }
                      }
                    } else {
                      template += textString[i++];
                    }
                }
              }
            }

            if (specialTag != "") {
              var oldI = i,
                  oldTemplate = template;

              while (nextNValue(specialTag.length) != specialTag && i < textString.length) {
                template += textString[i++];
              }

              if (i < textString.length) {
                var innerShaderArray = {
                  "</style>": css_shader,
                  "</script>": javascript_shader
                }[specialTag](template, colors, true);
                innerShaderArray.forEach(function (innerShader) {
                  shaderArray.push(innerShader);
                });
                template = "";
              } else {
                template = oldTemplate;
                i = oldI;
              }
            }
          }
          /* 追加字符 */
          else {
              if (i >= textString.length) {
                initTemplate();
                break;
              } else {
                template += textString[i++];
              }
            }
    }

    return toShaderReult(shaderArray);
  }

  var _RegExp = {
    // 空白字符:http://www.w3.org/TR/css3-selectors/#whitespace
    blankReg: new RegExp("[\\x20\\t\\r\\n\\f]"),
    blanksReg: /^[\x20\t\r\n\f]{0,}$/
  };

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var core_min = createCommonjsModule(function (module) {
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
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

    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    function _iterableToArray(iter) {
      if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }
    }

    function _typeof(obj) {
      if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
        _typeof = function _typeof(obj) {
          return _typeof2(obj);
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
        };
      }

      return _typeof(obj);
    }

    (function () {
      var _dictionary;

      var MAX_SAFE_INTEGER = 9007199254740991;

      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }

      function isArrayLike(value) {
        return value != null && typeof value != "function" && isLength(value.length);
      }

      var toString = Object.prototype.toString;

      function getType(value) {
        if (value == null) {
          return value === undefined ? "[object Undefined]" : "[object Null]";
        }

        return toString.call(value);
      }

      function isString(value) {
        var type = _typeof(value);

        return type === "string" || type === "object" && value != null && !Array.isArray(value) && getType(value) === "[object String]";
      }

      function isArraySpec(value) {
        return isArrayLike(value) && !isString(value);
      }

      var concat = function concat(newArray, values) {
        if (!isArraySpec(values)) {
          return newArray.push(values);
        }

        for (var i = 0; i < values.length; i++) {
          if (isArraySpec(values[i])) {
            if (values[i].length > 1) {
              concat(newArray, values[i]);
            } else if (values[i].length === 1) {
              concat(newArray, values[i][0]);
            }
          } else {
            newArray.push(values[i]);
          }
        }
      };

      function concat$1() {
        var values = [];

        for (var i = 0; i < arguments.length; i++) {
          values.push(arguments[i]);
        }

        var newArray = [];
        concat(newArray, values);
        return newArray;
      }

      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }

      function indexOf(array, value, fromIndex) {
        if (!isArrayLike(array)) {
          return -1;
        }

        if (!isLength(fromIndex) || fromIndex < 0) {
          fromIndex = 0;
        }

        for (; fromIndex < array.length; fromIndex++) {
          if (eq(array[fromIndex], value)) {
            return fromIndex;
          }
        }

        return -1;
      }

      function lastIndexOf(array, value, fromIndex) {
        if (!isArrayLike(array)) {
          return -1;
        }

        if (!isLength(fromIndex) || fromIndex > array.length - 1) {
          fromIndex = array.length - 1;
        }

        for (; fromIndex > -1; fromIndex--) {
          if (eq(array[fromIndex], value)) {
            return fromIndex;
          }
        }

        return -1;
      }

      function unique(array) {
        if (!isArraySpec(array)) {
          return array;
        }

        if (array.length === 0) {
          return [];
        }

        if (array.length === 1) {
          return [array[0]];
        }

        var newArray = [],
            help = _construct(Array, _toConsumableArray(array));

        while (help.length > 0) {
          newArray.push(help[0]);
          var value = help[0],
              j = -1;

          for (var i = 1; i < help.length; i++) {
            if (!eq(value, help[i])) {
              help[j + 1] = help[i];
              j += 1;
            }
          }

          help.length = j + 1;
        }

        return newArray;
      }

      function isSymbol(value) {
        var type = _typeof(value);

        return type === "symbol" || type === "object" && value !== null && getType(value) === "[object Symbol]";
      }

      var symbolToString = Symbol.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var INFINITY = 1 / 0;

      function toString$1(value) {
        if (value == null) {
          return "";
        }

        if (typeof value === "string") {
          return value;
        }

        if (isString(value)) {
          return value + "";
        }

        if (Array.isArray(value)) {
          var _temp = [];

          for (var i = 0; i < value.length; i++) {
            _temp[i] = toString$1(value[i]);
          }

          return "[".concat(_temp, "]");
        }

        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }

        var temp = "";

        for (var key in value) {
          if (hasOwnProperty.call(value, key)) temp += ',"' + toString$1(key) + '":' + toString$1(value[key]);
        }

        if (temp !== "") {
          temp = temp.replace(/^,/, "");
          return "{" + temp + "}";
        }

        var result = "".concat(value);
        return result === "0" && 1 / value === -INFINITY ? "-0" : result;
      }

      function isArray(value, notStrict) {
        if (notStrict) {
          return isArraySpec(value);
        }

        return Array.isArray(value);
      }

      function isObject(value) {
        var type = _typeof(value);

        return value != null && (type === "object" || type === "function");
      }

      function isBoolean(value) {
        return value === true || value === false || value !== null && _typeof(value) === "object" && getType(value) === "[object Boolean]";
      }

      function isPlainObject(value) {
        if (value === null || _typeof(value) !== "object" || getType(value) != "[object Object]") {
          return false;
        }

        if (Object.getPrototypeOf(value) === null) {
          return true;
        }

        var proto = value;

        while (Object.getPrototypeOf(proto) !== null) {
          proto = Object.getPrototypeOf(proto);
        }

        return Object.getPrototypeOf(value) === proto;
      }

      function isElement(value) {
        return value !== null && _typeof(value) === "object" && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
      }

      function isText(value) {
        return value !== null && _typeof(value) === "object" && value.nodeType === 3 && !isPlainObject(value);
      }

      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }

        var type = getType(value);
        return type === "[object Function]" || type === "[object AsyncFunction]" || type === "[object GeneratorFunction]" || type === "[object Proxy]";
      }

      function isError(value) {
        if (value === null || _typeof(value) !== "object") {
          return false;
        }

        var type = getType(value);
        return type === "[object Error]" || type === "[object DOMException]" || typeof value.message === "string" && typeof value.name === "string" && !isPlainObject(value);
      }

      function isNull(value) {
        return value === null;
      }

      function isNumber(value) {
        return typeof value === "number" || value !== null && _typeof(value) === "object" && getType(value) === "[object Number]";
      }

      function isUndefined(value) {
        return value === undefined;
      }

      function max(array, valback) {
        if (!isArrayLike(array) || array.length < 1) {
          return undefined;
        }

        if (valback) {
          var maxIndex = 0,
              maxValue = valback(array[0], 0),
              temp;

          for (var index = 1; index < array.length; index++) {
            temp = valback(array[index], index);

            if (temp > maxValue) {
              maxValue = temp;
              maxIndex = index;
            }
          }

          return array[maxIndex];
        } else {
          var _maxIndex = 0;

          for (var _index = 1; _index < array.length; _index++) {
            if (array[_index] > array[_maxIndex]) {
              _maxIndex = _index;
            }
          }

          return array[_maxIndex];
        }
      }

      function min(array, valback) {
        if (!isArrayLike(array) || array.length < 1) {
          return undefined;
        }

        if (valback) {
          var minIndex = 0,
              minValue = valback(array[0], 0),
              temp;

          for (var index = 1; index < array.length; index++) {
            temp = valback(array[index], index);

            if (temp < minValue) {
              minValue = temp;
              minIndex = index;
            }
          }

          return array[minIndex];
        } else {
          var _minIndex = 0;

          for (var _index2 = 1; _index2 < array.length; _index2++) {
            if (array[_index2] < array[_minIndex]) {
              _minIndex = _index2;
            }
          }

          return array[_minIndex];
        }
      }

      function isKey(value, object) {
        if (Array.isArray(value)) {
          return false;
        }

        var type = _typeof(value);

        if (type == "number" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }

        return object !== null && value in Object(object) || /^\w*$/.test(value);
      }

      function stringToPath(value) {
        return value.replace(/\[/g, ".").replace(/\]/g, "").replace(/"/g, "").replace(/'/g, "").split(".");
      }

      function castPath(value, object) {
        if (Array.isArray(value)) {
          return value;
        }

        return isKey(value, object) ? [value] : stringToPath(value);
      }

      var INFINITY$1 = 1 / 0;

      function toKey(value) {
        if (typeof value === "string" || isSymbol(value)) {
          return value;
        }

        var result = "".concat(value);
        return result === "0" && 1 / value === -INFINITY$1 ? "-0" : result;
      }

      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0;

        for (; index < path.length && object !== null; index++) {
          object = object[toKey(path[index])];
        }

        return index && index === path.length ? object : undefined;
      }

      function get(object, path, defaultValue) {
        var result = object == null ? undefined : baseGet(object, path);
        return result === undefined ? defaultValue : result;
      }

      function baseAssignValue(object, key, value) {
        if (key == "__proto__") {
          Object.defineProperty(object, key, {
            configurable: true,
            enumerable: true,
            value: value,
            writable: true
          });
        } else {
          object[key] = value;
        }
      }

      function assignValue(object, key, value) {
        baseAssignValue(object, key, value);
      }

      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }

        path = castPath(path, object);
        var nested = object;

        for (var index = 0; index < path.length; index++) {
          var key = toKey(path[index]);
          var newValue = value;

          if (index + 1 != path.length) {
            var objValue = nested[key];

            if (!isObject(objValue)) {
              newValue = customizer ? customizer(objValue, key, nested) : undefined;

              if (newValue === undefined) {
                newValue = {};
              }
            } else {
              newValue = objValue;
            }
          }

          assignValue(nested, key, newValue);
          nested = nested[key];
        }

        return object;
      }

      function set(object, path, value, customizer) {
        customizer = typeof customizer === "function" ? customizer : undefined;
        return object == null ? object : baseSet(object, path, value, customizer);
      }

      function split(str, splitStr) {
        str = toString$1(str);
        var resultArray = [],
            temp = str.split(splitStr);

        for (var i = 0; i < temp.length; i++) {
          temp[i] = temp[i].trim();

          if (temp[i] != "") {
            resultArray.push(temp[i]);
          }
        }

        return resultArray;
      }

      var $timers = [];
      var $interval = 13;
      var $speeds = 400;
      var $timerId = null;

      function animation(doback, duration, callback) {
        var clock = {
          timer: function timer(tick, duration, callback) {
            if (!tick) {
              throw new Error("Tick is required!");
            }

            duration = duration || $speeds;
            var id = new Date().valueOf() + "_" + (Math.random() * 1e3).toFixed(0);
            $timers.push({
              id: id,
              createTime: new Date(),
              tick: tick,
              duration: duration,
              callback: callback
            });
            clock.start();
            return id;
          },
          start: function start() {
            if (!$timerId) {
              $timerId = setInterval(clock.tick, $interval);
            }
          },
          tick: function tick() {
            var createTime,
                flag,
                tick,
                callback,
                timer,
                duration,
                passTime,
                timers = $timers;
            $timers = [];
            $timers.length = 0;

            for (flag = 0; flag < timers.length; flag++) {
              timer = timers[flag];
              createTime = timer.createTime;
              tick = timer.tick;
              duration = timer.duration;
              callback = timer.callback;
              passTime = (+new Date() - createTime) / duration;
              passTime = passTime > 1 ? 1 : passTime;
              tick(passTime);

              if (passTime < 1 && timer.id) {
                $timers.push(timer);
              } else if (callback) {
                callback(passTime);
              }
            }

            if ($timers.length <= 0) {
              clock.stop();
            }
          },
          stop: function stop() {
            if ($timerId) {
              clearInterval($timerId);
              $timerId = null;
            }
          }
        };
        var id = clock.timer(function (deep) {
          doback(deep);
        }, duration, callback);
        return function () {
          var i;

          for (i in $timers) {
            if ($timers[i].id == id) {
              $timers[i].id = undefined;
              return;
            }
          }
        };
      }

      function initConfig(init, data) {
        for (var key in data) {
          try {
            init[key] = data[key];
          } catch (e) {
            throw new Error("Illegal property value！");
          }
        }

        return init;
      }

      function Hermite(config) {
        config = initConfig({
          u: .5
        }, config);
        var MR, a, b;

        var hermite = function hermite(x) {
          if (MR) {
            var sx = (x - a) / (b - a),
                sx2 = sx * sx,
                sx3 = sx * sx2;
            var sResult = sx3 * MR[0] + sx2 * MR[1] + sx * MR[2] + MR[3];
            return sResult * (b - a);
          } else throw new Error("You shoud first set the position!");
        };

        hermite.setP = function (x1, y1, x2, y2, s1, s2) {
          if (x1 < x2) {
            a = x1;
            b = x2;
            var p3 = config.u * s1,
                p4 = config.u * s2;
            y1 /= x2 - x1;
            y2 /= x2 - x1;
            MR = [2 * y1 - 2 * y2 + p3 + p4, 3 * y2 - 3 * y1 - 2 * p3 - p4, p3, y1];
          } else throw new Error("The point x-position should be increamented!");

          return hermite;
        };

        return hermite;
      }

      var dictionary = (_dictionary = {
        48: [0, ")"],
        49: [1, "!"],
        50: [2, "@"],
        51: [3, "#"],
        52: [4, "$"],
        53: [5, "%"],
        54: [6, "^"],
        55: [7, "&"],
        56: [8, "*"],
        57: [9, "("],
        96: [0, 0],
        97: 1,
        98: 2,
        99: 3,
        100: 4,
        101: 5,
        102: 6,
        103: 7,
        104: 8,
        105: 9,
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        65: ["a", "A"],
        66: ["b", "B"],
        67: ["c", "C"],
        68: ["d", "D"],
        69: ["e", "E"],
        70: ["f", "F"],
        71: ["g", "G"],
        72: ["h", "H"],
        73: ["i", "I"],
        74: ["j", "J"],
        75: ["k", "K"],
        76: ["l", "L"],
        77: ["m", "M"],
        78: ["n", "N"],
        79: ["o", "O"],
        80: ["p", "P"],
        81: ["q", "Q"],
        82: ["r", "R"],
        83: ["s", "S"],
        84: ["t", "T"],
        85: ["u", "U"],
        86: ["v", "V"],
        87: ["w", "W"],
        88: ["x", "X"],
        89: ["y", "Y"],
        90: ["z", "Z"],
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        33: "page up",
        34: "page down",
        35: "end",
        36: "home",
        16: "shift",
        17: "ctrl",
        18: "alt",
        91: "command",
        92: "command",
        93: "command",
        9: "tab",
        20: "caps lock",
        32: "spacebar",
        8: "backspace",
        13: "enter",
        27: "esc",
        46: "delete",
        45: "insert",
        144: "number lock",
        145: "scroll lock",
        12: "clear"
      }, _defineProperty(_dictionary, "45", "insert"), _defineProperty(_dictionary, 19, "pause"), _defineProperty(_dictionary, 112, "f1"), _defineProperty(_dictionary, 113, "f2"), _defineProperty(_dictionary, 114, "f3"), _defineProperty(_dictionary, 115, "f4"), _defineProperty(_dictionary, 116, "f5"), _defineProperty(_dictionary, 117, "f6"), _defineProperty(_dictionary, 118, "f7"), _defineProperty(_dictionary, 119, "f8"), _defineProperty(_dictionary, 120, "f9"), _defineProperty(_dictionary, 121, "f10"), _defineProperty(_dictionary, 122, "f11"), _defineProperty(_dictionary, 123, "f12"), _defineProperty(_dictionary, 189, ["-", "_"]), _defineProperty(_dictionary, 187, ["=", "+"]), _defineProperty(_dictionary, 219, ["[", "{"]), _defineProperty(_dictionary, 221, ["]", "}"]), _defineProperty(_dictionary, 220, ["\\", "|"]), _defineProperty(_dictionary, 186, [";", ":"]), _defineProperty(_dictionary, 222, ["'", '"']), _defineProperty(_dictionary, 188, [",", "<"]), _defineProperty(_dictionary, 190, [".", ">"]), _defineProperty(_dictionary, 191, ["/", "?"]), _defineProperty(_dictionary, 192, ["`", "~"]), _dictionary);
      var help_key = ["shift", "ctrl", "alt"];

      function keyString(event) {
        event = event || window.event;
        var keycode = event.keyCode || event.which;
        var key = dictionary[keycode] || keycode;
        if (!key) return;
        if (key.constructor !== Array) key = [key, key];
        var shift = event.shiftKey ? "shift+" : "",
            alt = event.altKey ? "alt+" : "",
            ctrl = event.ctrlKey ? "ctrl+" : "";
        var resultKey = "",
            preKey = ctrl + shift + alt;

        if (help_key.indexOf(key[0]) >= 0) {
          key[0] = key[1] = "";
        }

        var lockPress = event.code == "Key" + event.key && !shift;
        resultKey = preKey + (preKey == "" && lockPress ? key[1] : key[0]);

        if (key[0] == "") {
          resultKey = resultKey.replace(/\+$/, "");
        }

        return resultKey;
      }

      function _move(d, a, b, c) {
        c = c || 0;
        var sqrt = Math.sqrt(a * a + b * b + c * c);
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, a * d / sqrt, b * d / sqrt, c * d / sqrt, 1];
      }

      function _rotate(deg) {
        var sin = Math.sin(deg),
            cos = Math.cos(deg);
        return [cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      }

      function _scale(xTimes, yTimes, zTimes, cx, cy, cz) {
        cx = cx || 0;
        cy = cy || 0;
        cz = cz || 0;
        return [xTimes, 0, 0, 0, 0, yTimes, 0, 0, 0, 0, zTimes, 0, cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1];
      }

      function _transform(a1, b1, c1, a2, b2, c2) {
        if (typeof a1 === "number" && typeof b1 === "number") {
          if (typeof c1 !== "number") {
            c1 = 0;
            a2 = a1;
            b2 = b1;
            c2 = 1;
          } else if (typeof a2 !== "number" || typeof b2 !== "number" || typeof c2 !== "number") {
            a2 = a1;
            b2 = b1;
            c2 = c1;
            a1 = 0;
            b1 = 0;
            c1 = 0;
          }

          if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error("It's not a legitimate ray!");
          var sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
              cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
              sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,
              b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
              c = c2 - c1,
              sqrt2 = Math.sqrt(b * b + c * c),
              cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
              sin2 = sqrt2 != 0 ? b / sqrt2 : 0;
          return [[cos1, cos2 * sin1, sin1 * sin2, 0, -sin1, cos1 * cos2, cos1 * sin2, 0, 0, -sin2, cos2, 0, b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1], [cos1, -sin1, 0, 0, cos2 * sin1, cos2 * cos1, -sin2, 0, sin1 * sin2, cos1 * sin2, cos2, 0, a1, b1, c1, 1]];
        } else {
          throw new Error("a1 and b1 is required!");
        }
      }

      var _multiply = function _multiply(matrix4, param) {
        var newParam = [];

        for (var i = 0; i < 4; i++) {
          for (var j = 0; j < param.length / 4; j++) {
            newParam[j * 4 + i] = matrix4[i] * param[j * 4] + matrix4[i + 4] * param[j * 4 + 1] + matrix4[i + 8] * param[j * 4 + 2] + matrix4[i + 12] * param[j * 4 + 3];
          }
        }

        return newParam;
      };

      function Matrix4(initMatrix4) {
        var matrix4 = initMatrix4 || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        var matrix4Obj = {
          move: function move(dis, a, b, c) {
            matrix4 = _multiply(_move(dis, a, b, c), matrix4);
            return matrix4Obj;
          },
          rotate: function rotate(deg, a1, b1, c1, a2, b2, c2) {
            var matrix4s = _transform(a1, b1, c1, a2, b2, c2);

            matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
            return matrix4Obj;
          },
          scale: function scale(xTimes, yTimes, zTimes, cx, cy, cz) {
            matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
            return matrix4Obj;
          },
          multiply: function multiply(newMatrix4, flag) {
            matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
            return matrix4Obj;
          },
          use: function use(x, y, z, w) {
            z = z || 0;
            w = w || 1;

            var temp = _multiply(matrix4, [x, y, z, w]);

            temp[0] = +temp[0].toFixed(7);
            temp[1] = +temp[1].toFixed(7);
            temp[2] = +temp[2].toFixed(7);
            temp[3] = +temp[3].toFixed(7);
            return temp;
          },
          value: function value() {
            return matrix4;
          }
        };
        return matrix4Obj;
      }

      function tree(_config) {
        var config = _config || {},
            alltreedata,
            rootid;

        var update = function update() {
          var beforeDis = [],
              size = 0,
              maxDeep = 0;

          (function positionCalc(pNode, deep) {
            if (deep > maxDeep) maxDeep = deep;
            var flag;

            for (flag = 0; flag < pNode.children.length; flag++) {
              positionCalc(alltreedata[pNode.children[flag]], deep + 1);
            }

            alltreedata[pNode.id].left = deep + .5;

            if (flag == 0) {
              if (beforeDis[deep] == undefined) beforeDis[deep] = -.5;
              if (beforeDis[deep - 1] == undefined) beforeDis[deep - 1] = -.5;
              alltreedata[pNode.id].top = beforeDis[deep] + 1;
              var pTop = beforeDis[deep] + 1 + (alltreedata[pNode.pid].children.length - 1) * .5;
              if (pTop - 1 < beforeDis[deep - 1]) alltreedata[pNode.id].top = beforeDis[deep - 1] + 1 - (alltreedata[pNode.pid].children.length - 1) * .5;
            } else {
              alltreedata[pNode.id].top = (alltreedata[pNode.children[0]].top + alltreedata[pNode.children[flag - 1]].top) * .5;
            }

            if (alltreedata[pNode.id].top <= beforeDis[deep]) {
              var needUp = beforeDis[deep] + 1 - alltreedata[pNode.id].top;

              (function doUp(_pid, _deep) {
                alltreedata[_pid].top += needUp;
                if (beforeDis[_deep] < alltreedata[_pid].top) beforeDis[_deep] = alltreedata[_pid].top;

                var _flag;

                for (_flag = 0; _flag < alltreedata[_pid].children.length; _flag++) {
                  doUp(alltreedata[_pid].children[_flag], _deep + 1);
                }
              })(pNode.id, deep);
            }

            beforeDis[deep] = alltreedata[pNode.id].top;
            if (alltreedata[pNode.id].top + .5 > size) size = alltreedata[pNode.id].top + .5;
          })(alltreedata[rootid], 0);

          return {
            node: alltreedata,
            root: rootid,
            size: size,
            deep: maxDeep + 1
          };
        };

        var toInnerTree = function toInnerTree(initTree) {
          var tempTree = {};
          var temp = config.root(initTree),
              id,
              rid;
          id = rid = config.id(temp);
          tempTree[id] = {
            data: temp,
            pid: null,
            id: id,
            children: []
          };

          (function createTree(pdata, pid) {
            var children = config.child(pdata, initTree),
                flag;

            for (flag = 0; children && flag < children.length; flag++) {
              id = config.id(children[flag]);
              tempTree[pid].children.push(id);
              tempTree[id] = {
                data: children[flag],
                pid: pid,
                id: id,
                children: []
              };
              createTree(children[flag], id);
            }
          })(temp, id);

          return [rid, tempTree];
        };

        var tree = function tree(initTree) {
          var treeData = toInnerTree(initTree);
          alltreedata = treeData[1];
          rootid = treeData[0];
          return update();
        };

        tree.root = function (rootback) {
          config.root = rootback;
          return tree;
        };

        tree.child = function (childback) {
          config.child = childback;
          return tree;
        };

        tree.id = function (idback) {
          config.id = idback;
          return tree;
        };

        return tree;
      }

      var __ = {
        concat: concat$1,
        indexOf: indexOf,
        lastIndexOf: lastIndexOf,
        unique: unique,
        eq: eq,
        toString: toString$1,
        isObject: isObject,
        isSymbol: isSymbol,
        isString: isString,
        isBoolean: isBoolean,
        isElement: isElement,
        isText: isText,
        isFunction: isFunction,
        isError: isError,
        isNull: isNull,
        isNumber: isNumber,
        isUndefined: isUndefined,
        isArray: isArray,
        max: max,
        min: min,
        get: get,
        set: set,
        split: split,
        animation: animation,
        Hermite: Hermite,
        keyString: keyString,
        Matrix4: Matrix4,
        tree: tree
      };

      if (_typeof(module) === "object" && _typeof(module.exports) === "object") {
        module.exports = __;
      } else {
        var $__ = window.__;

        __.noConflict = function (deep) {
          if (window.__ === __) {
            window.__ = $__;
          }

          return __;
        };

        window.__ = __;
      }
    })();
  });
  var blanksReg = _RegExp.blanksReg; // 分析结点的属性

  var analyseTag = function analyseTag(attrString) {
    var attr = {},
        index = 0;
    attrString = attrString.trim();

    var getOneAttr = function getOneAttr() {
      // 属性名和属性值
      var attrName = "",
          attrValue = ""; // 先寻找属性名

      for (; index < attrString.length; index++) {
        // 寻找属性名的时候遇到空白或结尾的时候，肯定没有属性值
        if (blanksReg.test(attrString[index]) || index == attrString.length - 1) {
          attrName += attrString[index]; // 如果属性名是空白，就不需要记录了

          if (!blanksReg.test(attrName)) {
            attr[attrName.trim()] = "";
          }

          index += 1;
          break;
        } // 如果遇到等号，说明属性名寻找结束了
        else if (attrString[index] == '=') {
            // 接着寻找属性值
            index += 1; // 由于属性可能由引号包裹或直接暴露

            var preCode = null,
                preLeng = -1; // 如果是由'或者"包裹

            if (attrString.substr(index, 1) == '"' || attrString.substr(index, 1) == "'") {
              preCode = attrString.substr(index, 1);
              preLeng = 1;
              index += 1;
            } // 如果是由\'或\"包裹
            else if (attrString.substr(index, 2) == '\"' || attrString.substr(index, 2) == "\'") {
                preCode = attrString.substr(index, 2);
                preLeng = 2;
                index += 2;
              } // 开始正式寻找属性值
            // 如果没有包裹，是直接暴露在外面的
            // 我们寻找到空格或结尾即可


            if (preCode !== null) {
              for (; index < attrString.length; index++) {
                if (attrString.substr(index, preLeng) == preCode) {
                  attr[attrName.trim()] = attrValue.trim();
                  index += 2;
                  break;
                } else {
                  attrValue += attrString[index];
                }
              }
            } // 如果是包裹的
            // 我们确定寻找到对应的包裹闭合即可
            else {
                for (; index < attrString.length; index++) {
                  if (blanksReg.test(attrString[index])) {
                    attr[attrName.trim()] = attrValue.trim();
                    index += 1;
                    break;
                  } else {
                    attrValue += attrString[index];
                  }
                }
              }

            break;
          } else {
            attrName += attrString[index];
          }
      } // 如果还有字符串，继续解析


      if (index < attrString.length) {
        getOneAttr();
      }
    };

    getOneAttr();
    return attr;
  };

  var blankReg = _RegExp.blankReg,
      blanksReg$1 = _RegExp.blanksReg;

  var nextTag = function nextTag(template) {
    var i = -1,
        // 当前面对的字符
    currentChar = null; // 如果前面是获取的js或css，还有pre等开始标签，比较特殊，直接寻址闭合的

    var preIsSpecial = false,
        specialCode = "";
    var specialTag = ['script', 'pre', 'style', 'code']; // 获取下一个字符

    var next = function next() {
      currentChar = i++ < template.length - 1 ? template[i] : null;
      return currentChar;
    }; // 获取往后n个值


    var nextNValue = function nextNValue(n) {
      return template.substring(i, n + i > template.length ? template.length : n + i);
    };

    next(); // 剔除开头的空白

    while (blankReg.test(currentChar) && i < template.length - 1) {
      next();
    }
    /**
     * 一个Tag存在哪些类型？如下：
     * 1.<tag-name>       { tagName:'tag-name', type:'beginTag', attrs:{} }      开始标签
     * 2.</tag-name>      { tagName:'tag-name', type:'endTag'   }                结束标签
     * 3.<tag-name />     { tagName:'tag-name', type:'fullTag',  attrs:{} }      自闭合标签
     * 4.text             { tagName:'text',     type:'textcode' }                文本结点
     * 5.<!-- text -->    { tagName:'text',     type:'comment'  }                注释
     * 6.<!DOCTYPE text>  { tagName:'text',     type:'DOCTYPE'  }                声明
     * 
     * 
     */


    return function () {
      var tag = currentChar,
          tagObj = {};
      if (tag == null) return null;
      /**
       * 特殊标签内容获取
       * ========================================
       */
      // 如果是获取特殊标签里面的内容
      // 先不考虑里面包含'</XXX>'

      if (preIsSpecial) {
        tagObj.type = 'textcode';
        tagObj.tagName = tag;

        while (nextNValue(specialCode.length + 3) != '</' + specialCode + '>') {
          tagObj.tagName += next();
        }

        tagObj.tagName = tagObj.tagName.replace(/<$/, '');
        preIsSpecial = false;
        return tagObj;
      }
      /**
       * 特殊标签获取
       * ========================================
       */
      // 针对特殊的comment


      if (nextNValue(4) == '<!--') {
        tagObj.type = 'comment';
        tagObj.tagName = tag;

        while (nextNValue(3) != '-->') {
          tagObj.tagName += next();
        }

        next();
        next();
        next();
        tagObj.tagName = tagObj.tagName.replace(/^<!--/, '').replace(/-$/, '');
        return tagObj;
      } // 针对特殊的doctype


      if (nextNValue(9) == '<!DOCTYPE') {
        tagObj.type = 'DOCTYPE';
        tagObj.tagName = tag;

        while (nextNValue(1) != '>') {
          tagObj.tagName += next();
        }

        next();
        tagObj.tagName = tagObj.tagName.replace(/^<!DOCTYPE/, '').replace(/>$/, '');
        return tagObj;
      }
      /**
       * 普通的
       * ========================================
       */
      // 如果是期望归结非文本结点
      else if (tag == '<') {
          // 标记是否处于属性值是字符串包裹中
          var isAttrString = false,
              attrLeftValue = null,
              attrLeftLen = null; // 如果在包裹中或者没有遇到‘>’说明没有结束

          while (isAttrString || currentChar != '>') {
            tag += next(); // 如果是包裹里面，试探是否即将遇到了结束

            if (isAttrString) {
              var next23Value = nextNValue(attrLeftLen + 1).substring(1);

              if (next23Value == attrLeftValue) {
                isAttrString = false;
              }
            } // 如果在包裹外面，试探是否即将进入包裹
            else {
                var _next23Value = nextNValue(2);

                if (_next23Value == '="' || _next23Value == "='") {
                  attrLeftValue = _next23Value.replace('=', '');
                  attrLeftLen = 1;
                  isAttrString = true;
                }

                _next23Value = nextNValue(3);

                if (_next23Value == '=\"' || _next23Value == "=\'") {
                  attrLeftValue = _next23Value.replace('=', '');
                  attrLeftLen = 2;
                  isAttrString = true;
                }
              }
          } // 针对特殊的结束标签


          if (/^<\//.test(tag)) {
            tagObj.tagName = tag.replace(/^<\//, '').replace(/>$/, '');
            tagObj.type = 'endTag';
          } else {
            if (/\/>$/.test(tag)) {
              tagObj.type = 'fullTag';
              tag = tag.replace(/\/>$/, '');
            } else {
              tagObj.type = 'beginTag';
              tag = tag.replace(/>$/, '');
            }

            tag = tag.replace(/^</, '');
            tagObj.tagName = "";
            var _i = 0;

            for (; _i < tag.length; _i++) {
              if (tag[_i] == ' ') break;
              tagObj.tagName += tag[_i];
            }

            var attrString = tag.substring(_i);

            if (blanksReg$1.test(attrString)) {
              tagObj.attrs = {};
            } else {
              tagObj.attrs = analyseTag(attrString);
            }
          }
        } // 如果是归结文本结点
        // 如果文本中包含<的先忽略考虑
        else {
            tagObj.type = 'textcode';
            tagObj.tagName = currentChar;

            while (nextNValue(1) != '<') {
              tagObj.tagName += next();
            }

            tagObj.tagName = tagObj.tagName.replace(/<$/, '');
            i -= 1;
          } // 如果遇到开始script或者style、pre等特殊标签，标记开始获取特殊文本


      if (tagObj.type == 'beginTag') {
        if (specialTag.indexOf(tagObj.tagName.toLowerCase()) > -1) {
          preIsSpecial = true;
          specialCode = tagObj.tagName;
        }
      } // 如果遇到结束script或者style、pre等特殊标签，标记结束获取特殊文本
      else if (tagObj.type == 'endTag') {
          if (specialTag.indexOf(tagObj.tagName.toLowerCase()) > -1) {
            preIsSpecial = false;
          }
        }

      next();
      return tagObj;
    };
  }; // 分析deep
  // 我们会在这里校对那些没有结束标签的开始标签
  // 这步结束以后，每个都是一个单独的标签
  // 也就是不用再区分开始或闭合了


  var analyseDeep = function analyseDeep(tagArray) {
    // 闭合标签
    tagArray = closeTag(tagArray);
    var deep = 0,
        tagDeepArray = [];
    tagArray.forEach(function (tag) {
      if (tag.type == 'beginTag') {
        tagDeepArray.push({
          type: "tag",
          name: tag.tagName,
          attrs: tag.attrs,
          __deep__: ++deep,
          __tagType__: "double"
        });
      } else if (tag.type == 'endTag') {
        deep -= 1;
      } else if (tag.type == 'textcode') {
        // 如果是文本
        tagDeepArray.push({
          type: "text",
          content: tag.tagName,
          __deep__: deep + 1
        });
      } else if (tag.type == 'comment') {
        // 如果是注释
        tagDeepArray.push({
          type: "comment",
          content: tag.tagName,
          __deep__: deep + 1
        });
      } else {
        // 如果是自闭合结点
        tagDeepArray.push({
          type: "tag",
          name: tag.tagName,
          attrs: tag.attrs,
          __deep__: deep + 1,
          __tagType__: "single"
        });
      }
    });
    return tagDeepArray;
  }; // 标记所有没有闭合结点的直接自闭合


  var closeTag = function closeTag(tagArray) {
    var needClose = [];
    tagArray.forEach(function (tag, i) {
      if (tag.type == 'beginTag') {
        needClose.push([i, tag.tagName]);
      } else if (tag.type == 'endTag') {
        while (needClose.length > 0) {
          var needCloseTag = needClose.pop();

          if (needCloseTag[1] == tag.tagName) {
            break;
          } else {
            tagArray[needCloseTag[0]].type = 'fullTag';
          }
        }
      }
    });
    return tagArray;
  };

  var blanksReg$2 = _RegExp.blanksReg; // 获取一棵DOM树
  // noIgnore为true表示不忽略任何标签

  var DomTree = function DomTree(template, noIgnore) {
    if (!core_min.isString(template)) throw new Error("Template must be a String!"); // 获取读取下一个标签对象

    var nextTag$1 = nextTag(template);
    var tag = nextTag$1(),
        DomTree = [];

    while (tag != null) {
      if (tag.type == 'textcode' && blanksReg$2.test(tag.tagName)) ;else if (tag.type == 'DOCTYPE') ;else if (tag.type == 'comment') {
        // 注释目前也默认过滤掉，除非显示声明不忽略
        if (noIgnore) {
          DomTree.push(tag);
        }
      } else {
        DomTree.push(tag);
      }
      tag = nextTag$1();
    } // 分析层次


    DomTree = analyseDeep(DomTree);
    /**
     * 模仿浏览器构建的一棵树,每个节点有如下属性：
     * 
     * 1.parentNode index  父结点
     * 2.childNodes []     孩子结点
     * 3.preNode    index  前一个兄弟结点
     * 4.nextNode   index  后一个兄弟结点
     * 
     * 5.attrs:{}          当前结点的属性
     * 6.name              节点名称
     * 7.type              节点类型（tag和text）
     * 8.content           文本结点内容
     * 
     * 需要注意的是：如果一个文本结点内容只包含回车，tab，空格等空白字符，会直接被忽视
     */

    var presNode = [null],
        preDeep = 0;

    for (var i = 0; i < DomTree.length; i++) {
      // 当前结点
      var currentIndex = i,
          currentDeep = DomTree[i].__deep__;
      DomTree[i].childNodes = [];
      DomTree[i].preNode = null;
      DomTree[i].nextNode = null; // 前置三个结点

      var lastPre = presNode[presNode.length - 1];
      var last2Pre = presNode.length > 1 ? presNode[presNode.length - 2] : null; // 如果遇到的是兄弟结点

      if (currentDeep == preDeep) {
        // 修改兄弟关系
        DomTree[currentIndex].preNode = lastPre;
        DomTree[lastPre].nextNode = currentIndex; // 修改父子关系

        DomTree[currentIndex].parentNode = last2Pre;
        DomTree[last2Pre].childNodes.push(currentIndex); // 校对presNode

        presNode[presNode.length - 1] = currentIndex;
      } // 如果是遇到了孩子
      else if (currentDeep > preDeep) {
          // 修改兄弟关系
          // todo
          // 修改父子关系
          DomTree[currentIndex].parentNode = lastPre;
          if (lastPre != null) DomTree[lastPre].childNodes.push(currentIndex); // 校对presNode

          presNode.push(currentIndex);
        } // 如果是遇到了祖先
        else {
            var preTempIndex = presNode[presNode.length - 1 - (preDeep - currentDeep)];
            var preTemp2Index = presNode[presNode.length - 2 - (preDeep - currentDeep)]; // 修改兄弟关系

            DomTree[currentIndex].preNode = preTempIndex;
            if (preTempIndex != null) DomTree[preTempIndex].nextNode = currentIndex; // 修改父子关系

            DomTree[currentIndex].parentNode = preTemp2Index;
            if (preTemp2Index != null) DomTree[preTemp2Index].childNodes.push(currentIndex); // 校对presNode

            for (var _i2 = 0; _i2 < preDeep - currentDeep; _i2++) {
              presNode.pop();
            }

            presNode[presNode.length - 1] = currentIndex;
          }

      preDeep = currentDeep;
    }

    return DomTree;
  };

  function html_format(textString, tabNumber) {
    // 借助开源项目获得的模板分析结果：git+https://github.com/yelloxing/xhtml-engine.git
    var domTree = DomTree("<help-root>" + textString + "</help-root>", true);
    var getTabString = getTabStringFactory(tabNumber);
    console.log(domTree);
    /**
     * 为了避免使用递归，我们定义一个计算数组needCalcs来登记已经计算过的结果和待计算的内容
     * 虽然需要频繁插入，可是感觉问题不大，并且数组的话，方便最后模板的获取
     * 
     * 算法思想：来自深度优先遍历树图
     * 
     */

    var needCalcs = domTree[0].childNodes,
        index = 0,
        currentNode,
        attrsString,
        needReplace;

    while (index < needCalcs.length) {
      // 寻找第一个没有计算的
      do {
        currentNode = needCalcs[index++];
      } while (isString(currentNode));

      currentNode = domTree[currentNode];

      if (!currentNode) {
        break;
      }
      /**
      * 对当前面对的进行处理(计算当前模板)
      */
      //  如果是标签


      if (currentNode.type == 'tag') {
        attrsString = ""; // 只有是标签，属性一定存在

        for (var key in currentNode.attrs) {
          attrsString += "".concat(key, "=\"").concat(currentNode.attrs[key], "\" ");
        } // 这种情况稍微麻烦点，需要登记开头和结尾，而且需要插入孩子


        if (currentNode.__tagType__ == 'double') {
          needReplace = []; // 登记开头

          needReplace.push(getTabString(currentNode.__deep__ - 2) + "<".concat(currentNode.name, " ").concat(attrsString, ">")); // 登记孩子

          for (var i = 0; i < currentNode.childNodes.length; i++) {
            needReplace.push(currentNode.childNodes[i]);
          } // 登记结尾


          needReplace.push(getTabString(currentNode.__deep__ - 2) + "</".concat(currentNode.name, ">"));
          needCalcs.splice.apply(needCalcs, [index - 1, 1].concat(_toConsumableArray2(needReplace)));
        } // 如果不是有开始和结束标签的，一定没有孩子
        else {
            needCalcs[index - 1] = getTabString(currentNode.__deep__ - 2) + "<".concat(currentNode.name, " ").concat(attrsString, "/>");
          }
      } // 如果是文本
      else if (currentNode.type == 'text') {
          needCalcs[index - 1] = getTabString(currentNode.__deep__ - 2) + currentNode.content.trim();
        } // 如果是注释
        else if (currentNode.type == 'comment') {
            needCalcs[index - 1] = getTabString(currentNode.__deep__ - 2) + "<!-- " + currentNode.content.trim() + " -->";
          }
    }

    return needCalcs.join("\n");
  }

  function css_format(textString, tabNumber) {
    console.warn("[提醒] CSS格式化方法未提供！");
    return textString;
  }

  function javascript_format(textString, tabNumber) {
    console.warn("[提醒] JavaScript格式化方法未提供！");
    return textString;
  }

  function json_shader(textString, colors, notToResult) {
    var shaderArray = []; // 当前面对的

    var i = 0; // 获取往后n个值

    var nextNValue = function nextNValue(n) {
      return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    var template = ""; // 1:选择器 tag
    // 2:属性名 attr
    // 3:属性值 string

    var state = "tag"; // 初始化模板，开始文本捕获

    var initTemplate = function initTemplate() {
      if (template != "") {
        shaderArray.push({
          color: colors[state],
          content: template
        });
      }

      template = "";
    };

    while (true) {
      /* 1.注释 */
      if (nextNValue(2) == '/*') {
        initTemplate();

        while (nextNValue(2) !== '*/' && i < textString.length) {
          template += textString[i++];
        }

        shaderArray.push({
          color: colors.annotation,
          content: template + nextNValue(2)
        });
        i += 2;
        template = "";
      }
      /* 2.字符串 */
      else if (["'", '"'].indexOf(nextNValue(1)) > -1) {
          var strBorder = nextNValue(1);
          initTemplate();

          do {
            template += textString[i++];
          } while (nextNValue(1) != strBorder && i < textString.length); // 因为可能是没有字符导致的结束


          if (nextNValue(1) != strBorder) {
            strBorder = "";
          } else {
            i += 1;
          }

          shaderArray.push({
            color: colors.string,
            content: template + strBorder
          });
          template = "";
        }
        /* 3.边界 */
        else if ([":", '{', '}', ",", "[", "]"].indexOf(nextNValue(1)) > -1) {
            initTemplate();
            shaderArray.push({
              color: colors.border,
              content: nextNValue(1)
            });
            template = "";

            if (nextNValue(1) == '{' || nextNValue(1) == ',') {
              state = 'attr';
            } else if (nextNValue(1) == '}') {
              state = 'tag';
            } else {
              state = 'string';
            }

            i += 1;
          }
          /* 追加字符 */
          else {
              if (i >= textString.length) {
                initTemplate();
                break;
              } else {
                template += textString[i++];
              }
            }
    }

    return notToResult ? shaderArray : toShaderReult(shaderArray);
  } // 温馨提示：只支持标准的JSON格式化


  function json_format(textString, tabNumber) {
    return JSON.stringify(JSON.parse(textString), null, tabNumber);
  }

  var wscode = function wscode(options) {
    var _this5 = this;

    /**
     * 
     * [格式化配置]
     * 
     * 所有的配置校验和默认值设置等都应该在这里进行
     * 经过这里处理以后，后续不需要再进行校验了
     * 因此这里的内容的更改一定要慎重
     * 
     */
    // 编辑器挂载点
    if (isElement(options.el)) {
      // 着色器
      var shader = {
        html: html_shader,
        css: css_shader,
        javascript: javascript_shader,
        json: json_shader,
        normal: function normal() {
          var resultData = [];

          _this5._contentArray.forEach(function (text) {
            resultData.push([{
              content: text,
              color: _this5._colorText
            }]);
          });

          return resultData;
        }
      }; // 格式化

      var format = {
        html: html_format,
        css: css_format,
        javascript: javascript_format,
        json: json_format,
        normal: function normal(textString) {
          return textString;
        }
      };
      this._el = options.el; // 公共配置

      options.color = options.color || {};
      this._colorBackground = options.color.background || "#d6d6e4";
      /*编辑器背景*/

      this._colorText = options.color.text || "#000000";
      /*普通文本颜色*/

      this._colorNumber = options.color.number || "#888484";
      /*行号颜色*/

      this._colorEdit = options.color.edit || "#eaeaf1";
      /*编辑行颜色*/

      this._colorCursor = options.color.cursor || "#ff0000";
      /*光标颜色*/

      this._colorSelect = options.color.select || "#6c6cf155";
      /*选择背景*/

      this._fontFamily = options["font-family"] || "新宋体";
      /*字体*/

      this._fontWeight = options["font-weight"] || 600;
      /*字重*/

      this._tabSpace = options.tabSpace || 4;
      /*设置一个tab表示多少个空格*/
      // 语言类型

      var lang = options.lang || {};
      this._langType = lang.type || "normal";
      /*默认普通文本*/

      this._langColors = lang.color || {};
      this._langColors.text = this._colorText;

      var initOptions = function initOptions(defaultOptinos, configOptions) {
        configOptions = configOptions || {};

        for (var key in configOptions) {
          defaultOptinos[key] = configOptions[key];
        }

        return defaultOptinos;
      }; // 着色色彩配置


      this._langColors = initOptions({
        "annotation": "#6a9955",

        /*注释颜色*/
        "border": "#ffffff",

        /*边界颜色*/
        "tag": "#1e50b3",

        /*结点颜色*/
        "attr": "#1e83b1",

        /*属性颜色*/
        "string": "#ac4c1e",

        /*字符串颜色*/
        "key": "#ff0000"
        /*关键字颜色*/

      }, this._langColors); // 语言类型校对

      if (["normal", "html", "css", "javascript", "json"].indexOf(this._langType) < 0) {
        console.error("[错误]配置的语言类型‘" + this._langType + "’不支持！"); // 重置默认类型

        this._langType = "normal";
      } // 文本


      this._contentArray = isString(options.content) ? (this.$$filterText(options.content) + "").split("\n") : [""]; // 着色方法

      this.$shader = isFunction(options.shader) ? options.shader : shader[this._langType]; // 格式化方法

      this.$format = isFunction(options.format) ? options.format : format[this._langType];
    } else {
      // 挂载点是必须的，一定要有
      throw new Error('options.el is not a element!');
    } // 先初始化DOM


    this.$$initDom(); // 初始化控制变量

    this.__needUpdate = true;
    this.__lineNum = this._contentArray.length - 1;
    this.__leftNum = this._contentArray[this.__lineNum].length;
    this.__cursor1 = this.__cursor2 = {
      leftNum: 0,
      lineNum: 0
    };
    this.__formatData = this.$shader(this._contentArray.join('\n'), this._langColors); // 初始化视图

    this.$$initView(); // 更新视图

    this.$$updateView(); // 绑定操作

    this.$$bindEvent();

    this.valueOf = function () {
      return _this5._contentArray.join('\n');
    };

    this.format = function () {
      // 格式化内容
      _this5._contentArray = _this5.$format(_this5._contentArray.join('\n'), _this5._tabSpace).split('\n');
      _this5.__lineNum = _this5._contentArray.length - 1;
      _this5.__leftNum = _this5._contentArray[_this5.__lineNum].length; // 着色

      _this5.__formatData = _this5.$shader(_this5._contentArray.join('\n'), _this5._langColors); // 更新视图

      _this5.$$updateView(); // 更新光标位置


      _this5.$$initView();
    };
  }; // 挂载辅助方法


  wscode.prototype.$$textWidth = textWidth;
  wscode.prototype.$$bestLeftNum = bestLeftNum;
  wscode.prototype.$$calcCanvasXY = calcCanvasXY;
  wscode.prototype.$$selectIsNotBlank = selectIsNotBlank;
  wscode.prototype.$$filterText = filterText; // 挂载核心方法

  wscode.prototype.$$initDom = initDom;
  wscode.prototype.$$initView = initView;
  wscode.prototype.$$updateView = updateView;
  wscode.prototype.$$updateSelectView = updateSelectView;
  wscode.prototype.$$updateCursorPosition = updateCursorPosition;
  wscode.prototype.$$updateCanvasSize = updateCanvasSize;
  wscode.prototype.$$cancelSelect = cancelSelect;
  wscode.prototype.$$deleteSelect = deleteSelect;
  wscode.prototype.$$bindEvent = bindEvent;
  wscode.author = '心叶（yelloxing@gmail.com）';

  if ((typeof module === "undefined" ? "undefined" : _typeof2(module)) === "object" && _typeof2(module.exports) === "object") {
    module.exports = wscode;
  } else {
    window.WSCode = wscode;
  }
})();