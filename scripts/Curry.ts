// const fn = (a, b, c, d, e) => a + b + c + d + e;

// var f = fn.curry(1, 2, 3); ... f(4, 5);

// var f = fn.curry(1); ... f(2, 3, 4, 5);

// var f = fn.curry(1); ... f(2)(3)(4)(5);

interface Function {
    curry(params: any): Function
}

Function.prototype.curry = function(...args) {
    return args.length < this.length
        ? (...nextArgs) => this.curry(...args, ...nextArgs)
        : this(...args)
};
