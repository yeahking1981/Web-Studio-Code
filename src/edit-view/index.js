import initView from './initView';
import updateView, { updateCursorPosition } from './updateView';
import keyString from '@yelloxing/core.js/tools/keyString';
import $$ from 'image2d';
import xhtml from './xhtml';

export default function (el, format, colors, textArray) {

    let needUpdate = true, lineNum = textArray.length - 1, leftNum = textArray[textArray.length - 1].length;

    // 初始化视图
    // 包括必备的光标，输入，显示等dom钩子
    let handler = initView(el, colors);

    // 初始化定位光标位置
    handler.focus.css({
        left: (40 + xhtml.textWidth(handler.help, textArray[textArray.length - 1])) + "px",
        top: (10 + lineNum * 21) + "px",
    });

    // 输入框聚焦
    handler.focus[0].focus();

    // 记录着色结果
    let preFormatData = [];

    let update = (text) => {

        text = text || handler.focus[0].value;
        handler.focus[0].value = "";

        // 更新光标位置
        updateCursorPosition(handler.focus, handler.help, text);

        if (/^\n$/.test(text)) {
            if (leftNum >= textArray[lineNum].length) {
                textArray.splice(lineNum + 1, 0, "");
            } else {
                textArray.splice(lineNum + 1, 0, textArray[lineNum].substring(leftNum));
                textArray[lineNum] = textArray[lineNum].substring(0, leftNum);
            }
            lineNum += 1;
            leftNum = 0;

        } else {
            textArray[lineNum] = textArray[lineNum].substring(0, leftNum) + text + textArray[lineNum].substring(leftNum);
            leftNum += text.length;
        }

        // 更新视图
        preFormatData = format(textArray.join('\n'), colors);
        updateView(handler.content, preFormatData, colors, lineNum);

    };

    update();

    handler.focus.bind('format', () => {

        // 更新视图
        preFormatData = format(textArray.join('\n'), colors, true);
        updateView(handler.content, preFormatData, colors, lineNum);

    });

    // 中文输入开始
    handler.focus.bind('compositionstart', () => {
        needUpdate = false;
    });

    // 中文输入结束
    handler.focus.bind('compositionend', () => {
        needUpdate = true;
        update();
    });

    // 输入
    handler.focus.bind('input', () => {

        // 如果是中文输入开始，不应该更新
        if (!needUpdate) return;
        update();
    });

    // 处理键盘控制
    $$(el).bind('keydown', event => {
        // console.log(keyString(event));

        switch (keyString(event)) {

            case "tab": {

                // tab用来控制输入多个空格，默认事件需要禁止
                xhtml.stopPropagation(event);
                xhtml.preventDefault(event);

                // 四个空格
                update("    ");

                break;
            }

            case "up": {

                // 如果是第一行不需要任何处理
                if (lineNum <= 0) return;

                // 向上一行回退
                lineNum -= 1;
                leftNum = textArray[lineNum].length;

                // 光标聚焦在改行结尾
                handler.focus.css({
                    left: (40 + xhtml.textWidth(handler.help, textArray[lineNum])) + "px",
                    top: (10 + lineNum * 21) + "px",
                });

                // 更新编辑行背景
                updateView(handler.content, preFormatData, colors, lineNum);

                el.scrollTop -= 21;

                break;
            }
            case "down": {
                if (lineNum >= textArray.length - 1) return;
                lineNum += 1;
                leftNum = textArray[lineNum].length;
                handler.focus.css({
                    left: (40 + xhtml.textWidth(handler.help, textArray[lineNum])) + "px",
                    top: (10 + lineNum * 21) + "px",
                });
                updateView(handler.content, preFormatData, colors, lineNum);

                el.scrollTop += 21;
                break;
            }
            case "left": {
                if (leftNum <= 0) return;
                leftNum -= 1;
                let leftP = handler.focus.css('left').replace('px', '') - xhtml.textWidth(handler.help, textArray[lineNum][leftNum]);
                handler.focus.css('left', leftP + "px");
                break;
            }
            case "right": {
                if (leftNum >= textArray[lineNum].length) return;
                leftNum += 1;
                let leftP = handler.focus.css('left').replace('px', '') - -xhtml.textWidth(handler.help, textArray[lineNum][leftNum - 1]);
                handler.focus.css('left', leftP + "px");
                break;
            }
            case "backspace": {
                if (leftNum <= 0) {
                    if (lineNum <= 0) return;
                    // 一行的结尾应该删除本行
                    textArray.splice(lineNum, 1);

                    lineNum -= 1;
                    leftNum = textArray[lineNum].length;
                    handler.focus.css({
                        left: (40 + xhtml.textWidth(handler.help, textArray[lineNum])) + "px",
                        top: (10 + lineNum * 21) + "px",
                    });

                } else {
                    leftNum -= 1;
                    let leftP = handler.focus.css('left').replace('px', '') - xhtml.textWidth(handler.help, textArray[lineNum][leftNum]);
                    handler.focus.css('left', leftP + "px");
                    textArray[lineNum] = textArray[lineNum].substring(0, leftNum) + textArray[lineNum].substring(leftNum + 1);
                }

                // 由于内容改变，需要重新调用着色
                preFormatData = format(textArray.join('\n'), colors);

                // 更新视图
                updateView(handler.content, preFormatData, colors, lineNum);

                break;
            }

        }

    });

    return handler;
};