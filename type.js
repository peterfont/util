;!(function(root,name,factory){//UMD
    if(typeof define == "function" && define.amd) {
        define(name, factory);
    } else if(typeof module === 'object' && module.exports){
        module.exports = factory();
    }else{
        root[name] = factory();
    }
})(this,"type",function(){//类型判断
    return {
        /*判断NaN*/
        isNaN:function(obj){
            return  obj !== obj;
        },
        /*判断null*/
        isNull:function(obj){
            return obj === null;
        },
        /*判断undefined*/
        isUndefined:function(){
            return obj === void 0;
        },
        /*判断function*/
        isFunction:function(func){
            return typeof  func === "function";
        },
        type:function(arg){
            /*返回类型: boolean number string function array date RegExpObject*/
            return /\s(\w+)/.exec(Object.prototype.toString.call(arg).toLowerCase())[1];
        },
        /*判断array like*/
        isArrayLike:function(obj){
            var length = obj.length, _type =this.type(obj);
            if(this.isWindow(obj)){
                return false;
            }
            if(obj.nodeType === 1 && length){
                return true;
            }
            return _type === "array" || _type !== "function" && (length === 0 || typeof length === "number" && length > 0 && (length-1) in obj);
        },
        /*判断数组*/
        isArray:function(obj){
            if(typeof Array.isArray === "function"){
                return Array.isArray(obj);
            }else{
                return Object.prototype.toString.call(obj) === "[object Array]";
            }
        },
        /*判断window*/
        isWindow:function(obj){
            return obj != null && obj === obj.window;
        },
        /*判断plain对象*/
        isPlainObject:function(obj){
            //首先排除类型不是object的类型,然后是dom节点 与 window对象
            if(this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)){
                return false;
            }
            //然后回溯它最近的原型对象是否有isPrototypeOf
            //旧版本的IE的原生对象没有暴露constructor,prototype,因此这里需要过滤
            try{
                if(obj.constructor && !hasOwnProperty.call(obj.constructor.prototype,"isPrototypeOf")){
                    return false;
                }
            }catch(e){
                return false;
            }

            return true;

        }
    };
});
