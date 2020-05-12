import xhtml from '../xhtml';

// 初始化结点

export function initDom() {

    xhtml.css(this._el, {
        "font-size": "12px",
        position: "relative",
        cursor: "text",
        "font-family": "新宋体",/*这里必须设置为等宽字体*/
        "background": this._colorBackground,
        overflow: "auto"
    });

    xhtml.bind(this._el, 'click', () => {
        this.__focusDOM.focus();
    })

    // 辅助标签
    this.__helpDOM = xhtml.appendTo(this._el, "<span></span>");

    xhtml.css(this.__helpDOM, {
        position: "absolute",
        "z-index": "-1",
        "white-space": "pre",
        "top": 0,
        "left": 0,
        "font-weight": 600
    });

    // 光标
    this.__focusDOM = xhtml.appendTo(this._el, "<textarea></textarea>");

    xhtml.css(this.__focusDOM, {
        position: "absolute",
        width: "6px",
        height: "21px",
        "line-height": "21px",
        resize: "none",
        overflow: "hidden",
        padding: "0",
        outline: "none",
        border: "none",
        background: "#0000",
        color: this._colorText
    });

    xhtml.attr(this.__focusDOM, {
        wrap: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false"
    });

    // 显示区域
    this.__showDOM = xhtml.appendTo(this._el, "<div></div>");

    xhtml.css(this.__showDOM, {
        padding: "10px 0"
    });
};

// 初始化视图

export function initView() {

    // 初始化定位光标位置
    xhtml.css(this.__focusDOM, {
        left: (40 + this.$$textWidth(this._contentArray[this.__lineNum])) + "px",
        top: (10 + this.__lineNum * 21) + "px"
    });
    this.__focusDOM.focus();

};