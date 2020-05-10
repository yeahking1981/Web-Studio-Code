import isElement from '@yelloxing/core.js/isElement';
import isString from '@yelloxing/core.js/isString';

import normalSplit from './lang/normal';
import htmlSplit from './lang/html';
import cssSplit from './lang/css';
import jsSplit from './lang/js';

/**
 * 
 * 格式化配置
 * 
 * 所有的配置校验和默认值设置等都应该在这里进行
 * 经过这里处理以后，后续不需要再进行校验了
 * 因此这里的内容的更改一定要慎重
 * 
 */

export default function (options) {

    // 编辑器挂载点
    if (isElement(options.el)) {

        // 语言类型，默认纯文本
        options.format = {
            js: jsSplit,
            css: cssSplit,
            html: htmlSplit
        }[options.lang] || normalSplit;

        // 着色
        options.color = options.color || {};
        options.color.background = options.color.background || "#d6d6e4"; /*编辑器背景*/
        options.color.normal = options.color.normal || "#000"; /*普通文本颜色*/
        options.color.key = options.color.key || "#ec0b0b"; /*关键字颜色*/
        options.color.note = options.color.note || "#8BC34A"; /*注释颜色*/
        options.color.variable = options.color.variable || "#0a6893"; /*变量颜色*/
        options.color.lineNum = options.color.lineNum || "#888484"; /*行号颜色*/
        options.color.editLine = options.color.editLine || "#eaeaf1"; /*编辑行颜色*/

        if (isString(options.content)) {
            options.textArray = (options.content + "").split("\n");
        } else {
            options.textArray = [""];
        }

    } else {

        // 挂载点是必须的，一定要有
        throw new Error('options.el is not a element!');
    }

};