import xhtml from './xhtml';

// 输入的时候更新光标位置
export let updateCursorPosition = (focus, help, text) => {

    if (/^\n$/.test(text)) {

        let preTop = +focus.css('top').replace('px', '');
        focus.css('top', (preTop + 21) + "px");
        focus.css('left', "40px");

    } else {

        let preLeft = +focus.css('left').replace('px', '');
        let width = xhtml.textWidth(help, text);

        focus.css('left', (preLeft + width) + "px");

    }

};

export default function (viewNode, texts, colors, lineNum) {

    let template = "";

    texts.forEach((line, index) => {

        let bgcolor = "";
        if (index == lineNum) {
            bgcolor = "background-color:" + colors.editLine;
        }

        template += "<div style='min-width: fit-content;white-space: nowrap;line-height:21px;height:21px;" + bgcolor + "'>";

        template += "<em style='color:" + colors.lineNum + ";user-select: none;display:inline-block;font-style:normal;width:35px;text-align:right;margin-right:5px;'>" + (index + 1) + "</em>";

        line.forEach(text => {

            template += "<span style='padding-right:10px;font-weight:600;white-space: pre;color:" + text.color + "'>" + text.content + "</span>";

        });

        template += "</div>";

    });

    viewNode[0].innerHTML = template;
};