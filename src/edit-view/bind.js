import keyString from '@yelloxing/core.js/tools/keyString';
import xhtml from '../xhtml';

// 绑定键盘和鼠标等交互事件处理

export default function () {

    // 点击编辑界面
    xhtml.bind(this._el, 'click', event => {

        let position = xhtml.position(this._el, event);
        let topIndex = Math.round((position.y - 20.5) / 21);

        // 如果超过了内容区域
        if (topIndex < 0 || topIndex >= this._contentArray.length) return;

        this.__lineNum = topIndex;
        this.__leftNum = this.$$bestLeftNum(position.x);

        this.$$updateCursorPosition();
        this.$$updateView();
    });

    let update = text => {

        // 获取输入内容
        text = text || this.__focusDOM.value;

        this.__focusDOM.value = "";

        // 如果输入的是回车，切割文本
        if (/^\n$/.test(text)) {

            if (this.__leftNum >= this._contentArray[this.__lineNum].length) {
                this._contentArray.splice(this.__lineNum + 1, 0, "");
            } else {
                this._contentArray.splice(this.__lineNum + 1, 0, this._contentArray[this.__lineNum].substring(this.__leftNum));
                this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum);
            }
            this.__lineNum += 1;
            this.__leftNum = 0;

        }

        // 否则就是一堆文本（包括复制来的）
        else {

            let textArray = text.split(/\n/);

            // 如果只有一行文本(分开是为了加速)
            if (textArray.length <= 1) {
                this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum) + text + this._contentArray[this.__lineNum].substring(this.__leftNum);
                this.__leftNum += text.length;
            }

            // 如果是复制的多行文本
            else {

                // 需要切割的行两边文本
                let leftText = this._contentArray[this.__lineNum].substring(0, this.__leftNum);
                let rightText = this._contentArray[this.__lineNum].substring(this.__leftNum);

                // 旧行文本拼接进来
                textArray[0] = leftText + textArray[0];
                textArray[textArray.length - 1] += rightText;

                // 新内容记录下来
                this._contentArray.splice(this.__lineNum, 1, ...textArray);

                this.__lineNum += (textArray.length - 1);
                this.__leftNum = textArray[textArray.length - 1].length - rightText.length;

            }

        }

        // 着色并更新视图

        this.__formatData = this.$shader(this._contentArray.join('\n'));
        this.$$updateCursorPosition();
        this.$$updateView();

    };

    // 中文输入开始
    xhtml.bind(this.__focusDOM, 'compositionstart', () => {
        this.__needUpdate = false;
        this.__focusDOM.style.color = "rgba(0,0,0,0)";
        this.__focusDOM.style.borderLeft = '1px solid ' + this._colorCursor;
    });

    // 中文输入结束
    xhtml.bind(this.__focusDOM, 'compositionend', () => {
        this.__needUpdate = true;
        this.__focusDOM.style.color = this._colorCursor;
        this.__focusDOM.style.borderLeft = "none";
        update();
    });

    // 输入
    xhtml.bind(this.__focusDOM, 'input', () => {
        // 如果是中文输入开始，不应该更新
        if (this.__needUpdate) update();
    });

    // 处理键盘控制
    xhtml.bind(this._el, 'keydown', event => {

        //  console.log(keyString(event));

        switch (keyString(event)) {

            case "tab": {

                // tab用来控制输入多个空格，默认事件需要禁止
                xhtml.stopPropagation(event);
                xhtml.preventDefault(event);

                // 计算空格
                let blanks = "";
                for (let i = 0; i < this._tabSpace; i++) blanks += " ";

                update(blanks);

                break;
            }

            case "up": {

                // 如果是第一行不需要任何处理
                if (this.__lineNum <= 0) return;

                this.__leftNum = this.$$bestLeftNum(this.$$textWidth("", true) + 40);

                // 向上一行
                this.__lineNum -= 1;

                this.$$updateCursorPosition();
                this.$$updateView();

                this._el.scrollTop -= 21;

                break;
            }

            case "down": {

                if (this.__lineNum >= this._contentArray.length - 1) return;

                this.__leftNum = this.$$bestLeftNum(this.$$textWidth("", true) + 40);

                // 向下一行
                this.__lineNum += 1;

                this.$$updateCursorPosition();
                this.$$updateView();

                this._el.scrollTop += 21;

                break;
            }

            case "left": {

                if (this.__leftNum <= 0) {
                    if (this.__lineNum <= 0) return;
                    this.__lineNum -= 1;
                    this.__leftNum = this._contentArray[this.__lineNum].length;
                } else {
                    this.__leftNum -= 1;
                }

                this.$$updateCursorPosition();

                break;
            }

            case "right": {

                if (this.__leftNum >= this._contentArray[this.__lineNum].length) {
                    if (this.__lineNum >= this._contentArray.length - 1) return;
                    this.__lineNum += 1;
                    this.__leftNum = 0;
                } else {
                    this.__leftNum += 1;
                }

                this.$$updateCursorPosition();

                break;
            }

            case "backspace": {

                if (this.__leftNum <= 0) {
                    if (this.__lineNum <= 0) return;

                    this.__lineNum -= 1;
                    this.__leftNum = this._contentArray[this.__lineNum].length;

                    // 一行的开头应该删除本行（合并到前一行）
                    this._contentArray[this.__lineNum] += this._contentArray[this.__lineNum + 1];
                    this._contentArray.splice(this.__lineNum + 1, 1);

                } else {
                    this.__leftNum -= 1;
                    this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum) + this._contentArray[this.__lineNum].substring(this.__leftNum + 1);
                }

                // 由于内容改变，需要重新调用着色
                this.__formatData = this.$shader(this._contentArray.join('\n'));

                // 更新视图
                this.$$updateCursorPosition();
                this.$$updateView();

                break;
            }
        }

    });

};