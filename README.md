# 🎉 Web Studio Code - An Editor Used on the Browser Side.

<a href="https://yelloxing.github.io/npm-downloads/?interval=7&packages=wscode"><img src="https://img.shields.io/npm/dm/wscode.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/wscode"><img src="https://img.shields.io/npm/v/wscode.svg" alt="Version"></a>
<a href="https://github.com/yelloxing/Web-Studio-Code/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/wscode.svg" alt="License"></a>

<p align="center"><a href="https://yelloxing.github.io/Web-Studio-Code/Web-Studio-Code.html" target="_blank" rel="noopener noreferrer">
<img width="400" src="https://yelloxing.github.io/Web-Studio-Code/snipping.png" alt="Web Studio Code"></a></p>

## 如何使用

```js
import WSCode from 'wscode';

var wscode = new WSCode({

    // 编辑器挂载点(必选)
    el: document.getElementById('wscode'),

    // 初始化文本（可选）
    content:"初始化文本内容",

    // 编辑器字体（可选，默认"新宋体"）
    "font-family": string,

    // 编辑器字重（可选，默认600）
    "font-weight": number,

    // 着色方法（可选，默认不特殊着色）
    shader:function(textString, colors){
        return [
            [{
                content:"内容",
                color:"文字颜色"
            },
            ...],
            ...
        ];
    },

    // 格式化方法（可选）
    format:function(textString){
        return "格式化后的文本";
    },

    // 设置颜色（可选）
    color: {
        background:"#d6d6e4", /*编辑器背景*/
        text : "#000000", /*文本颜色*/
        number:"#888484", /*行号颜色*/
        edit:"#eaeaf1", /*编辑行背景色*/
        cursor:"#ff0000", /*光标颜色*/
    },

    // 设置一个tab表示多少个空格（可选，默认4）
    tabSpace:number,

    // 除了通过传递shader和format的方式实现着色和格式化外
    // 你还可以使用内置提供的语言来实现
    // （特别提醒：shader和format的优先级均高于这里）
    lang:{

        // 目前支持的语言
        type:'html'|'css'|'javascript',
        color:{
            
        }
    }

});
```

返回的wscode里面挂载着后续可控方法：

- 格式化代码

```js
wscode.format();
```

- 获取当前编辑器代码

```js
wscode.valueOf();
```

## 开源协议

[MIT](https://github.com/yelloxing/Web-Studio-Code/blob/master/LICENSE)

Copyright (c) 2020 走一步 再走一步
