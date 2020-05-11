import $$ from 'image2d';
import xhtml from './xhtml';

export default function (el, colors, lineNum, lineText) {

    let help = $$("<span></span>")
        .css({
            position: "absolute",
            "z-index": "-1",
            "white-space": "pre",
            "top": 0,
            "left": 0,
            "font-weight": 600
        })
        .appendTo(el);

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
        "font-size": "12px",
        position: "relative",
        cursor: "text",
        // 这里必须设置为等宽字体
        "font-family": "新宋体",
        "background": colors.background
    }).bind('click', () => {
        focus[0].focus();
    });

    // 添加格式化文本显示区域
    let content = $$("<div></div>")
        .css({
            padding: "10px 0"
        })
        .appendTo(el);

    return {
        focus,
        content,
        help
    };

};