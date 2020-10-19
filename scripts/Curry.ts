// var f = curry(fn, 1, 2, 3); ... f(4, 5);

// var f = curry(fn, 1); ... f(2, 3, 4, 5);

// var f = curry(fn, 1); ... f(2)(3)(4)(5);

interface Function {
    curry(params: any): Function
}

Function.prototype.curry = function(...args) {
    return args.length >= this.length
        ? this(...args)
        : (...nextArgs) => this.curry(...args, ...nextArgs)
};


const sumX = (current) => {

    const next = nextArg => {
        return sumX(current + nextArg);
    };

    next.toString = () => current;

    return next;

};