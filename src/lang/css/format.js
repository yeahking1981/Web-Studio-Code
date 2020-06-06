
import { getTabStringFactory } from '../tool';

export default function (textString, tabNumber, preNumber = 0) {

    let getTabString = getTabStringFactory(tabNumber);

    console.warn("[提醒] CSS格式化方法未提供！");

    return textString;

};