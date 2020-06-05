
// 合并内容

export function toShaderReult(words) {

    let resultData = [[]], lineNum = 0;

    words.forEach(word => {

        let codeArray = word.content.split(/\n/);

        resultData[lineNum].push({
            color: word.color,
            content: codeArray[0]
        });

        for (let index = 1; index < codeArray.length; index++) {
            lineNum += 1;
            resultData.push([]);

            resultData[lineNum].push({
                color: word.color,
                content: codeArray[index]
            });

        }

    });

    return resultData;
};

// 获取前置空格

export function getTabStringFactory(tabNumber) {

    let singleTab = "";
    for (let i = 0; i < tabNumber; i++) {
        singleTab += " ";
    }

    return function getTabString(num) {

        let temp = '';
        for (let j = 0; j < num; j++) {
            temp += singleTab;
        }

        return temp;

    };

};