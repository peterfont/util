/**
 * A Simple Way To Create Class With Extends And Implementation In Javascript (OOP)
 * The MIT License - Copyright (c) 2017 prp <peterfont@163.com>
 * https://github.com/peterfont/util.git
 */
;!(function(root,name,factory){//UMD
    if(typeof define == "function" && define.amd) {
        define(name, factory);
    } else if(typeof module === 'object' && module.exports){
        module.exports = factory();
    }else{
        root[name] = factory();
    }
})(this,"Class",function(){
    //工具方法:type
    var type = function(arg){//获取元素类型
        return /\s(\w+)/.exec(Object.prototype.toString.call(arg).toLowerCase())[1];
    };
    //工具方法:copy
    var copy = function(p, c, b) {//copy
        var c = c || {},b = b || false;
        for (var i in p) {
            //浅copy
            if(!b){
                c[i] = p[i];
                continue;
            }
            //深copy
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                copy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    };
    var initializing = false,// 初始化的状态
        fnTest = /xyz/.test(function(){xyz;})?/\b_super\b/:/.*/; // 函数序列化
    var Class = function(){};

    //实现deepCopy
     Class.extend = function(prop){
         var _super = this.prototype;

         initializing = true;

         //方式1:父类的实例(中间对象),作为子类的原型,维持原型链
         // sub.__proto__ = Sub.prototype = sup;
         // sup.__proto__ = Sup.prototype
         var prototype = new this();
         /*
            //方式2: 通过中介的方式,创建中介对象,把中介对象的实例作为子类的原型;
            //这种方式,不会调用父类的构造器,节省了内存,但是不oo
            var subclass = function(){};
            subclass.prototype = this.prototype;
            var prototype = new subclass;
         */
         initializing = false;

         for(var name in prop){
            //支持 function 中调用 this._super ,重写父类的方法
            prototype[name] = typeof prop[name]=="function" && typeof _super[name] == "function" && fnTest.test(prop[name])?(function(name,fn){
                return function(){
                    var temp = this._super;
                    this._super = _super[name];
                    var ret = fn.call(this,arguments);
                    this._super = temp;
                    return ret;
                }
            })(name,prop[name]):prop[name];
        }

         function Class(){
             //指定init为构造函数
             if(!initializing && this.init){
                 this.init.apply(this, arguments);
             }
         }
         //prototype
         Class.prototype = prototype;

         //implement 增加类方法
         Class.implement = function(obj,deep){
             copy(obj,this,!!deep);
             obj.implemented && typeof obj.implemented == "function" && obj.implemented();
         };

         //include 增加实例方法
         Class.include = function(obj,deep){
             copy(obj,this.prototype,!!deep);
             obj.included && typeof obj.included == "function" && obj.included();
         };

         //constructor
         Class.prototype.constructor = Class;

         //extend callee
         Class.extend = arguments.callee;

         return Class;

     };
     return Class;

});
