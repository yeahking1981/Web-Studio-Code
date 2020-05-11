import $$ from 'image2d';

export default {

    // 阻止冒泡
    "stopPropagation": function (event) {
        event = event || window.event;
        if (event.stopPropagation) { //这是其他非IE浏览器
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    // 阻止默认事件
    "preventDefault": function (event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

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
    },

    // 触发事件
    "trigger": function (dom, eventType) {
        let event;

        //创建event的对象实例。
        if (document.createEventObject) {
            // IE浏览器支持fireEvent方法
            event = document.createEventObject();
            dom.fireEvent('on' + eventType, event);
        }

        // 其他标准浏览器使用dispatchEvent方法
        else {
            event = document.createEvent('HTMLEvents');
            // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为
            event.initEvent(eventType, true, false);
            dom.dispatchEvent(event);
        }
    },

    // 文字宽
    "textWidth": function (help, text) {
        help[0].innerText = text;
        return +this.size(help[0]).width;
    }

};