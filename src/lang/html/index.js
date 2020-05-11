import format from './format';
import { copyArray } from '../tool';

// html切割

export default function (textArray, colors, isFormat) {

    let text = textArray.join('\n');
    if (isFormat) {
        text = format(text);
        copyArray(textArray, text.split("\n"));
    }

    // 开始着色
    alert("html语言编辑器开发中");

};