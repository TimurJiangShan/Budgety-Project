Function.prototype.myBind = function (context, ...args1) {

    if( typeof this !== 'function')
        throw new Error("Not a function");

    let self = this;
    let fn = function(...args2){
        return self.apply(this instanceof fn ? this : context, args1.concat(args2));
    }

    
}