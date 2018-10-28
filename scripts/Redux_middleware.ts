/** ---------------------------  1  ---------------------------

 let action = addTodo('Use Redux');

 console.log('dispatching', action);
 store.dispatch(action);
 console.log('next state', store.getState());

 */

/** ---------------------------  2  ---------------------------

 function dispatchAndLog(store, action) {
    console.log('dispatching', action);
    store.dispatch(action);
    console.log('next state', store.getState())
 }

 dispatchAndLog(store, addTodo('Use Redux'));

 */

/** ---------------------------  3  ---------------------------

 let next = store.dispatch;
 store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result
 };

 */

/** ---------------------------  4  ---------------------------

 function patchStoreToAddLogging(store) {
    let next = store.dispatch;
    store.dispatch = function dispatchAndLog(action) {
        console.log('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        return result
    }
 }

 function patchStoreToAddCrashReporting(store) {
    let next = store.dispatch;
    store.dispatch = function dispatchAndReportErrors(action) {
        try {
            return next(action)
        } catch (err) {
            console.error('Caught an exception!', err);
            Raven.captureException(err, {
                extra: {
                    action,
                    state: store.getState()
                }
            });
            throw err
        }
    }
 }

 patchStoreToAddLogging(store);
 patchStoreToAddCrashReporting(store);

 */

/** ---------------------------  5  ---------------------------

 function logger(store) {
    let next = store.dispatch;

    // Previously:
    // store.dispatch = function dispatchAndLog(action) {

    return function dispatchAndLog(action) {
        console.log('dispatching', action);
        let result = next(action);
        console.log('next state', store.getState());
        return result
    }
 }

 function applyMiddleware(store, middlewares) {
    middlewares = middlewares.slice();
    middlewares.reverse();

    // Transform dispatch function with each middleware.
    middlewares.forEach(middleware =>
        store.dispatch = middleware(store)
    )
 }

 applyMiddleware(store, [logger, crashReporter]);

 */

/** ---------------------------  6  ---------------------------

 function logger(store) {
    return function wrapDispatchToAddLogging(next) {
        return function dispatchAndLog(action) {
            console.log('dispatching', action);
            let result = next(action);
            console.log('next state', store.getState());
            return result
        }
    }
 }

 const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err);
        Raven.captureException(err, {
            extra: {
                action,
                state: store.getState()
            }
        });
        throw err
    }
 };

 function applyMiddleware(store, middlewares) {
    middlewares = middlewares.slice();
    middlewares.reverse();
    let dispatch = store.dispatch;
    middlewares.forEach(middleware =>
        dispatch = middleware(store)(dispatch)
    );
    return Object.assign({}, store, {dispatch})
 }

 applyMiddleware(store, [logger, crashReporter]);

 */