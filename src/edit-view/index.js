import initView from './initView';
import updateView from './updateView';

export default function (el, format, colors) {

    let handler = initView(el);

    let text = "", needUpdate = true;

    let update = () => {

        text += handler.focus[0].value;
        handler.focus[0].value = "";

        // 更新视图11
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