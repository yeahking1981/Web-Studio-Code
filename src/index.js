
// 兼容方法

import './Polyfill/Symbol';

import isElement from '@yelloxing/core.js/isElement';
import isString from '@yelloxing/core.js/isString';
import isFunction from '@yelloxing/core.js/isFunction';

// 核心方法和工具方法

import { textWidth, bestLeftNum, calcCanvasXY, selectIsNotBlank } from './edit-view/tool';

import { initDom, initView } from './edit-view/init';
import { updateView, updateSelectView, updateCursorPosition, updateCanvasSize, cancelSelect, deleteSelect } from './edit-view/update';
import bindEvent from './edit-view/bind';
import diff from './edit-view/diff';

import filterText from './edit-view/filter';

// 引入内置的语言支持

import html_shader from './lang/html/shader';
import html_format from './lang/html/format';

import css_shader from './lang/css/shader';
import css_format from './lang/css/format';

import javascript_shader from './lang/javascript/shader';
import javascript_format from './lang/javascript/format';

import json_shader from './lang/json/shader';
import json_format from './lang/json/format';

let wscode = function (options) {

    if (!(this instanceof wscode)) {
        throw new Error('WSCode is a constructor and should be called with the `new` keyword');
    }

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
        let shader = {
            html: html_shader,
            css: css_shader,
            javascript: javascript_shader,
            json: json_shader,
            normal: () => {
                let resultData = [];
                this._contentArray.forEach(text => { resultData.push([{ content: text, color: this._colorText }]); });
                return resultData;
            }
        };

        // 格式化
        let format = {
            html: html_format,
            css: css_format,
            javascript: javascript_format,
            json: json_format,
            normal: textString => textString
        };

        this._el = options.el;

        // 公共配置
        options.color = options.color || {};
        this._colorBackground = options.color.background || "#d6d6e4"; /*编辑器背景*/
        this._colorText = options.color.text || "#000000"; /*普通文本颜色*/
        this._colorNumber = options.color.number || "#888484"; /*行号颜色*/
        this._colorEdit = options.color.edit || "#eaeaf1"; /*编辑行颜色*/
        this._colorCursor = options.color.cursor || "#ff0000"; /*光标颜色*/
        this._colorSelect = options.color.select || "#6c6cf1"; /*选择背景*/
        this._fontFamily = options["font-family"] || "新宋体"; /*字体*/
        this._fontWeight = options["font-weight"] || 600;/*字重*/
        this._tabSpace = options.tabSpace || 4;/*设置一个tab表示多少个空格*/

        // 语言类型
        let lang = options.lang || {};
        this._langType = lang.type || "normal"; /*默认普通文本*/
        this._langColors = lang.color || {}; this._langColors.text = this._colorText;

        let initOptions = function (defaultOptinos, configOptions) {

            configOptions = configOptions || {};
            for (let key in configOptions) {
                defaultOptinos[key] = configOptions[key];
            }

            return defaultOptinos;

        };
        // 着色色彩配置

        this._langColors = initOptions({

            "annotation": "#6a9955",/*注释颜色*/
            "border": "#ffffff",/*边界颜色*/
            "tag": "#1e50b3",/*结点颜色*/
            "attr": "#1e83b1",/*属性颜色*/
            "string": "#ac4c1e",/*字符串颜色*/
            "key": "#ff0000",/*关键字颜色*/

        }, this._langColors);

        // 语言类型校对
        if (["normal", "html", "css", "javascript", "json"].indexOf(this._langType) < 0) {

            console.error("[错误]配置的语言类型‘" + this._langType + "’不支持！");

            // 重置默认类型
            this._langType = "normal";
        }

        // 文本
        this._contentArray = isString(options.content) ? (this.$$filterText(options.content) + "").split("\n") : [""];

        // 着色方法
        this.$shader = isFunction(options.shader) ? options.shader : shader[this._langType];

        // 格式化方法
        this.$format = isFunction(options.format) ? options.format : format[this._langType];

    } else {

        // 挂载点是必须的，一定要有
        throw new Error('options.el is not a element!');
    }

    // 先初始化DOM
    this.$$initDom();

    // 初始化控制变量
    this.__needUpdate = true;
    this.__lineNum = this._contentArray.length - 1;
    this.__leftNum = this._contentArray[this.__lineNum].length;
    this.__cursor1 = this.__cursor2 = { leftNum: 0, lineNum: 0 };
    this.__formatData = this.$$diff(this.$shader(this._contentArray.join('\n'), this._langColors));

    // 初始化视图
    this.$$initView();

    // 更新视图
    this.$$updateView();

    // 绑定操作
    this.$$bindEvent();

    this.__updated__ = () => { };
    this.updated = callback => {
        this.__updated__ = callback;
    };

    this.valueOf = () => {
        return this._contentArray.join('\n');
    };

    this.format = () => {

        // 格式化内容
        this._contentArray = this.$format(this._contentArray.join('\n'), this._tabSpace).split('\n');

        this.__lineNum = this._contentArray.length - 1;
        this.__leftNum = this._contentArray[this.__lineNum].length;

        // 着色
        this.__formatData = this.$$diff(this.$shader(this._contentArray.join('\n'), this._langColors));

        // 更新视图
        this.$$updateView();

        // 更新光标位置
        this.$$initView();

    };

};

// 挂载辅助方法
wscode.prototype.$$textWidth = textWidth;
wscode.prototype.$$bestLeftNum = bestLeftNum;
wscode.prototype.$$calcCanvasXY = calcCanvasXY;
wscode.prototype.$$selectIsNotBlank = selectIsNotBlank;
wscode.prototype.$$filterText = filterText;

// 挂载核心方法

wscode.prototype.$$initDom = initDom;
wscode.prototype.$$initView = initView;

wscode.prototype.$$updateView = updateView;
wscode.prototype.$$updateSelectView = updateSelectView;
wscode.prototype.$$updateCursorPosition = updateCursorPosition;
wscode.prototype.$$updateCanvasSize = updateCanvasSize;
wscode.prototype.$$cancelSelect = cancelSelect;
wscode.prototype.$$deleteSelect = deleteSelect;

wscode.prototype.$$bindEvent = bindEvent;

// 性能优化系列方法

wscode.prototype.$$diff = diff;

wscode.author = '心叶（yelloxing@gmail.com）';

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = wscode;
} else {
    window.WSCode = wscode;
}