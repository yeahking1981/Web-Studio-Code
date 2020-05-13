
// 计算文字长度

export function textWidth(text) {
    this.__helpDOM.innerText = text;
    return this.__helpDOM.offsetWidth;
};

// 计算最佳光标左边位置

export function bestLeftNum(x) {

    let text = this._contentArray[this.__lineNum];

    if (x <= 40) return 0;
    if (x - 40 >= this.$$textWidth(text)) return text.length;

    let dist = x - 40, i = 1;

    for (; i < text.length; i++) {

        let tempDist = Math.abs(x - 40 - this.$$textWidth(text.substr(0, i)));

        if (tempDist > dist) break;

        dist = tempDist;

    }

    return i - 1;
};