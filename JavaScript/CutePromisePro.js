function CutePromisePro(executor){
    this.value = null;
    this.reason = null;
    this.status = "pending";

    this.onResolvedQueue = [];
    this.onRejectedQueue = [];
    var self = this;


    function resolve(value){
        if (self.status !== "pending") return;
        self.value = value;
        self.status = "resolved";
        self.onResolvedQueue.forEach(resolved => resolved(self.value));
    }

    function reject(reason){
        if (self.status !== "pending") return;
        self.reason = reason;
        self.status = "rejected";
        self.onRejectedQueue.forEach(rejected => rejected(self.value));
    }

    executor(resolve, reject);
}

function resolutionProcedure(promise2, x, resolve, reject){
    // hasCalled: 确保resolve和reject不要被重复执行
    let hasCalled;
    if (x === promise2) {
        // 1. 决议程序规范: 如果resolve结果和promise2相同则reject，这是为了避免死循环
        return reject(new TypeError("为了避免死循环，此处抛错"));
    } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
        // 2. 决议程序规范: 如果x是一个对象或者函数，则需要额外处理，如下↓
        try {
            let then = x.then;
            if (typeof then === "function") {
                then.call(x, y => {
                    if (hasCalled) return;
                    hasCalled = true;
                    // 进入决议程序(递归调用自身)
                    resolutionProcedure(promise2, y, resolve, reject);
                }, error => {
                    if (hasCalled) return;
                    hasCalled = true;
                    reject(error);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (hasCalled) return;
            hasCalled = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}

CutePromisePro.prototype.then = function (onResolved, onRejected) {
    if (typeof onResolved !== "function") {
        onResolved = function (value) { return value; };
    }
    if (typeof onRejected != "function") {
        onRejected = function (error) { throw error; };
    }

    var self = this;
    let x;

    function resolveByStatus(resolve, reject){
        setTimeout(function (){
            try {
                x = onResolved(self.value);
                resolutionProcedure(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        })
    }

    function rejectByStatus(resolve, reject){
        setTimeout(function () {
            try {
                x = onRejected(self.reason);
                resolutionProcedure(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        })
    }

    // 返回一个符合规范的Promise对象
    var promise2 = new CutePromisePro(function (resolve, reject) {
        if (self.status === "resolved") {
            resolveByStatus(resolve, reject);
        } else if (self.status === "rejected") {
            rejectByStatus(resolve, reject);
        } else if (self.status === "pending") {
            self.onResolvedQueue.push(function (){
                resolveByStatus(resolve, reject);
            });
            self.onRejectedQueue.push(function () {
                rejectByStatus(resolve, reject);
            })
        }
    });

    return promise2;
}












