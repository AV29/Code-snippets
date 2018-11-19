const enum AsyncStatus {
    NotPerformed = 1,
    Pending = 2,
    Failure = 3,
    Success = 4
}

interface ICallbackConfig {
    success?: Function,
    failure?: Function
}

interface IMultiplePromiseResult {
    status: AsyncStatus,
    result: any
}

type AsyncAction = () => Promise<any>

interface IAsyncTask {
    Status: AsyncStatus,
    Action: AsyncAction,
    Execute: (resolve: Function, reject: Function) => Promise<any>
}

class MultiplePromises {

    private _registeredTasks: IAsyncTask[] = [];

    private _multiTaskPromise = null;

    private _multiTaskStatus = AsyncStatus.NotPerformed;

    get MultiTaskStatus(): AsyncStatus {
        return this._multiTaskStatus;
    }

    set MultiTaskStatus(multiTaskStatus: AsyncStatus) {
        this._multiTaskStatus = multiTaskStatus;
    }

    private _handleFinally(handler: Function, status: AsyncStatus) {
        return result => {
            this.MultiTaskStatus = status;
            handler({status, result});
        }
    }

    constructor(asyncTasks, ...restTasks) {
        Array.isArray(asyncTasks)
            ? this._registeredTasks = asyncTasks
            : this._registeredTasks = [asyncTasks].concat(restTasks);
    }

    public RegisterTask(task: IAsyncTask): void {
        this._registeredTasks.push(task);
    }

    public EnsureAllResolved(): Promise<IMultiplePromiseResult> {
        if (this.MultiTaskStatus === AsyncStatus.Pending) return this._multiTaskPromise;
        this._multiTaskPromise = new Promise((finalResolve, finalReject) => {
            this.MultiTaskStatus = AsyncStatus.Pending;
            const promises = [];
            this._registeredTasks.forEach(task => {
                if (task && task.Status === AsyncStatus.NotPerformed || task.Status === AsyncStatus.Failure) {
                    promises.push(new Promise(task.Execute.bind(task)))
                }
            });

            Promise
                .all(promises)
                .then(
                    this._handleFinally(finalResolve, AsyncStatus.Success),
                    this._handleFinally(finalReject, AsyncStatus.Failure)
                )
        });

        return this._multiTaskPromise;
    }
}

class AsyncTask implements IAsyncTask {
    private _status: AsyncStatus = AsyncStatus.NotPerformed;

    private _asyncAction: AsyncAction = null;

    private _callbackConfig: ICallbackConfig = {};

    get Action(): AsyncAction {
        return this._asyncAction;
    }

    set Action(asyncAction: AsyncAction) {
        this._asyncAction = asyncAction;
    }

    get Status(): AsyncStatus {
        return this._status;
    }

    set Status(status: AsyncStatus) {
        this._status = status;
    }

    constructor(action: AsyncAction, callbackConfig?: ICallbackConfig) {
        if (callbackConfig) this._callbackConfig = callbackConfig;
        this.Action = action;
    }

    public Execute(resolve?: Function, reject?: Function): Promise<any> {
        const {success, failure} = this._callbackConfig;
        this.Status = AsyncStatus.Pending;
        return this.Action().then(result => {
            this.Status = AsyncStatus.Success;
            success && success();
            resolve && resolve(result);
        }).catch(err => {
            this.Status = AsyncStatus.Failure;
            failure && failure();
            reject && reject(err);
        });
    }
}

function asyncTestCustom1(...args): AsyncAction {
    return () => {
        return new Promise(res => {
            setTimeout(() => res(`Resolved asyncTestCustom, Args: ${args}`), 1500);
        });
    }
}

function asyncTestCustom2(...args): AsyncAction {
    return () => {
        return new Promise((res, rej) => {
            setTimeout(() => rej(`Rejected asyncTestCustom, Args: ${args}`), 1000);
        });
    }
}

const task1 = new AsyncTask(asyncTestCustom1(1, 2, 3), {
    success: () => console.log('Success'),
    failure: () => console.log('Failure')
});
const task2 = new AsyncTask(asyncTestCustom2(5, 6, 7), {
    success: () => console.log('Success'),
    failure: () => console.log('Failure')
});

const multiPromises = new MultiplePromises([task1]);

multiPromises.RegisterTask(task2);

const run = document.querySelector('#run').addEventListener('click', function () {
    multiPromises.EnsureAllResolved().then(console.log, console.log);
});

