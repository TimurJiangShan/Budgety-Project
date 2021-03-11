function CutePromise(executor){
    // value记录异步任务成功的执行结果
    this.value = null;
    // reason记录异步任务失败的原因
    this.reason = null;
    // status记录当前状态，初始化是pending
    this.status = "pending";
    // 缓存两个队列，维护resolved和rejected各自对应的处理函数
    this.onResolvedQueue = [];
    this.onRejectedQueue = [];
    // 记录当前this
    var self = this;
    // 定义resolve函数
    function resolve(value){
        // 如果是pending状态，直接返回
        if (self.status === "pending") {
            return;
        }
        self.value = value;
        self.status = "resolved";
        self.onResolvedQueue.forEach(resolved => resolved(self.value));
    }
    // 定义reject函数
    function reject(reason) {
        if (self.status === "pending") {
            return;
        }
        self.reason = reason;
        self.status = "rejected";
        self.onRejectedQueue.forEach(rejected => rejected(self.reason));
    }
    // 把resolve和reject能力赋予执行器
    executor(resolve, reject);
}