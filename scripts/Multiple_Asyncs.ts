//import * as $ from "jquery"

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
    Result: any,
    Status: AsyncStatus,
    Action: AsyncAction,
    Execute: (resolve: Function, reject: Function) => Promise<any>
}


/* ------------------------------------- Multi Promise Native -------------------------------------------*/
function InitMultiPromisesNative() {

    class MultipleTasks {

        private static _registeredTasks: IAsyncTask[] = [];
        private static _finalResult = {};
        private static _multiTaskPromise = null;

        private static _multiTaskStatus = AsyncStatus.NotPerformed;

        static get MultiTaskStatus(): AsyncStatus {
            return this._multiTaskStatus;
        }

        static set MultiTaskStatus(multiTaskStatus: AsyncStatus) {
            this._multiTaskStatus = multiTaskStatus;
        }

        private static _getResult() {
            return {
                status: this.MultiTaskStatus,
                result: this._registeredTasks.map(task => task.Result)
            };
        }

        static RegisterTask(task: IAsyncTask): void {
            this._registeredTasks.push(task);
        }

        static RegisterTasks(tasks: IAsyncTask[]): void {
            tasks.forEach(this.RegisterTask);
        }

        static EnsureAllResolved(): Promise<IMultiplePromiseResult> {
            if (this.MultiTaskStatus === AsyncStatus.Success) return Promise.resolve(this._getResult());
            if ((this.MultiTaskStatus === AsyncStatus.Pending) && this._multiTaskPromise) return this._multiTaskPromise;

            this._multiTaskPromise = new Promise((finalResolve, finalReject) => {
                this.MultiTaskStatus = AsyncStatus.Pending;
                const promises = [];
                this._registeredTasks.forEach(task => {
                    if (task && (task.Status === AsyncStatus.NotPerformed || task.Status === AsyncStatus.Failure)) {
                        promises.push(new Promise(task.Execute.bind(task)))
                    }
                });

                Promise
                    .all(promises)
                    .then(() => {
                            this.MultiTaskStatus = AsyncStatus.Success;
                            finalResolve(this._getResult());
                        }
                    )
                    .catch(err => {
                            this.MultiTaskStatus = AsyncStatus.Failure;
                            finalReject({status: this.MultiTaskStatus, result: err});
                        }
                    )
            });

            return this._multiTaskPromise;
        }
    }

    class AsyncTask implements IAsyncTask {
        private _status: AsyncStatus = AsyncStatus.NotPerformed;

        private _asyncAction: AsyncAction = null;

        private _callbackConfig: ICallbackConfig = {};

        private _result: any = null;

        get Result(): any {
            return this._result;
        }

        set Result(result: any) {
            this._result = result;
        }

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

        public Execute(resolve: Function, reject: Function): Promise<any> {
            const {success, failure} = this._callbackConfig;
            this.Status = AsyncStatus.Pending;
            return this.Action().then(result => {
                this.Status = AsyncStatus.Success;
                this.Result = result;
                success && success(result);
                resolve(result);
            }).catch(err => {
                this.Status = AsyncStatus.Failure;
                failure && failure(err);
                reject(err);
            });
        }
    }

    function asyncTestCustom(...args): AsyncAction {
        return () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    getRandom(0, 1)
                        ? resolve(`Resolved asyncTestCustom, Args: ${args}`)
                        : reject(`Rejected asyncTestCustom, Args: ${args}`);
                }, getRandom(500, 1500));
            });
        }
    }

    const task1 = new AsyncTask(asyncTestCustom(1, 2, 3), {
        success: result => console.log('effective MULTI NATIVE Promise job 111 is done', result) //add actions to model
    });
    const task2 = new AsyncTask(asyncTestCustom(5, 6, 7), {
        success: result => console.log('effective MULTI NATIVE Promise job 222 is done', result)
    });

    MultipleTasks.RegisterTask(task1);
    MultipleTasks.RegisterTask(task2);

    document.querySelector('#multiple').addEventListener('click', function () {
        MultipleTasks.EnsureAllResolved().then(console.log).catch(console.log);
    });
}

/* ------------------------------------- Single Promise Native -------------------------------------------*/

function InitSinglePromiseNative() {

    let isResolved = false;
    let isPending = false;
    let activePromise = null;
    let cachedResult = {};

    function ensureRegistredResolved() {
        if (isResolved) return Promise.resolve({status: AsyncStatus.Success, result: cachedResult});
        if (isPending && activePromise) return activePromise;
        activePromise = new Promise((resolve, reject) => {
            isPending = true;
            getDataAndDoSomething().then(
                result => {
                    resolve({status: AsyncStatus.Success, result});
                    isResolved = true;
                    isPending = false;
                    cachedResult = result;
                },
                result => {
                    isResolved = false;
                    isPending = false;
                    reject({status: AsyncStatus.Failure, result});
                }
            );
        });
        return activePromise;
    }

    function getData(...args) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                getRandom(0, 1)
                    ? resolve(`Resolved with args ${args}`)
                    : reject(`Rejected with args ${args} ms`);
            }, getRandom(500, 1500));
        });
    }

    function getDataAndDoSomething() {
        return new Promise((resolve, reject) => {
            getData(1, 2, 3)
                .then(result => {
                    console.log('effective SINGLE NATIVE Promise job is done');
                    //addAction to model
                    resolve(result);
                })
                .catch(reject);
        });
    }

    document.querySelector('#single').addEventListener('click', function () {
        ensureRegistredResolved()
            .then(console.log)
            .catch(console.log);
    });
}

/* ------------------------------------- Multi Promises Jquery -------------------------------------------*/

/*
function InitMultiPromisesJQuery() {
        const AsyncStatus = {
            NotPerformed: 1,
            Pending: 2,
            Failure: 3,
            Success: 4
        };

        class JQuery_MultiplePromises {

            get AllTasksStatus() {
                return this._allTasksStatus;
            }

            set AllTasksStatus(allTasksStatus) {
                this._allTasksStatus = allTasksStatus;
            }

            constructor(asyncTasks, ...restTasks) {
                this._registeredTasks = [];
                this._deferred = null;
                this._activePromise = null;
                this._allTasksStatus = AsyncStatus.NotPerformed;

                Array.isArray(asyncTasks)
                    ? this._registeredTasks = asyncTasks
                    : this._registeredTasks = [asyncTasks].concat(restTasks);
            }

            RegisterTask(task) {
                this._registeredTasks.push(task);
            }

            GetResult() {
                return {
                    Status: this.AllTasksStatus,
                    Result: this._registeredTasks.map(task => task.Result)
                };
            }

            EnsureAllResolved() {
                if ((this.AllTasksStatus === AsyncStatus.Pending) && this._activePromise) return this._activePromise;
                if (this.AllTasksStatus === AsyncStatus.Success) return this._deferred.resolve(this.GetResult());
                this._deferred = $.Deferred();
                this.AllTasksStatus = AsyncStatus.Pending;
                const promises = [];
                this._registeredTasks.forEach(task => {
                    if (task && (task.Status === AsyncStatus.NotPerformed || task.Status === AsyncStatus.Failure)) {
                        const taskWrapper = $.Deferred();
                        task.Execute(taskWrapper.resolve, taskWrapper.reject);
                        promises.push(taskWrapper.promise());
                    }
                });

                $.when
                    .apply($, promises)
                    .then(() => {
                        this.AllTasksStatus = AsyncStatus.Success;
                        this._deferred.resolve(this.GetResult());
                    }, err => {
                        this.AllTasksStatus = AsyncStatus.Failure;
                        this._deferred.reject({ Status: this.AllTasksStatus, Result: err });
                    });

                this._activePromise = this._deferred.promise();
                return this._activePromise;
            }
        }

        class JQuery_AsyncTask {

            get Result() {
                return this._result;
            }

            set Result(result) {
                this._result = result;
            }

            get Action() {
                return this._asyncAction;
            }

            set Action(asyncAction) {
                this._asyncAction = asyncAction;
            }

            get Status() {
                return this._status;
            }

            set Status(status) {
                this._status = status;
            }

            constructor(action, callbackConfig) {
                this._result = null;
                this._status = AsyncStatus.NotPerformed;
                this._asyncAction = null;
                this._callbackConfig = {};

                if (callbackConfig) this._callbackConfig = callbackConfig;
                this.Action = action;
            }

            Execute(resolve, reject) {
                const {success, failure} = this._callbackConfig;
                this.Status = AsyncStatus.Pending;
                return this.Action().then(result => {
                    this.Status = AsyncStatus.Success;
                    this.Result = result;
                    success && success();
                    resolve(result);
                }).catch(err => {
                    this.Status = AsyncStatus.Failure;
                    failure && failure();
                    reject(err);
                });
            }
        }

        function asyncTestCustom(...args) {
            return () => {
                const deferred = $.Deferred();
                setTimeout(() => {
                    getRandom(0, 1)
                        ? deferred.resolve(`Resolved asyncTestCustom, Args: ${args}`)
                        : deferred.reject(`Rejected asyncTestCustom, Args: ${args}`);
                }, getRandom(500, 1500));
                return deferred.promise();
            }
        }

        const task1 = new JQuery_AsyncTask(asyncTestCustom(1, 2, 3), {
            success: () => console.log('Effective MULTI JQUERY Promise job is done'),
        });
        const task2 = new JQuery_AsyncTask(asyncTestCustom(5, 6, 7), {
            success: () => console.log('Effective MULTI JQUERY Promise job is done'),
        });

        const multiPromises = new JQuery_MultiplePromises([task1]);

        multiPromises.RegisterTask(task2);

        document.querySelector('#multiple').addEventListener('click', function () {
            multiPromises.EnsureAllResolved().then(console.log, console.log);
        });
    }
*/

/* ------------------------------------- Single Promise Jquery -------------------------------------------*/

/*
function InitSinglePromiseJQuery() {

    const AsyncStatus = {
        NotPerformed: 1,
        Pending: 2,
        Failure: 3,
        Success: 4
    };

    let isResolved = false;
    let isPending = false;
    let GlobalResult = {};
    let deferred = null;
    let promise = null;

    function ensureAllResolved(func) {
        if (isPending && deferred) return promise;
        if (isResolved) return deferred.resolve({status: AsyncStatus.Success, result: GlobalResult});
        deferred = $.Deferred();
        isPending = true;
        func().then(
            result => {
                isResolved = true;
                isPending = false;
                GlobalResult = result;
                deferred.resolve({status: AsyncStatus.Success, result});
            },
            result => {
                isResolved = false;
                isPending = false;
                deferred.reject({status: AsyncStatus.Failure, result});
            }
        );
        promise = deferred.promise();
        return promise;
    }

    function getData(...args) {
        const deferred = $.Deferred();

        setTimeout(() => {
            getRandom(0, 1)
                ? deferred.resolve(`Resolved in ${args} ms`)
                : deferred.reject(`Rejected in ${args} ms`);
        }, getRandom(500, 1500));
        return deferred.promise();
    }

    function getDataAndDoSomething() {
        const outerDeferred = $.Deferred();
        getData(1, 2, 3).then(result => {
            console.log('Effective SINGLE JQUERY Promise job is done');
            outerDeferred.resolve(result);
        }, outerDeferred.reject);

        return outerDeferred.promise();
    }

    document.querySelector('#single').addEventListener('click', function () {
        ensureAllResolved(getDataAndDoSomething)
            .done(console.log);
    });
}*/
