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

            template += "<span style='user-select: none;font-weight:" + this._fontWeight + ";white-space: pre;color:" + text.color + "'>" + contentText + "</span>";

        });

        template += "</div>";

    });

    this.__showDOM.innerHTML = template;

};

// 更新编辑器选中视图

export function updateSelectView() {

    let ctx = this.__selectCanvas.getContext('2d');
    ctx.fillStyle = this._colorSelect;
    ctx.clearRect(0, 0, this.__selectCanvas.scrollWidth, this.__selectCanvas.scrollHeight);

    // 绘制二个区间
    let drawerSelect = (beginLeftNum, endLeftNum, lineNum) => {

        let xy1 = this.$$calcCanvasXY(beginLeftNum, lineNum);
        let xy2 = this.$$calcCanvasXY(endLeftNum, lineNum);

        ctx.fillRect(xy1.x, xy1.y, xy2.x - xy1.x, 21);

    };

    // 如果选中区域为空，不用绘制
    if (this.__cursor1.lineNum == this.__cursor2.lineNum && this.__cursor1.leftNum == this.__cursor2.leftNum) return;

    ctx.beginPath();

    // 如果在一行
    if (this.__cursor1.lineNum == this.__cursor2.lineNum) {

        drawerSelect(this.__cursor1.leftNum, this.__cursor2.leftNum, this.__cursor1.lineNum);

    }

    // 如果选中的多于一行
    else {

        let beginCursor, endCursor;

        if (this.__cursor1.lineNum < this.__cursor2.lineNum) {
            beginCursor = this.__cursor1; endCursor = this.__cursor2;
        } else {
            beginCursor = this.__cursor2; endCursor = this.__cursor1;
        }

        // 绘制开始的结尾
        drawerSelect(beginCursor.leftNum, this._contentArray[beginCursor.lineNum].length, beginCursor.lineNum);

        // 绘制结束的开头
        drawerSelect(0, endCursor.leftNum, endCursor.lineNum);

        // 绘制两行之间
        for (let lineNum = beginCursor.lineNum + 1; lineNum < endCursor.lineNum; lineNum++) {
            drawerSelect(0, this._contentArray[lineNum].length, lineNum);
        }

    }

};

// 输入的时候更新光标位置

export function updateCursorPosition(text) {

    xhtml.css(this.__focusDOM, {
        top: (this.__lineNum * 21 + 10) + "px",
        left: (40 + this.$$textWidth(this._contentArray[this.__lineNum].substring(0, this.__leftNum))) + "px",
    });

};

