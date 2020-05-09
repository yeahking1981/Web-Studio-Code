// 普通文本切割

export default function (content, colors) {
    let resultData = [];

    (content || "").split(/\n/).forEach(text => {
        resultData.push([{
            type: "normal",
            content: text,
            color: colors.normal
        }]);
    });

    return resultData;

};