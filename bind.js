/**
 * Created by panruipeng on 2017/3/28.
 */
//实现Function.prototype.bind 的Polyfill
//兼容旧版本的浏览器

/*
 官方描述:

 bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的call属性）。

 特性:
 1 当目标函数被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。
 2 绑定函数被调用时，bind() 也接受预设的参数提供给原函数。
 3 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
 bind的使用:
 1 创建绑定函数

 2 偏函数

 3 配合 setTimeout

 4 作为构造函数使用的绑定函数

 5 快捷调用

 *
 */
//function扩展
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {//fBound继承自this
                return fToBind.apply(this instanceof fNOP
                        ? this
                        : oThis || this,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}
//非扩展Function的实现
function bind(func,context){
    if(typeof func !== "function") throw new TypeError("Bind must be called on a function");
    var args = Array.prototype.slice.call(arguments,2),
        Cort = function(){},
        bound = function (){
            //非构造函数方式
            if(!(this instanceof func)){
                return func.apply(context||this,args.concat(arguments));
            }
            //构造函数方式
            Cort.prototype = func.prototype;
            //this.__proto__ ==  bound.prototype.__proto__ = new FONP.__proto__ = FONP.prototype = func.prototype
            //this instaceof func  --> true;
            bound.protype = new Cort();
            func.apply(this instanceof func?this:context||this,args.concat(arguments));
        };
    return bound;
}