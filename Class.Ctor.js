/*
  构造函数方式实现继承和创建类
 */
var Class = function(parent){

    var klass = function(){
        this.init.apply(this,arguments);
    };

    if(parent){
        var subclass = function(){};
        subclass.prototype = parent.prototype;
        klass.prototype = new subclass;
    }

    klass.prototype.init = function(){};
    klass.fn.parent = klass;
    klass._super = klass.__proto__;

    //定义prototype的别名
    klass.fn = klass.prototype;

    //定义类的别名
    klass.fn.parent = klass;

    //给类添加属性
    klass.extend = function(obj){
        var extended = obj.extended;
        for(var i in obj){
            klass()[i] = obj[i];
        }
        if(extended) extended(klass);
    };

    //给实例添加属性
    klass.include = function(obj){
        var included = obj.included;
        for(var i in obj){
            klass.fn[i] = obj[i];
        }
        if(included) included(klass);
    };

    return klass;
};