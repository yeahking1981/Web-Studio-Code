import format from './format';
import { copyArray } from '../tool';
import dictionary from './dictionary';

// js切割

export default function (textArray, colors, isFormat) {

    // console.log(textArray);

    let text = textArray.join('\n');
    if (isFormat) {
        text = format(text);
        copyArray(textArray, text.split("\n"));
    }

    // 开始着色

    // console.log(dictionary);

    let resultData = [[]], lineNum = 0;

    // 是否匹配字符串结尾，配置类型
    let isString = false, stringType;



    return resultData;
};