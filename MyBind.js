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