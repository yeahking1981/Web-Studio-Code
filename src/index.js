import formatOptions from './options';

let wscode = function (options) {

    // 格式化配置
    formatOptions(options);

    debugger

};

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = wscode;
}
else {
    window.wscode = wscode;
}