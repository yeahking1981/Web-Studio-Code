import $$ from 'image2d';

export default {

    // 获取元素大小
    "size": function (dom, type) {
        var elemHeight, elemWidth;
        if (type == 'content') {

            //内容
            let domObj = $$(dom);
            elemWidth = dom.clientWidth - ((domObj.css('padding-left') + "").replace('px', '')) - ((domObj.css('padding-right') + "").replace('px', ''));
            elemHeight = dom.clientHeight - ((domObj.css('padding-top') + "").replace('px', '')) - ((domObj.css('padding-bottom') + "").replace('px', ''));

        } else if (type == 'padding') {

            //内容+内边距
            elemWidth = dom.clientWidth;
            elemHeight = dom.clientHeight;

        } else if (type == 'border') {

            //内容+内边距+边框
            elemWidth = dom.offsetWidth;
            elemHeight = dom.offsetHeight;

        } else if (type == 'scroll') {

            //滚动的宽（不包括border）
            elemWidth = dom.scrollWidth;
            elemHeight = dom.scrollHeight;

        } else {
            elemWidth = dom.offsetWidth;
            elemHeight = dom.offsetHeight;
        }
        return {
            width: elemWidth,
            height: elemHeight
        };
    }

};