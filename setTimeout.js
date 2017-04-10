/*\
 |*|
 |*|  IE-specific polyfill which enables the passage of arbitrary arguments to the
 |*|  callback functions of javascript timers (HTML5 standard syntax).
 |*|
 |*|  https://developer.mozilla.org/en-US/docs/DOM/window.setInterval
 |*|
 |*|  Syntax:
 |*|  var timeoutID = window.setTimeout(func, delay, [param1, param2, ...]);
 |*|  var timeoutID = window.setTimeout(code, delay);
 |*|  var intervalID = window.setInterval(func, delay[, param1, param2, ...]);
 |*|  var intervalID = window.setInterval(code, delay);
 |*|
 \*/

/*
 说明:

 timeoutID 是该延时操作的数字ID, 此ID随后可以用来作为window.clearTimeout方法的参数.

 func 是你想要在delay毫秒之后执行的函数.

 code 在第二种语法,是指你想要在delay毫秒之后执行的代码字符串 (使用该语法是不推荐的, 不推荐的原因和eval()一样)

 delay 是延迟的毫秒数 (一秒等于1000毫秒)，函数的调用会在该延迟之后发生。如果省略该参数，delay取默认值0。实际的延迟时间可能会比 delay 值长，原因请查看下面的备注。
 需要注意的是，IE9 及更早的 IE 浏览器不支持第一种语法中向延迟函数传递额外参数的功能。如果你想要在IE中达到同样的功能,你必须使用一种兼容代码 (查看callback arguments 一段).

 备注: 在Gecko 13之前 (Firefox 13.0 / Thunderbird 13.0 / SeaMonkey 2.10), Gecko会给延迟函数传递一个额外的参数,该参数表明了此次延迟操作实际延迟的毫秒数.现在,这个非标准的参数已经不存在了.

 */
if (document.all && !window.setTimeout.isPolyfill) {
    var __nativeST__ = window.setTimeout;
    window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
        var aArgs = Array.prototype.slice.call(arguments, 2);
        return __nativeST__(vCallback instanceof Function ? function () {
            vCallback.apply(null, aArgs);
        } : vCallback, nDelay);
    };
    window.setTimeout.isPolyfill = true;
}

if (document.all && !window.setInterval.isPolyfill) {
    var __nativeSI__ = window.setInterval;
    window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
        var aArgs = Array.prototype.slice.call(arguments, 2);
        return __nativeSI__(vCallback instanceof Function ? function () {
            vCallback.apply(null, aArgs);
        } : vCallback, nDelay);
    };
    window.setInterval.isPolyfill = true;
}