class MultiplePromises {
    constructor(asyncTasks) {
        this._registeredTasks = asyncTasks.map(task => task);
    }

    private _registeredTasks = [];

    public registerAsyncTask(asyncTask) {
        this._registeredTasks.push(asyncTask)
    }

    public ensureDynamicActionsRetrieved() {
        const promises = [];
        this._registeredTasks.forEach(task => {
            if (task && task.Status === AsyncTaskStatus.NotPerformed || task.Status === AsyncTaskStatus.Failed) {
                promises.push(task.Execute());
            }
        });

        return Promise.all(promises);
    }
}

class AsyncTask {
    private _status: AsyncTaskStatus = AsyncTaskStatus.NotPerformed;

    private _asyncTask = null;

    get Action() {
        return this._asyncTask;
    }

    set Action(asyncTask) {
        this._asyncTask = asyncTask;
    }

    get Status(): AsyncTaskStatus {
        return this._status;
    }

    set Status(status: AsyncTaskStatus) {
        this._status = status;
    }

    constructor(name: string, ms: number) {
        this._asyncTask = () => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`${name} is finished`);
            }, 1000);
        });
    }

    public Execute(...args: any[]) {
        this.Status = AsyncTaskStatus.Pending;
        return this.Action.apply(this, args).then(() => {
            this.Status = AsyncTaskStatus.Success;
        }).catch(err => {
            this.Status = AsyncTaskStatus.Failed;
        });
    }
}

const enum AsyncTaskStatus {
    NotPerformed = 1,
    Pending = 2,
    Failed = 3,
    Success = 4
}

const deferreds = [new AsyncTask('Anton', 1000), new AsyncTask('Kseniya', 5000)];

const multPromises = new MultiplePromises(deferreds);


multPromises.ensureDynamicActionsRetrieved().then(console.log);