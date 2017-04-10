/*
 返回 function 函数的防反跳版本, 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 毫秒之后.
 对于必须在一些输入（多是一些用户操作）停止到达之后执行的行为有帮助。
 例如: 渲染一个Markdown格式的评论预览, 当窗口停止改变大小之后重新计算布局, 等等.

 传参 immediate 为 true， debounce会在 wait 时间间隔的开始调用这个函数 。
（并且在 waite 的时间之内，不会再次调用。）
 在类似不小心点了提交按钮两下而提交了两次的情况下很有用。

 var lazyLayout = debounce(calculateLayout, 300);
 $(window).resize(lazyLayout);

 */

//1 防止wait期间函数被多次调用,wait期间函数只被调用1次
//2 immediate=true,函数立即被调用,wait期间调用被阻止;(手动调用cancel,下次函数立即被调用);
//第一种情况:resize的时候,wait期间阻止回调被立即执行过多的次数,但是会有延时调用;
//第二种情况: 可以阻止wait时间内,按钮被多次点击,立即执行多次的情况
function debounce(func,wait,immediate) {
    var timeout, result;
    var debounced = function () {
        if (timeout) clearTimeout(timeout);
        /*
         1 第一次立即执行,并开始计时
         2 在wait期间内禁止调用
         3 超过wait后的调用立即执行,并开始计时
         4 最后一次如果在wait期间的话并不会被执行
         */
        if (immediate) {
            var callNow = !timeout;

            timeout = setTimeout(function () {
                timeout = null;
            }, wait);

            if (callNow) result = func.apply(this, arguments);
        } else {
            /*
             1 在wait期间每次调用都会被新的调用覆盖
             2 wait结束后调用
             3 在下一次调用时开始计时
             4 最后一次肯定被调用,只不过不是立即执行的需要,延迟wait
             */
            timeout = setTimeout(function () {
                result = func.apply(this, arguments);
                timeout = null;
            }, wait);
        }
        return result;
    };

    //立即结束
    debounced.cancel = function () {
        clearInterval(timeout);
        timeout = null;
    };

    return debounced;
}


//var df = debounce(function(a){
//    console.log(a);
//},3000,true);
//df(1);
//df(2);
//
//setTimeout(function(){
//    df(3);
//},4000);