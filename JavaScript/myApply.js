Function.prototype.myApply = function(context, argsArray){
  context = context || window;
  context.fn = this;
  if(!argsArray) {
    let result = context.fn();
    delete context.fn;
    return result;
  }

  let args = [];
  for(let i = 1; i < arguments.length; i++){
    args = `arguments[` + i + `]`;
  }
  
  let result = eval('context.fn(...' + args + ')');
  delete context.fn;
  return result;
}

let foo = {
  value: 3,
}

function bar(name, age){
  return {
      value: this.value,
      name: name,
      age: age,
  }
}

console.log(bar.myApply(null));