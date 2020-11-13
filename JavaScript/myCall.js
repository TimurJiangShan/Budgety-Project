/**
 * call() 方法在使用一个指定的this值和若干指定的参数值的前提下调用某个函数或者方法
 * 
 * 1. call 改变了this的指向，指向到foo
 * 2. 调用者函数被执行了
*/

/**
 * 步骤：
 * 1. 将函数设为对象的属性
 * 2. 执行该函数
 * 3. 删除该函数
*/

/***************************  第一版  ********************************/

Function.prototype.call2 = function(context){
    // 获取调用call的函数，用this可以获取(因为这个函数里面的this会默认绑定到调用call的函数身上))
    context.fn = this;
    context.fn();
    delete context.fn;
}

let foo = {
    value: 1,
}

function bar () {
    console.log(this.value);
}

bar.call2(foo); // 相当于把bar这个函数，添加到foo这个对象里面，变成了foo的一个属性。


/***************************  第二版  ********************************/

Function.prototype.call3 = function(context){
    context.fn = this;
    const args = [];
    for(let i = 1; i < arguments.length; i++){
        args.push('arguments[' + i + ']');
    }

    eval('context.fn(' + args + ')');
    delete context.fn;
}

let foo3 = {
    value: 2,
}

function bar3(name, age){
    console.log(name);
    console.log(age);
    console.log(this.value);
}

bar3.call3(foo3, 'name', 'age');

/***************************  第三版  ********************************/

/**
 * 1. this参数可以传null， 当为null的时候，视为指向window
 * 2. 函数可以有返回值
*/

// 在VsCode里面会提示window找不到，复制粘贴到浏览器就好了
Function.prototype.call4 = function(context){
    let InnerContext = context || window;
    InnerContext.fn = this;
    const args = [];
    for(let i = 1; i < arguments.length; i++){
        args.push('arguments[' + i + ']');
    }

    const result = eval('InnerContext.fn(' + args + ')');
    delete InnerContext.fn;
    return result;
}

let foo4 = {
    value: 3,
}

function bar4(name, age){
    return {
        value: this.value,
        name: name,
        age: age,
    }
}

bar4.call4(null);