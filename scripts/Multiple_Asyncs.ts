type callbackConfigType =
    {
        success?: Function,
        failure?: Function
    };

const getRandomBinary = () => Math.random() >= 0.5 ? 1 : 0;

class MultiplePromises {
    constructor(asyncTasks) {
        this._registeredTasks = asyncTasks;
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

    public registerAsyncTask(asyncTask) {
        this._registeredTasks.push(asyncTask)
    }

    public ensureDynamicActionsRetrieved() {
        if (this.MultiTaskStatus === AsyncStatus.Pending) return this._multiTaskPromise;
        this._multiTaskPromise = new Promise((multiTaskResolve, multiTaskReject) => {
            this.MultiTaskStatus = AsyncStatus.Pending;
            const promises = [];
            this._registeredTasks.forEach(task => {
                if (task && task.Status === AsyncStatus.NotPerformed || task.Status === AsyncStatus.Failure) {
                    promises.push(new Promise((resolve, reject) => task.Execute(resolve, reject)));
                }
            });

            Promise.all(promises).then(
                result => {
                    this.MultiTaskStatus = AsyncStatus.Success;
                    multiTaskResolve(result);
                },
                err => {
                    this.MultiTaskStatus = AsyncStatus.Failure;
                    multiTaskReject(err);
                });
        });

        return this._multiTaskPromise;
    }
}

class AsyncTask {
    private _status: AsyncStatus = AsyncStatus.NotPerformed;

    private _asyncTask = null;

    private _callbackConfig: callbackConfigType = {};

    private _name = '';

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

    constructor(name: string, callbackConfig?: callbackConfigType) {
        this._name = name;
        if (callbackConfig) this._callbackConfig = callbackConfig;
        this.Action = () => new Promise((resolve, reject) => {
            let start = performance.now();
            setTimeout(() => {
                let time = Math.floor(performance.now() - start);
                getRandom(0, 1) ? resolve(`Resolved ${name} in ${time} ms`) : reject(`Rejected ${name} in ${time} ms`);
            }, getRandom(500, 1500));
        });
    }

    public Execute(resolve, reject) {
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

const enum AsyncStatus {
    NotPerformed = 1,
    Pending = 2,
    Failure = 3,
    Success = 4
}


const antonCallback = () => console.log('A callback from Anton');

const anton = new AsyncTask('Anton', {success: antonCallback});

const kseniya = new AsyncTask('Kseniya');

const deferreds = [anton, kseniya];

const multPromises = new MultiplePromises(deferreds);

function runHandler() {
    multPromises.ensureDynamicActionsRetrieved().then(handleThen).catch(handleCatch);
}

const run = document.querySelector('#run').addEventListener('click', runHandler);

const handleThen = result => {
    console.log('------- Resolved promise.all -------');
    console.log(result);
};
const handleCatch = err => {
    console.log('------- Rejected promise.all ------');
    console.log(err);
};

