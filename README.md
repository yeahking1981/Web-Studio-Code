<p align="center"><a href="https://github.com/yelloxing/Web-Studio-Code" target="_blank" rel="noopener noreferrer">
<img width="400" src="https://yelloxing.github.io/Web-Studio-Code/logo.png" alt="Web Studio Code"></a></p>

# 🎉 Web Studio Code - An Editor Used on the Browser Side.

<p align="center">
<a href="https://yelloxing.github.io/npm-downloads/?interval=7&packages=wscode"><img src="https://img.shields.io/npm/dm/wscode.svg" alt="Downloads"></a>
<a href="https://packagephobia.now.sh/result?p=wscode"><img src="https://packagephobia.now.sh/badge?p=wscode" alt="install size"></a>
<a href="https://www.jsdelivr.com/package/npm/wscode"><img src="https://data.jsdelivr.com/v1/package/npm/wscode/badge" alt="CDN"></a>
<a href="https://www.npmjs.com/package/wscode"><img src="https://img.shields.io/npm/v/wscode.svg" alt="Version"></a>
<a href="https://github.com/yelloxing/Web-Studio-Code/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/wscode.svg" alt="License"></a>
</p>

<p align="center"><a href="https://yelloxing.github.io/Web-Studio-Code/Web-Studio-Code.html" target="_blank" rel="noopener noreferrer">
<img width="700" src="https://yelloxing.github.io/Web-Studio-Code/snipping.png" alt="Web Studio Code"></a></p>

> 温馨提示：使用过程中，你可以查看 [版本历史](./CHANGELOG) 来了解是否需要升级！

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
        select:"#6c6cf155", /*选择背景*/
    },

    // 设置一个tab表示多少个空格（可选，默认4）
    tabSpace:number,

    // 除了通过传递shader和format的方式实现着色和格式化外
    // 你还可以使用内置提供的语言来实现
    // 【特别提醒：shader和format的优先级均高于这里】
    // (可选)
    lang:{

        // 设置语言类型(默认值"normal"，表示普通文本，无特殊处理)
        type:'normal|html|css|javascript',
        // 配置更细节的着色（可选）
        color:{

            /**
             * 1.html着色配置
            */
            "annotation": "#6a9955",/*注释颜色*/
            "border": "#ffffff",/*边界颜色*/
            "tag": "#1e50b3",/*结点颜色*/
            "attr": "#1e83b1",/*属性颜色*/
            "string": "#ac4c1e",/*字符串颜色*/

            /**
             * 2.css着色配置
            */
            "annotation": "#6a9955",/*注释颜色*/

            /**
             * 3.javascript着色配置
            */
            "annotation": "#6a9955",/*注释颜色*/

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
