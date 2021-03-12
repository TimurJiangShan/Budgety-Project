/*
* 节流： 是通过一段时间内无视后来产生的回调请求来实现的。
* */

function myThrottle(fn, interval){
    // last 是上一次触发回调的时间
    let last = 0;
    return function () {
        // 保留调用时的this上下文
        let context = this;
        // 保留调用时传入的参数
        let args = arguments;
        // 记录本次触发回调的时间
        let now = +new Date();

        // 如果间隔时间大于设置的interval，就调用fn
        if (now - last >= interval) {
            last = now;
            fn.apply(context, args);
        }
    }
}

/*
* 我们对比 throttle 来理解 debounce：在throttle的逻辑里，“第一个人说了算”，
* 它只为第一个乘客计时，时间到了就执行回调。而 debounce 认为，“最后一个人说了算”，
* debounce 会为每一个新乘客设定新的定时器。
* */

function debounce(fn, delay){
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        // 设立新定时器
        timer = setTimeout(function (){
            fn.apply(context, args);
        }, delay);
    }
}