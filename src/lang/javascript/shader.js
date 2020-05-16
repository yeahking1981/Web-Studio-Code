export default function (textString, colors) {

    console.warn("[提醒] JavaScript着色方法未提供！");

    let resultData = [];
    textString.split('\n').forEach(text => { resultData.push([{ content: text, color: colors.text }]); });
    return resultData;

};