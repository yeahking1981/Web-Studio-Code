/*!
* web Studio Code - 🎉 An Editor Used on the Browser Side.
* git+https://github.com/yelloxing/Web-Studio-Code.git
*
* author 心叶
*
* version 1.2.0
*
* build Fri May 08 2020
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Mon May 11 2020 22:25:13 GMT+0800 (GMT+08:00)
*/

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  'use strict';

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
    if (value === null || _typeof(value) !== 'object' || getType(value) != '[object Object]') {
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
    return value !== null && _typeof(value) === 'object' && (value.nodeType === 1 || value.nodeType === 9 || value.nodeType === 11) && !isPlainObject(value);
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
    var type = _typeof(value);

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
    var type = _typeof(value);

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
    }
  }; // 初始化结点

  function initDom() {
    var _this = this;

    xhtml.css(this._el, {
      "font-size": "12px",
      position: "relative",
      cursor: "text",
      "font-family": "新宋体",

      /*这里必须设置为等宽字体*/
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
      "font-weight": 600
    }); // 光标

    this.__focusDOM = xhtml.appendTo(this._el, "<textarea></textarea>");
    xhtml.css(this.__focusDOM, {
      position: "absolute",
      width: "20px",
      height: "21px",
      "line-height": "21px",
      resize: "none",
      overflow: "hidden",
      padding: "0",
      outline: "none",
      border: "none",
      background: "#0000",
      color: this._colorText
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
    });
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
        template += "<span style='padding-right:10px;font-weight:600;white-space: pre;color:" + text.color + "'>" + text.content + "</span>";
      });
      template += "</div>";
    });

    this.__showDOM.innerHTML = template;
  } // 输入的时候更新光标位置


  function updateCursorPosition(text) {
    if (/^\n$/.test(text)) {
      // 如果是回车
      var preTop = +this.__focusDOM.style.top.replace('px', '');
      xhtml.css(this.__focusDOM, {
        top: preTop + 21 + "px",
        left: "40px"
      });
    } else {
      var preLeft = +this.__focusDOM.style.left.replace('px', '');
      var width = this.$$textWidth(text);
      xhtml.css(this.__focusDOM, {
        left: preLeft + width + "px"
      });
    }
  } // 绑定键盘和鼠标等交互事件处理


  function bindEvent() {
    var _this3 = this;

    // 点击编辑界面
    xhtml.bind(this._el, 'click', function (event) {});

    var update = function update(text) {
      // 获取输入内容
      text = text || _this3.__focusDOM.value;
      _this3.__focusDOM.value = ""; // 更新光标位置

      _this3.$$updateCursorPosition(text);

      if (/^\n$/.test(text)) {
        if (_this3.__leftNum >= _this3._contentArray[_this3.__lineNum].length) {
          _this3._contentArray.splice(_this3.__lineNum + 1, 0, "");
        } else {
          _this3._contentArray.splice(_this3.__lineNum + 1, 0, _this3._contentArray[_this3.__lineNum].substring(_this3.__leftNum));

          _this3._contentArray[_this3.__lineNum] = _this3._contentArray[_this3.__lineNum].substring(0, _this3.__leftNum);
        }

        _this3.__lineNum += 1;
        _this3.__leftNum = 0;
      } else {
        _this3._contentArray[_this3.__lineNum] = _this3._contentArray[_this3.__lineNum].substring(0, _this3.__leftNum) + text + _this3._contentArray[_this3.__lineNum].substring(_this3.__leftNum);
        _this3.__leftNum += text.length;
      } // 着色并更新视图


      _this3.__formatData = _this3.$shader(_this3._contentArray.join('\n'));

      _this3.$$updateView();
    }; // 中文输入开始


    xhtml.bind(this.__focusDOM, 'compositionstart', function () {
      _this3.__needUpdate = false;
    }); // 中文输入结束

    xhtml.bind(this.__focusDOM, 'compositionend', function () {
      _this3.__needUpdate = true;
      update();
    }); // 输入

    xhtml.bind(this.__focusDOM, 'input', function () {
      // 如果是中文输入开始，不应该更新
      if (_this3.__needUpdate) update();
    });
  }

  var wscode = function wscode(options) {
    var _this4 = this;

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
      this._el = options.el; // 着色

      options.color = options.color || {};
      this._colorBackground = options.color.background || "#d6d6e4";
      /*编辑器背景*/

      this._colorText = options.color.text || "#000";
      /*普通文本颜色*/

      this._colorNumber = options.color.number || "#888484";
      /*行号颜色*/

      this._colorEdit = options.color.edit || "#eaeaf1";
      /*编辑行颜色*/
      // 文本

      this._contentArray = isString(options.content) ? (options.content + "").split("\n") : [""]; // 着色方法

      this.$shader = isFunction(options.shader) ? options.shader : function () {
        var resultData = [];

        _this4._contentArray.forEach(function (text) {
          resultData.push([{
            content: text,
            color: _this4._colorText
          }]);
        });

        return resultData;
      }; // 格式化方法

      this.$format = isFunction(options.format) ? options.format : function (textString) {
        return textString;
      };
    } else {
      // 挂载点是必须的，一定要有
      throw new Error('options.el is not a element!');
    } // 先初始化DOM


    this.$$initDom(); // 初始化控制变量

    this.__needUpdate = true;
    this.__lineNum = this._contentArray.length - 1;
    this.__leftNum = this._contentArray[this.__lineNum].length;
    this.__formatData = this.$shader(this._contentArray.join('\n')); // 初始化视图

    this.$$initView(); // 更新视图

    this.$$updateView(); // 绑定操作

    this.$$bindEvent();
  }; // 挂载辅助方法


  wscode.prototype.$$textWidth = textWidth; // 挂载核心方法

  wscode.prototype.$$initDom = initDom;
  wscode.prototype.$$initView = initView;
  wscode.prototype.$$updateView = updateView;
  wscode.prototype.$$updateCursorPosition = updateCursorPosition;
  wscode.prototype.$$bindEvent = bindEvent;

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = wscode;
  } else {
    window.WSCode = wscode;
  }
})();