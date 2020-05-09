import initView from './initView';
import updateView, { updateCursorPosition } from './updateView';

export default function (el, format, colors) {

    let handler = initView(el);

    let text = "", needUpdate = true;

    let update = () => {

        // 更新光标位置
        updateCursorPosition(handler.focus, handler.help, handler.focus[0].value);

        text += handler.focus[0].value;
        handler.focus[0].value = "";

        // 更新视图
        updateView(handler.content, format(text, colors));

    };

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

};