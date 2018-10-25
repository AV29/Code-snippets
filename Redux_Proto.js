//counter reducer
var counter = function (state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};
var render = function () {
    console.log('render fired');
    document.getElementById('root').innerText = store.getState();
};
var createStore = function (reducer) {
    var state;
    var listeners = [];
    var getState = function () { return state; };
    var dispatch = function (action) {
        state = reducer(state, action);
        listeners.forEach(function (listener) { return listener(); });
    };
    var subscribe = function (listener) {
        listeners.push(listener);
        return function () {
            console.log('Unsubscribing');
            listeners = listeners.filter(function (l) { return l !== listener; });
        };
    };
    dispatch({});
    return { getState: getState, dispatch: dispatch, subscribe: subscribe };
};
var store = createStore(counter);
var subscriber = store.subscribe(render);
render();
document.addEventListener('click', function () {
    console.log('dispatch fired');
    store.dispatch({ type: 'INCREMENT' });
});
document.getElementById('unsubscribe').addEventListener('click', function () {
    subscriber();
});
