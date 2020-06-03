
// 温馨提示：只支持标准的JSON格式化

export default function (textString, tabNumber) {

    return JSON.stringify(JSON.parse(textString), null, tabNumber);

};