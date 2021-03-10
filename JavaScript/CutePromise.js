/*
* Promise的基本特征
*   1. 可以接收一个executor作为入参
*   2. 具备 pending， resolved 和 rejected 这三种状态
* */

function CutePromise(executor){
    // value记录异步任务成功的执行结果
    this.value = null;

    // reason 记录异步任务失败的原因
    this.reason = null;
    // status 记录当前状态，初始化为pending
    this.status = "pending";

    // 把this存下来，后面会用到
    var self = this;

    // 定义resolve函数
    function resolve(value){
        // 异步任务成功，把结果赋给value
        self.value = value;

        // 当前状态切换为resolved
        self.status = "resolved";
    }

    // 定义reject函数
    function reject(reason){
        // 异步任务失败，把结果赋给reason
        self.reason = reason;

        // 当前状态切换为rejected
        self.status = "rejected";
    }

    // 把resolve和reject能力赋予执行器
    executor(resolve, reject);

}

CutePromise.prototype.then = function (onResolved, onRejected) {
    // onResolved 和 onRejected 必须是函数，如果不是，就用穿透来兜底
    if (typeof onResolved !== "function") {
        onResolved = function (x) {return x;}
    }

    if(typeof onRejected !== "function") {
        onRejected = function (e) {return e;}
    }

    // 保存this
    var self = this;
    // 判断是否是resolved状态
    if (self.status === "resolved") {
        onResolved(self.value);
    } else if (self.status === "rejected") {
        onRejected(self.reason);
    }
}

new CutePromise(function (resolve, reject){
    resolve("成了！");
}).then((value) => console.log(value),(reason)=> console.log(reason) );

new CutePromise(function (resolve, reject){
    reject("错了！");
}).then((value) => console.log(value),(reason)=> console.log(reason) );