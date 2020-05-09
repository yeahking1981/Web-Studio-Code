import $$ from 'image2d';

export default function (el) {

    $$(el).css({
        "font-szie": "16px",
        position: "relative"
    });

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
            left: "10px",
            top: "10px",
            width: "20px",
            height: "16px",
            resize: "none",
            overflow: "hidden",
            padding: "0",
            outline: "none",
            border: "none",
            background: "#ff000000"
        })
        .appendTo(el);

    // 添加格式化文本显示区域
    let content = $$("<div></div>")
        .css({
            padding: "10px"
        })
        .appendTo(el);

    return {
        focus,
        content
    };

};