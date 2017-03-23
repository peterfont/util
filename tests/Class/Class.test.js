//module
var Q  =  QUnit;
Q.module("Class",function(){
    var Person = Class.extend({
        init: function(isDancing){
            this.dancing = isDancing;
        },
        dance: function(){
            return this.dancing;
        }
    });
    var p = new Person(true);


    var Ninja = Person.extend({
        init: function(){
            this._super(false);
        },
        dance: function(){
            // Call the inherited version of dance()
            return this._super();
        },
        swingSword: function(){
            return true;
        }
    });
    var p1 =new Person(true);
    var n = new Ninja();
    Ninja.include({//增加实例属性
        fly:function(){
            return true;
        }
    });
    Ninja.implement({//增加类属性
        type:"Ninja"
    });
    var n1 = new Ninja();

    Q.test("_super",function(assert){
        assert.ok(p.dance());
        assert.notOk(n.dance());
        assert.ok(n.swingSword());
        assert.notOk(p1.swingSword && p1.swingSword());
    });

    Q.test("instanceof",function(assert){
        assert.ok(n instanceof Ninja);
        assert.ok(n instanceof Person);
    });

    Q.test("constructor",function(assert){
        assert.deepEqual(n.constructor,Ninja);
        assert.deepEqual(p.constructor,Person);
    });


    Q.test("include ",function(assert){
        assert.ok(n1.fly());
        assert.ok(n.fly());
        n1.fly = function(){
            return false;
        };
        assert.notOk(n1.fly());
        assert.ok(n.fly());
    });


    Q.test("implement",function(assert){
        assert.equal(Ninja.type,"Ninja");
    });

    //测试深copy和浅copy






});
