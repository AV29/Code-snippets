const getRandomBinary = () => Math.random() >= 0.5 ? 1 : 0;

class MultiplePromises {
    constructor(asyncTasks) {
        this._registeredTasks = asyncTasks;
    }

    private _registeredTasks = [];

    public registerAsyncTask(asyncTask) {
        this._registeredTasks.push(asyncTask)
    }

    public ensureDynamicActionsRetrieved() {
        const promises = [];
        this._registeredTasks.forEach(task => {
            if (task && task.Status === AsyncTaskStatus.NotPerformed || task.Status === AsyncTaskStatus.Failed) {
                promises.push(new Promise((resolve, reject) => task.Execute(resolve, reject)) );
            }
        });

        return Promise.all(promises);
    }
}

class AsyncTask {
    private _status: AsyncTaskStatus = AsyncTaskStatus.NotPerformed;

    private _asyncTask = null;

    private _name = '';

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
        this._name = name;
        this.Action = () => new Promise((resolve, reject) => {
            let start = performance.now();
            setTimeout(() => {
                let time = Math.floor(performance.now() - start);
                getRandomBinary() ? resolve(`Resolved ${name} in ${time} ms`) : reject(`Rejected ${name} in ${time} ms`);
            }, ms);
        });
    }

    public Execute(resolve, reject) {
        this.Status = AsyncTaskStatus.Pending;
        return this.Action().then(result => {
            console.log(`Resolving... ${this._name}`);
            this.Status = AsyncTaskStatus.Success;
            resolve(result);//return result;
        }).catch(err => {
            console.log(`Rejecting... ${this._name}`);
            this.Status = AsyncTaskStatus.Failed;
            reject(err);//return err;
        });
    }
}

const enum AsyncTaskStatus {
    NotPerformed = 1,
    Pending = 2,
    Failed = 3,
    Success = 4
}

const deferreds = [new AsyncTask('Anton', 100), new AsyncTask('Kseniya', 1500)];

const multPromises = new MultiplePromises(deferreds);


const handleThen = result => {
  console.log('------- Resolved promise.all -------');
  console.log(result);
};
const handleCatch = err => {
  console.log('------- Rejected promise.all ------');
  console.log(err);
};

multPromises.ensureDynamicActionsRetrieved().then(handleThen).catch(handleCatch);