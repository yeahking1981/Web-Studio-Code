import formatOptions from './options';
import renderView from './edit-view/index';
import xhtml from './edit-view/xhtml';

let wscode = function (options) {

    // 格式化配置
    formatOptions(options);

    // 启动
    let handler = renderView(options.el, options.format, options.color, options.textArray);

    this.format = () => {

        xhtml.trigger(handler.focus[0], 'format');

    };

    this.valueOf = () => {

        return options.textArray.join('\n');

    };

};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = wscode;
} else {
    window.WSCode = wscode;
}