import isElement from '@yelloxing/core.js/isElement';
import isString from '@yelloxing/core.js/isString';
import isFunction from '@yelloxing/core.js/isFunction';

import { textWidth } from './edit-view/tool';

import { initDom, initView } from './edit-view/init';
import { updateView, updateCursorPosition } from './edit-view/update';
import bindEvent from './edit-view/bind';

let wscode = function (options) {

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

        this._el = options.el;

        // 着色
        options.color = options.color || {};
        this._colorBackground = options.color.background || "#d6d6e4"; /*编辑器背景*/
        this._colorText = options.color.text || "#000"; /*普通文本颜色*/
        this._colorNumber = options.color.number || "#888484"; /*行号颜色*/
        this._colorEdit = options.color.edit || "#eaeaf1"; /*编辑行颜色*/

        // 文本
        this._contentArray = isString(options.content) ? (options.content + "").split("\n") : [""];

        // 着色方法
        this.$shader = isFunction(options.shader) ? options.shader : () => {
            let resultData = [];
            this._contentArray.forEach(text => { resultData.push([{ content: text, color: this._colorText }]); });
            return resultData;
        };

        // 格式化方法
        this.$format = isFunction(options.format) ? options.format : textString => textString;

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
    this.__formatData = this.$shader(this._contentArray.join('\n'));

    // 初始化视图
    this.$$initView();

    // 更新视图
    this.$$updateView();

    // 绑定操作
    this.$$bindEvent();

};

// 挂载辅助方法
wscode.prototype.$$textWidth = textWidth;

// 挂载核心方法

wscode.prototype.$$initDom = initDom;
wscode.prototype.$$initView = initView;

wscode.prototype.$$updateView = updateView;
wscode.prototype.$$updateCursorPosition = updateCursorPosition;

wscode.prototype.$$bindEvent = bindEvent;

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = wscode;
} else {
    window.WSCode = wscode;
}