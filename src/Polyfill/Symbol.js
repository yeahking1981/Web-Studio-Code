if (!window.Symbol) {
    // 这里其实没有用到Symbol，只是为了兼容IE浏览器，因此没有提供真正的实现
    window.Symbol = function () { };
}