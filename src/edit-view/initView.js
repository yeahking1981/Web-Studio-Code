import $$ from 'image2d';
import xhtml from './xhtml';

export default function (el, colors, lineNum, lineText) {

    let help = $$("<span></span>")
        .css({
            position: "absolute",
            "z-index": "-1",
            "white-space": "pre",
            "top": 0,
            "left": 0
        })
        .appendTo(el);

    help[0].innerText = lineText;
    let width = +xhtml.size(help[0]).width;

    // 添加输入光标
    let focus = $$('<textarea></textarea>')
        .attr({
            wrap: "off",
            autocorrect: "off",
            autocapitalize: "off",
            spellcheck: "false"
        })
        .css({
            position: "absolute",
            left: (10 + width) + "px",
            top: (10 + lineNum * 21) + "px",
            width: "20px",
            height: "21px",
            "line-height": "21px",
            resize: "none",
            overflow: "hidden",
            padding: "0",
            outline: "none",
            border: "none",
            background: "#ff000000",
            color: colors.normal
        })
        .appendTo(el);

    $$(el).css({
        "font-szie": "16px",
        position: "relative",
        cursor: "text",
        // 这里必须设置为等宽字体
        "font-family": "新宋体"
    }).bind('click', () => {
        focus[0].focus();
    });

    // 添加格式化文本显示区域
    let content = $$("<div></div>")
        .css({
            padding: "10px"
        })
        .appendTo(el);

    return {
        focus,
        content,
        help
    };

};