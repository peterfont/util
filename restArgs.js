/**
 * Created by panruipeng on 2017/4/5.
 */
//实现不定参数的包装
function restArgs(func,startIndex){
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function(){
        var len = Math.max(arguments.length-startIndex,0),
            rest = Array(len),
            index = 0;
        for(;index<len;index++){
            rest[index] = arguments[startIndex+index];
        }
        switch(startIndex){
            case 0: return func.call(this, rest);
            case 1: return func.call(this, arguments[0], rest);
            case 2: return func.call(this, arguments[0], arguments[1], rest);
        }
        var args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
            args[index] = arguments[index];
        }
        args[startIndex] = rest;
        return func.apply(this, args);
    }
}
