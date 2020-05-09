import isElement from '@yelloxing/core.js/isElement';

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
        options.color.normal = options.color.normal || "#000"; /*普通文本颜色*/
        options.color.key = options.color.key || "red"; /*关键字颜色*/
        options.color.note = options.color.note || "#8BC34A"; /*注释颜色*/
        options.color.variable = options.color.variable || "#0a6893"; /*变量颜色*/

    } else {

        // 挂载点是必须的，一定要有
        throw new Error('options.el is not a element!');
    }

};