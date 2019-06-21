function* generator() {
    yield 1;
    yield 2;
    yield 3;
}

function* generator1() {
    yield 1;
    yield 2;
    return 3;
}

function* generator2() {
    var one = yield;

    console.log(one);
    var two = yield;

    console.log(one);
    var three = yield;

    console.log(one);
    console.log(one + two + three);
    return one + two + three;
}

function makeAjaxCall(url, callback) {
    setTimeout(() => {
        callback(url);
    }, 500)
}

function request(url) {
    makeAjaxCall(url, function (response) {
        executor.next(response);
    });
}

function* asyncGenerator() {
    var result1 = yield request('blablalba');

    var data = JSON.parse(result1);
    var result2 = yield request(`blabla:${data.id}`);

    var resp = JSON.parse(result2);

    console.log(`The result is ${resp.value}`);
}

var executor = asyncGenerator();
executor.next();