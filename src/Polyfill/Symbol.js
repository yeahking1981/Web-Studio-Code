if (!window.Symbol) {
    // 这里其实没有用到Symbol，只是为了兼容IE浏览器，因此没有提供真正的实现
    window.Symbol = function () {

        // 为了以防万一，添加错误提示
        console.error(`
[Web Studio Code] Symbol Unexpected!
------------------------------------------------------------------
https://github.com/yelloxing/Web-Studio-Code/issues

`);
    };
}