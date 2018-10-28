
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

delay(1000).then(() =>  createPromise().then(firstThen).then(secondThen).then(console.log).catch(outerCatch));