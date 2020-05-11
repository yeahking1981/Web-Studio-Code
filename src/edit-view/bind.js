import keyString from '@yelloxing/core.js/tools/keyString';
import xhtml from '../xhtml';

// 绑定键盘和鼠标等交互事件处理

export default function () {

    // 点击编辑界面
    xhtml.bind(this._el, 'click', event => {

    });

    let update = text => {

        // 获取输入内容
        text = text || this.__focusDOM.value;
        this.__focusDOM.value = "";

        // 更新光标位置
        this.$$updateCursorPosition(text);

        if (/^\n$/.test(text)) {

            if (this.__leftNum >= this._contentArray[this.__lineNum].length) {
                this._contentArray.splice(this.__lineNum + 1, 0, "");
            } else {
                this._contentArray.splice(this.__lineNum + 1, 0, this._contentArray[this.__lineNum].substring(this.__leftNum));
                this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum);
            }
            this.__lineNum += 1;
            this.__leftNum = 0;

        } else {
            this._contentArray[this.__lineNum] = this._contentArray[this.__lineNum].substring(0, this.__leftNum) + text + this._contentArray[this.__lineNum].substring(this.__leftNum);
            this.__leftNum += text.length;
        }

        // 着色并更新视图

        this.__formatData = this.$shader(this._contentArray.join('\n'));
        this.$$updateView();

    };

    // 中文输入开始
    xhtml.bind(this.__focusDOM, 'compositionstart', () => {
        this.__needUpdate = false;
    });

    // 中文输入结束
    xhtml.bind(this.__focusDOM, 'compositionend', () => {
        this.__needUpdate = true;
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

            

        }

    });

};