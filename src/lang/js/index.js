import format from './format';
import { copyArray } from '../tool';

// js切割

export default function (textArray, colors, isFormat) {

    // console.log(textArray);

    let text = textArray.join('\n');
    if (isFormat) {
        text = format(text);
        copyArray(textArray, text.split("\n"));
    }


    // 开始着色
    alert("js语言编辑器开发中");

};