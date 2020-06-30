/**
 * 为了加速页面渲染，我们引入差异对比
 * 简单的理解就是：
 * 原本在数据改变的时候直接更新整个DOM的方式替换成只功能必要的DOM
 */

export default function (newFormatData) {

    /**
     * 思路：
     * 
     * 从开始匹配无法匹配的，位置记作begin
     * 再从结尾匹配无法匹配的，位置记作end
     * 只有begin和end之间的数据需要更新DOM
     * 
     * 当然，也有特殊情况，因此在进行回归前，先把特殊情况提取处理
     * 
     */

    let oldFormatData = this.__formatData;

    // 对比以后的差异信息
    this.__diff = {

    };

    return newFormatData;
};
