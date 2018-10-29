/**
 * @name makeCounter
 * Creates a counter with useful methods
 * @example
 * const count = makeCounter();
 * count();
 * count.set(2);
 * counter.get();
 * counter.reset();
 */
interface IMakeCounter {
    (): number;
    set(value: number): void;
    get(): number;
    reset(): void;
}

function makeCounter() {
    let currentCounter = 1;

    const counter = <IMakeCounter>((): number => {
        return currentCounter++;
    });

    counter.set = function (value) {
        currentCounter = value;
    };
    counter.reset = function () {
        currentCounter = 1;
    };
    counter.get = function () {
        return currentCounter;
    };

    return counter;
}

/**
 * @name sum
 * Sums two values using closure.
 * @example
 * sum(1)(2);
 */
function sum(a) {
    return function (b) {
        return a + b;
    }
}

/**
 * @name makeBuffer
 * Creates a function-buffer to work with text.
 * @example
 * const buffer = makeBuffer();
 * buffer("text");
 * buffer(" more text");
 * buffer.clear();
 */
function makeBuffer(): Function {
    let text = "";

    function buffer(piece: string): void {
        text += piece;
    }

    function showText(): string {
        return text;
    }

    buffer["clear"] = function () {
        text = "";
    };
    return buffer;
}

/**
 * @name filter
 * An analog of Array.prototype.filter.
 * @example
 * Creating predicates:
 * const inBetween = (a, b)  => el => (el >= a && el <= b);
 * const inArray = mas => el => ~mas.indexOf(el);
 * const isEven = el => el % 2 === 0;
 *
 * filter([1, 2, 3, 4, 5, 6, 7], isEven);
 * filter([1, 2, 3, 4, 5, 6, 7], inBetween(3, 6));
 * filter([1, 2, 3, 4, 5, 6, 7], inArray([1, 2, 10]));
 */
function filter(arr: any[], func: Function) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i])) result.push(arr[i]);
    }
    return result;
}


/**
 * @name makeArmy.
 * A good example of how closure could play an unexpected role. Output 10 and 10
 * Commented code answers on how to get printed 0 and 5 respectively
 * @example
 * const army = makeArmy();
 * army[0]();
 * army[5]();
 */
function makeArmy() {
    const shooters = [];
    // because of var - i is declared here = undefined and thus stored in upper closure
    // By the end of cycle i = 10; Inner functions take i from closure, where it is 10.
    for (let i = 0; i < 10; i++) {  // 1) We can use "let" instead of "var" - thus use inner scope for index
        //function(i) {  // 2) Another way is to add here additional closure to store actual index value
        const shooter = function () {
            console.log(i);
        };
        shooters.push(shooter);
        //}(i);
    }
    return shooters;
}


/**
 * @name calcWithReduce
 *
 * Reducer function: (prev, c) => prev + c;
 * @example calcWithReduce(1)(2)(3)(4)(reducer)
 */
function calcWithReduce(firstArg) {
    const store = [firstArg];
    const next = function (arg) {
        if (typeof arg !== 'function') {
            store.push(arg);
            return next;
        } else {
            return store.reduce(arg);
        }
    };
    return next;
}

/**
 * @name calcUnlimited
 * @example calcUnlimited(1)(2)(3)(4)(67)(12)...(N)
 */
function calcUnlimited(firstArg) {
    let result = firstArg;
    const next = function (nextArg) {
        result += nextArg;
        return next;
    };

    next.toString = function () {
        return result;
    };

    return next;
}