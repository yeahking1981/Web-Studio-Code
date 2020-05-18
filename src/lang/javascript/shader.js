
import { toShaderReult } from '../tool';

export default function (textString, colors, notToResult) {

    let shaderArray = [];

    // 当前面对的
    let i = 0;

    // 获取往后n个值
    let nextNValue = function (n) {
        return textString.substring(i, n + i > textString.length ? textString.length : n + i);
    };

    let template = "";

    // 初始化模板，开始文本捕获
    let initTemplate = function () {
        if (template != "") {
            shaderArray.push({
                color: colors.text,
                content: template
            });
        }

        template = "";
    };

    while (true) {

        /* 1.注释 */

        if (nextNValue(2) == '/*') {

            initTemplate();
            while (nextNValue(2) !== '*/' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(2)
            });
            i += 2;
            template = "";

        }

        /* 2.字符串 */

        else if (["'", '"', '`'].indexOf(nextNValue(1)) > -1) {

            let strBorder = nextNValue(1);
            initTemplate();
            do {
                template += textString[i++];
            } while (nextNValue(1) != strBorder && i < textString.length)

            shaderArray.push({
                color: colors.string,
                content: template + strBorder
            });
            i += 1;
            template = "";

        }

        /* 追加字符 */

        else {
            if (i >= textString.length) {
                initTemplate();
                break;
            } else {
                template += textString[i++];
            }
        }

    }

    return notToResult ? shaderArray : toShaderReult(shaderArray);

};