// 普通文本切割

export default function (content, colors) {

    let resultData = [];

    content.forEach(text => {

        // 因为的普通文本，直接一行一个单元即可
        resultData.push([{

            // 全部都是normal普通文本标志
            type: "normal",
            content: text,
            color: colors.normal
        }]);

    });

    return resultData;

};