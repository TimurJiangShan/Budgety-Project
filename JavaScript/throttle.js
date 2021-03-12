/*
* 节流： 是通过一段时间内巫师后来产生的回调请求来实现的。
*
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