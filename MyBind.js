/**
 * bind() 方法会创建一个新函数。当这个函数被调用时，bind() 的第一个参数将作为它运行时的this，
 * 之后的一系列参数将会在传递的实参前传入作为它的参数。
 * 1. 返回一个函数
 * 2. 可以传入参数
*/

/***************************  第一版  ********************************/
Function.prototype.myBind1 = function(context){
    let self = this;
    return function(){
        return self.apply(context);
    }
}
var foo1 = {
    value: 1
};

function bar1() {
	return this.value;
}

let bindFoo = bar1.myBind1(foo1);
console.log(bindFoo());


/***************************  第二版  ********************************/

Function.prototype.bind2 = function(context) {
    let self = this;

    // 获取bind2函数第二个参数到最后一个参数。 这里要用Array.prototype.slice.call来截取参数。
    // arugments是对象，不是数组，不能直接切割
    let args = Array.prototype.slice.call(arguments, 1);

    return function(){

        // 这个时候的arguments是bind返回的函数传入的参数
        // 单纯转换成数组，不进行切割
        let argsArray = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(argsArray));
    }
}

var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);
}

var bindFoo = bar.bind2(foo, 'daisy');
bindFoo('18');




/***************************  第三版  ********************************/


Function.prototype.bind3 = function(context) {
    let self = this;

    // 获取bind2函数第二个参数到最后一个参数。 这里要用Array.prototype.slice.call来截取参数。
    // arugments是对象，不是数组，不能直接切割
    let args = Array.prototype.slice.call(arguments, 1);

    return function(){

        // 这个时候的arguments是bind返回的函数传入的参数
        // 单纯转换成数组，不进行切割
        let argsArray = Array.prototype.slice.call(arguments);
        return self.apply(context, args.concat(argsArray));
    }
}

// var value = 2;

var foo3 = {
    value: 1
};

function bar3(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar3.prototype.collection = 'collection';

var bindFoo3 = bar3.bind3(foo3, 'daisy');
var b = new bindFoo3('12');
console.log(b.collection);


/***************************  第四版  ********************************/

Function.prototype.bind4 = function(context){
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var result = function(){
        var bindArgs = Array.prototype.slice.call(arguments);

        // 作为构造函数的时候（new），this就指向实例（被new后赋值的那个变量）。
        return self.apply(this instanceof result ? this : context, args.concat(bindArgs));
    }

    /**
     * 把foo4这个原型对象赋值给bindFoo4这个函数的原型对象，让bindFoo4和bar4串联起来，
     * 让bindFoo4这个函数的实例可以用到bar4原型对象的属性
    */
    result.prototype = this.prototype;
    return result;
}

var value4 = 2;

var foo4 = {
    value: 1
};

function bar4(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar4.prototype.friend = 'kevin';

var bindFoo4 = bar4.bind4(foo4, 'daisy');
var obj = new bindFoo4('18');
console.log(obj.friend);


/***************************  第五版  ********************************/

Function.prototype.bind5 = function(context){
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var tempFunc = function(){};

    var result = function(){
        var bindArgs = Array.prototype.slice.call(arguments);

        // 作为构造函数的时候（new），this就指向实例（被new后赋值的那个变量）。
        return self.apply(this instanceof result ? this : context, args.concat(bindArgs));
    }

    /**
     * 但是在这个写法中，我们直接将 fBound.prototype = this.prototype，
     * 我们直接修改 fBound.prototype 的时候，也会直接修改绑定函数的 prototype。
     * 这个时候，我们可以通过一个空函数来进行中转
     * */ 
    tempFunc.prototype = this.prototype;
    result.prototype = new tempFunc();
    return result;
}

var value5 = 2;

var foo5 = {
    value: 1
};

function bar5(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar5.prototype.friend = 'kevin';

var bindFoo5 = bar5.bind5(foo5, 'daisy');
var obj = new bindFoo5('18');
console.log(obj.friend);


/*******************************************************/

// 实现bind()

Function.prototype.myBind9 = function(context){

    if(typeof this !== 'function') {
        throw new Error("Not a function");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fFunction = function(){};

    var result = function(){
        var argsArray = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof result ? this : context, args.concat(argsArray));
    }

    fFunction.prototype = this.prototype;
    result.prototype = new fFunction();
    return result;
}


var value9 = 2;

var foo9 = {
    value: 1
};

function bar9(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar9.prototype.friend = 'kevin';

var bindFoo9 = bar9.myBind9(foo9, 'daisy');
// var obj = new bindFoo9('18');
bindFoo9(20);

