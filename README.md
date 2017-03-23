# util
## Class
- 实现创建Class,支持扩展;
    1. 实现extend方法,给类添加方法
    2. 实现include方法,给实例添加方法
  
- 实现继承,子类无法修改父类的引用属性:
    1. 值引用很容易通过,属性copy实现;
    2. 引用类型则需要深copy实现;
    
- 实现_super,方便子类重写父类的方法

- 指定init为初始化方法;
    1. 方便初始化

- 保证继承关系    

## api

```javascript
var Person = Class.extend({
    init:function(){
        //init
    },
    dance:function(){
        //dance
    }
});
//增加实例的方法
Person.include({
    included:function(){
        console.log("included...");
    },
    play:function(){
        //play
    }
});
//增加类的方法
Person.implement({
    implemented:function(){
        //implemented
    },
    type:"person"
});


var Ninja  = Person.extend({
    init:function() {
        //init
        _super();
    },
    dance:function(){
        //dance
        _super();
    }
});

Ninja.include({
    included:function(){
        //included
    },
    kongfu:function(){
        //kongfu
    },
    play:function(){//play方法

    }
});

console.log(Person.type);

var p = new Person();
p.dance();
p.play();

var ninja = new Ninja();
ninja.dance();
ninja.play();
ninja.kongfu();

//引用属性,判断属性改变的时候是否影响prototype的独立性

ninja.__proto__.play = function(){
    //play1
};

ninja.play();
p.play();
var n1 = new Ninja();
n1.play();

//属性检测
console.log(p instanceof  Person);
console.log(ninja instanceof  Ninja);
console.log(ninja instanceof  Person);

console.log(ninja.constructor ==Ninja);
console.log(p.constructor == Person);



```