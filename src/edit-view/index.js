import initView from './initView';
import updateView, { updateCursorPosition } from './updateView';
import keyString from '@yelloxing/core.js/tools/keyString';
import $$ from 'image2d';

export default function (el, format, colors, textArray) {

    let needUpdate = true, lineNum = textArray.length - 1, leftNum = textArray[textArray.length - 1].length;

    let handler = initView(el, colors, lineNum, textArray[textArray.length - 1]);
    handler.focus[0].focus();

    let update = () => {

        let text = handler.focus[0].value;
        handler.focus[0].value = "";

        // 更新光标位置
        updateCursorPosition(handler.focus, handler.help, text);

        if (/^\n$/.test(text)) {
            lineNum += 1;
            textArray.splice(lineNum, 0, "");
        } else {
            textArray[lineNum] += text;
        }

        // 更新视图
        updateView(handler.content, format(textArray.join('\n'), colors));

    };

    update();

    handler.focus.bind('format', () => {

        // 更新视图
        updateView(handler.content, format(text, colors, true));

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



        }

    });

    return handler;
};