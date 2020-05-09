import xhtml from './xhtml';

export let updateCursorPosition = (focus, help, text) => {

    if (/^\n$/.test(text)) {

        let preTop = +focus.css('top').replace('px', '');
        focus.css('top', (preTop + 21) + "px");
        focus.css('left', "10px");

    } else {

        let preLeft = +focus.css('left').replace('px', '');

        help[0].innerText = text;
        let width = +xhtml.size(help[0]).width;

        focus.css('left', (preLeft + width) + "px");

    }

};

export default function (viewNode, texts) {

    let template = "";

    texts.forEach(line => {

        template += "<div style='line-height:21px;height:21px;'>";

        line.forEach(text => {

            template += "<span style='white-space: pre;color:" + text.color + "'>" + text.content + "</span>";

        });

        template += "</div>";

    });

    viewNode[0].innerHTML = template;
};