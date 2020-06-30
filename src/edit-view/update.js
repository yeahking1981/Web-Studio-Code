import xhtml from '../xhtml';

// 更新编辑器内容视图

export function updateView() {

    if (this.__diff == "not update") return;
    this.__diff = "not update";

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

export function updateCursorPosition() {

    xhtml.css(this.__focusDOM, {
        top: (this.__lineNum * 21 + 10) + "px",
        left: (40 + this.$$textWidth(this._contentArray[this.__lineNum].substring(0, this.__leftNum))) + "px",
    });

};

// 更新画布尺寸

export function updateCanvasSize(width, height) {

    if (arguments.length < 2) {
        width = this._el.scrollWidth - 40;
        height = this._el.scrollHeight - 10;
    }

    xhtml.css(this.__selectCanvas, {
        width: width + "px",
        height: height + "px",
    });

    xhtml.attr(this.__selectCanvas, {
        width,
        height
    });

};

// 取消选区

export function cancelSelect() {

    this.$$updateCanvasSize(1, 1);
    this.__cursor1 = { leftNum: 0, lineNum: 0 };
    this.__cursor2 = { leftNum: 0, lineNum: 0 };

};

// 删除选区

export function deleteSelect() {

    // 假定cursor2是结束光标
    let beginCursor = this.__cursor2, endCursor = this.__cursor1;

    // 根据行号来校对
    if (this.__cursor1.lineNum < this.__cursor2.lineNum) {
        beginCursor = this.__cursor1; endCursor = this.__cursor2;
    } else if (this.__cursor1.lineNum == this.__cursor2.lineNum) {

        // 根据列号来校对
        if (this.__cursor1.leftNum < this.__cursor2.leftNum) {
            beginCursor = this.__cursor1; endCursor = this.__cursor2;
        }
    }

    let newLineText =
        this._contentArray[beginCursor.lineNum].substr(0, beginCursor.leftNum) +
        this._contentArray[endCursor.lineNum].substr(endCursor.leftNum)

    this._contentArray.splice(beginCursor.lineNum, endCursor.lineNum - beginCursor.lineNum + 1, newLineText);

    // 校对光标和选区
    this.__leftNum = this.__cursor1.leftNum = this.__cursor2.leftNum = beginCursor.leftNum;
    this.__lineNum = this.__cursor1.lineNum = this.__cursor2.lineNum = beginCursor.lineNum;

    this.$$cancelSelect();
};