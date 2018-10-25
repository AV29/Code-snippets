//counter reducer
const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const render = () => {
    console.log('render fired');
    document.getElementById('root').innerText = store.getState();
};

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            console.log('Unsubscribing');
            listeners = listeners.filter(l => l !== listener);
        }
    };

    dispatch({});

    return {getState, dispatch, subscribe};
};

const store = createStore(counter);

const subscriber = store.subscribe(render);
render();

document.addEventListener('click', () => {
    console.log('dispatch fired');
    store.dispatch({type: 'INCREMENT'});
});

document.getElementById('unsubscribe').addEventListener('click', () => {
    subscriber();
});