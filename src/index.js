import formatOptions from './options';
import renderView from './edit-view/index';

let wscode = function (options) {

    // 格式化配置
    formatOptions(options);

    // 启动
    renderView(options.el, options.format, options.color);

};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = wscode;
} else {
    window.wscode = wscode;
}