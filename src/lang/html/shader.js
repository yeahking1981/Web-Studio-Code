
import { toShaderReult } from '../tool';

import css_shader from '../css/shader';
import javascript_shader from '../javascript/shader';

export default function (textString, colors) {

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

        if (nextNValue(4) == '<!--') {

            initTemplate();
            while (nextNValue(3) !== '-->' && i < textString.length) {
                template += textString[i++];
            }

            shaderArray.push({
                color: colors.annotation,
                content: template + nextNValue(3)
            });
            i += 3;
            template = "";

        }

        /* 2.</ */

        else if (nextNValue(2) == '</') {

            initTemplate();
            shaderArray.push({
                color: colors.border,
                content: "</"
            });
            i += 2;

            while (nextNValue(1) !== '>' && i < textString.length) {
                template += textString[i++];
            }

            // 由于这里的template其实是闭合标签名称，如果有对应的开始标签，就需要对css和js这二类特殊内容进行处理

            if (template != "") {
                shaderArray.push({
                    color: colors.tag,
                    content: template
                });
                template = "";

                if (i < textString.length) {
                    shaderArray.push({
                        color: colors.border,
                        content: ">"
                    });
                    i += 1;
                }

            }
        }

        /* 3.< */

        else if (nextNValue(1) == '<' && nextNValue(2) != '< ') {

            initTemplate();
            shaderArray.push({
                color: colors.border,
                content: "<"
            });
            i += 1;

            // 寻找标签名称
            while (nextNValue(1) != '>' && nextNValue(1) != ' ' && i < textString.length) {
                template += textString[i++];
            }
            if (template != '') {
                shaderArray.push({
                    color: colors.tag,
                    content: template
                });

                template = '';
                if (i < textString.length) {

                    // 寻找标签属性
                    while (i < textString.length) {

                        // 遇到这个表示标签结束了
                        if (nextNValue(1) == ">") {

                            initTemplate();
                            shaderArray.push({
                                color: colors.border,
                                content: ">"
                            });
                            i += 1;
                            break;
                        }

                        else if (nextNValue(1) != ' ') {

                            initTemplate();

                            // 匹配属性名称
                            if (nextNValue(1) != '"' && nextNValue(1) != "'") {
                                while (nextNValue(1) != "=" && nextNValue(1) != '>' && i < textString.length) {
                                    template += textString[i++];
                                }
                                if (template != "") {
                                    shaderArray.push({
                                        color: colors.attr,
                                        content: template
                                    });
                                    template = "";

                                    if (nextNValue(1) == '=') {
                                        shaderArray.push({
                                            color: colors.text,
                                            content: "="
                                        });
                                        i += 1;

                                        if (i < textString.length && nextNValue(1) != " " && nextNValue(1) != '>') {

                                            let endStr = " ";
                                            if (nextNValue(1) == '"') endStr = '"';
                                            if (nextNValue(1) == "'") endStr = "'";

                                            do {
                                                template += textString[i++];
                                            } while (nextNValue(1) != endStr && i < textString.length);

                                            if (endStr != " " && i < textString.length) {
                                                template += endStr;
                                                i += 1;
                                            }

                                            shaderArray.push({
                                                color: colors.string,
                                                content: template
                                            });
                                            template = "";

                                        }
                                    }
                                }
                            }

                        } else {
                            template += textString[i++];
                        }

                    }

                }

            }

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

    return toShaderReult(shaderArray);

};