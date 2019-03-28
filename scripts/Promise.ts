const delay = time => new Promise(res => setTimeout(() => {
    console.log('Ready!');
    res();
}, time));

const createPromise = () => new Promise((res, rej) => {
    setTimeout(() => res("OK"), 1000);
    setTimeout(() => rej("ERROR"), 4000);
});

function firstThen(data) {
    console.log(data);
    const promise2 = new Promise((res, rej) => {
        setTimeout(() => res("OK"), 2000);
        setTimeout(() => rej("ERROR in first then"), 1000);

    });
    return promise2;//.catch(innerFirstCatch);
}

function innerFirstCatch(data) {
    console.log(data);
    return "From the first inner catch"
}

function innerSecondCatch(data) {
    console.log(data);
    return "From the second inner catch"
}

function secondThen(data) {
    console.log(data);
    console.log('In second THEN');
    const promise2 = new Promise((res, rej) => {
        setTimeout(() => res("OK"), 2000);
        setTimeout(() => rej("ERROR in second then"), 1000);

    });
    return promise2;//.catch(innerSecondCatch);
}

function outerCatch(data) {
    console.log(data);
    console.log("In OUTER CATCH");
}

function getDemoAction() {
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

/* Function chained promises Action */
function chainedPromicesDemo() {
    function createPromise(ms) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(ms), ms);
        });
    }

    let start = performance.now();

    return createPromise(1000)
        .then(resultMS => createPromise(resultMS))
        .then(resultMS => {
            console.log('Intermediate result: ', resultMS);
            return createPromise(resultMS)
        })
        .then(resultMS => createPromise(resultMS))
        .then(result => console.log('Last Result', result, ' time elapsed ', performance.now() - start));
}

/* Async task example */
function asyncTaskExample() {
    console.log('top console.log');

    setTimeout(() => console.log('setTimeout'), 3);

    new Promise((resolve) => {
        setTimeout(resolve, 1);
    })
        .then(() => console.log('then'))
        .catch(() => console.log('catch'));
        //.finally(() => console.log('finally'));

    console.log('bottom console.log');
}