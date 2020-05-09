/*!
* web Studio Code - 💪 An Editor Used on the Browser Side.
* git+https://github.com/yelloxing/Web-Studio-Code.git
*
* author 心叶
*
* version 0.1.0-alpha
*
* build Fri May 08 2020
*
* Copyright yelloxing
* Released under the MIT license
*
* Date:Sat May 09 2020 10:42:56 GMT+0800 (GMT+08:00)
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
   * 
   * 格式化配置
   * 
   * 所有的配置校验和默认值设置等都应该在这里进行
   * 经过这里处理以后，后续不需要再进行校验了
   * 因此这里的内容的更改一定要慎重
   * 
   */


  function formatOptions(options) {
    // 编辑器挂载点
    if (isElement(options.el)) {
      // 语言类型，默认纯文本
      options.lang = {
        js: "js",
        css: "css",
        html: "html"
      }[options.lang] || "normal"; // 着色

      options.color = options.color || {};
      options.color.normal = options.color.normal || "#000";
      /*普通文本颜色*/

      options.color.key = options.color.key || "red";
      /*关键字颜色*/

      options.color.note = options.color.note || "#8BC34A";
      /*注释颜色*/

      options.color.variable = options.color.variable || "#0a6893";
      /*变量颜色*/
    } else {
      // 挂载点是必须的，一定要有
      throw new Error('options.el is not a element!');
    }
  }

  var wscode = function wscode(options) {
    // 格式化配置
    formatOptions(options);
    debugger;
  };

  if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
    module.exports = wscode;
  } else {
    window.wscode = wscode;
  }
})();