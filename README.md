# 🎉 Web Studio Code - An Editor Used on the Browser Side.

<a href="https://yelloxing.github.io/npm-downloads/?interval=7&packages=wscode"><img src="https://img.shields.io/npm/dm/wscode.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/wscode"><img src="https://img.shields.io/npm/v/wscode.svg" alt="Version"></a>
<a href="https://github.com/yelloxing/Web-Studio-Code/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/wscode.svg" alt="License"></a>

## 如何使用

```js
import WSCode from 'wscode';

var wscode = new WSCode({
    // 编辑器挂载点
    el: document.getElementById('wscode'),

    // 初始化文本（可选）
    content:"字符串",

    // 文档解析模式（可选，默认普通文本）
    lang: 'css|html|js',

    // 设置颜色（可选）
    color: {
        normal : "#000", /*普通文本颜色*/
        key : "red", /*关键字颜色*/
        note : "#8BC34A", /*注释颜色*/
        variable: "#0a6893" /*变量颜色*/
    }
});
```

返回的wscode里面挂载着后续可控方法：

```js
// 格式化代码
wscode.format();
```

## 开源协议

[MIT](https://github.com/yelloxing/Web-Studio-Code/blob/master/LICENSE)

Copyright (c) 2020 走一步 再走一步
