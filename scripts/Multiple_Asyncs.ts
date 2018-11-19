const enum AsyncStatus {
    NotPerformed = 1,
    Pending = 2,
    Failure = 3,
    Success = 4
}

type CallbackConfigType = {
    success?: Function,
    failure?: Function
};

type AsyncTaskResult = {
    status: AsyncStatus,
    result: any
};

interface IAsyncTask {
    Status: AsyncStatus,
    Action: Promise<AsyncTaskResult>,
    CreateExecutionPromise: (resolve: Function, reject: Function) => Promise<any>
}

class MultiplePromises {
    constructor(asyncTasks?) {
        if (asyncTasks) this._registeredTasks = asyncTasks;
    }

    private _registeredTasks = [];

    private _multiTaskPromise = null;

    private _multiTaskStatus = AsyncStatus.NotPerformed;

    get MultiTaskStatus(): AsyncStatus {
        return this._multiTaskStatus;
    }

    set MultiTaskStatus(multiTaskStatus: AsyncStatus) {
        this._multiTaskStatus = multiTaskStatus;
    }

    public RegisterTask(task) {
        this._registeredTasks.push(task);
    }

    public ensureAllResolved(): Promise<AsyncTaskResult> {
        if (this.MultiTaskStatus === AsyncStatus.Pending) return this._multiTaskPromise;
        this._multiTaskPromise = new Promise((multiTaskResolve, multiTaskReject) => {
            this.MultiTaskStatus = AsyncStatus.Pending;
            const promises = [];
            this._registeredTasks.forEach(task => {
                if (task && task.Status === AsyncStatus.NotPerformed || task.Status === AsyncStatus.Failure) {
                    promises.push(new Promise(task.CreateExecutionPromise.bind(task)))
                }
            });

            Promise.all(promises).then(
                result => {
                    this.MultiTaskStatus = AsyncStatus.Success;
                    console.log('------- Resolved promise.all -------');
                    multiTaskResolve({status: this.MultiTaskStatus, result});
                },
                err => {
                    this.MultiTaskStatus = AsyncStatus.Failure;
                    console.log('------- Rejected promise.all ------');
                    multiTaskReject({status: this.MultiTaskStatus, err});
                });
        });

        return this._multiTaskPromise;
    }
}

class AsyncTask implements IAsyncTask {
    private _status: AsyncStatus = AsyncStatus.NotPerformed;

    private _asyncTask = null;

    private _callbackConfig: CallbackConfigType = {};

    private _name = 'anonymous';

    private getDemoAction() {
        return () => new Promise((resolve, reject) => {
            let start = performance.now();
            setTimeout(() => {
                let time = Math.floor(performance.now() - start);
                getRandom(0, 1)
                    ? resolve(`Resolved ${this._name} in ${time} ms`)
                    : reject(`Rejected ${this._name} in ${time} ms`);
            }, getRandom(500, 1500));
        });
    }

    get Action() {
        return this._asyncTask;
    }

    set Action(asyncTask) {
        this._asyncTask = asyncTask;
    }

    get Status(): AsyncStatus {
        return this._status;
    }

    set Status(status: AsyncStatus) {
        this._status = status;
    }

    constructor(action?: Function, callbackConfig?: CallbackConfigType) {
        if (callbackConfig) this._callbackConfig = callbackConfig;
        this.Action = action;
    }

    public CreateExecutionPromise(resolve, reject) {
        const {success, failure} = this._callbackConfig;
        this.Status = AsyncStatus.Pending;
        return this.Action().then(result => {
            console.log(`Resolving... ${this._name}`);
            this.Status = AsyncStatus.Success;
            success && success();
            resolve(result);
        }).catch(err => {
            console.log(`Rejecting... ${this._name}`);
            this.Status = AsyncStatus.Failure;
            failure && failure();
            reject(err);
        });
    }
}

function asyncTestCustom1(...args) {
    return () => {
        return (new Promise(res => {
            setTimeout(() => res(`Resolved asyncTestCustom, Args: ${args}`), 1000);
        })).then(() => {console.log(args); return args;});
    }
}

function asyncTestCustom2(...args) {
    return () => {
        return (new Promise(res => {
            setTimeout(() => res(`Resolved asyncTestCustom, Args: ${args}`), 1500);
        })).then(() => {console.log(args); return args;});
    }
}
const multiPromises = new MultiplePromises();

const task1 = new AsyncTask(asyncTestCustom1(1, 2, 3));
const task2 = new AsyncTask(asyncTestCustom2(5, 6, 7));

multiPromises.RegisterTask(task1);
multiPromises.RegisterTask(task2);

function runHandler() {
    multiPromises.ensureAllResolved().then(console.log, console.log);
}

const run = document.querySelector('#run').addEventListener('click', runHandler);

