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

            template += "<span style='padding-right:10px;font-weight:600;white-space: pre;color:" + text.color + "'>" + text.content + "</span>";

        });

        template += "</div>";

    });

    this.__showDOM.innerHTML = template;

};

// 输入的时候更新光标位置

export function updateCursorPosition(text) {

    if (/^\n$/.test(text)) {

        // 如果是回车
        let preTop = +this.__focusDOM.style.top.replace('px', '');
        xhtml.css(this.__focusDOM, {
            top: (preTop + 21) + "px",
            left: "40px"
        });

    } else {

        let preLeft = +this.__focusDOM.style.left.replace('px', '');
        let width = this.$$textWidth(text);

        xhtml.css(this.__focusDOM, {
            left: (preLeft + width) + "px"
        });

    }

};