import xhtml from '../xhtml';

// 更新编辑器内容视图

export function updateView() {

    let template = "";

    this.__formatData.forEach((line, index) => {

        let bgcolor = "";
        if (index == this.__lineNum) {
            bgcolor = "background-color:" + this._colorEdit;
        }

        template += "<div style='min-width: fit-content;white-space: nowrap;line-height:21px;height:21px;" + bgcolor + "'>";

        template += "<em style='color:" + this._colorNumber + ";user-select: none;display:inline-block;font-style:normal;width:35px;text-align:right;margin-right:5px;'>" + (index + 1) + "</em>";

        line.forEach(text => {

            let contentText = text.content;

            // 提前对特殊字符进行处理
            contentText = contentText.replace(/\&/g, "&amp;");/*[&]*/
            contentText = contentText.replace(/</g, "&lt;"); contentText = contentText.replace(/>/g, "&gt;");/*[<,>]*/

            template += "<span style='font-weight:600;white-space: pre;color:" + text.color + "'>" + contentText + "</span>";

        });

        template += "</div>";

    });

    this.__showDOM.innerHTML = template;

};

// 输入的时候更新光标位置

export function updateCursorPosition(text) {

    xhtml.css(this.__focusDOM, {
        top: (this.__lineNum * 21 + 10) + "px",
        left: (40 + this.$$textWidth(this._contentArray[this.__lineNum].substring(0, this.__leftNum))) + "px",
    });

};

