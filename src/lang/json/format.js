export default function (textString,tabNumber) {

    return JSON.stringify(JSON.parse(textString), null, tabNumber);

};