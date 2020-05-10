import initView from './initView';
import updateView, { updateCursorPosition } from './updateView';
import keyString from '@yelloxing/core.js/tools/keyString';
import $$ from 'image2d';
import xhtml from './xhtml';

export default function (el, format, colors, textArray) {

    let needUpdate = true, lineNum = textArray.length - 1, leftNum = textArray[textArray.length - 1].length;

    let handler = initView(el, colors, lineNum, textArray[textArray.length - 1]);
    handler.focus[0].focus();

    let preFormatData = [];

    let update = () => {

        let text = handler.focus[0].value;
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
        preFormatData = format(text, colors, true);
        updateView(handler.content, preFormatData, colors, lineNum);

    });

    handler.focus.bind('compositionstart', () => {
        needUpdate = false;
    });

    handler.focus.bind('compositionend', () => {
        needUpdate = true;
        update();
    });

    handler.focus.bind('input', () => {
        if (!needUpdate) return;
        update();
    });

    // 处理键盘控制
    $$(el).bind('keydown', event => {
        console.log(keyString(event));

        switch (keyString(event)) {

            case "up": {
                if (lineNum <= 0) return;
                lineNum -= 1;
                leftNum = textArray[lineNum].length;
                handler.focus.css({
                    left: (40 + xhtml.textWidth(handler.help, textArray[lineNum])) + "px",
                    top: (10 + lineNum * 21) + "px",
                });
                updateView(handler.content, preFormatData, colors, lineNum);
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

                // 更新视图
                preFormatData = format(textArray.join('\n'), colors);
                updateView(handler.content, preFormatData, colors, lineNum);

                break;
            }

        }

    });

    return handler;
};