/**
 * @name compose
 * A composer for middleware functions to be applied later. Last passed function takes unlimited arguments
 * This is an analog for:
 * const compose = function (f1, f2, f3, ... fN) {
        return function(x) {
           return f1(f2(f3(...fN(arg_1, arg_2, ...arg_N))));
        }
    }
 * @example
 * const sqrtX = x => Math.sqrt(x);
 * const powX = x => x * x;
 * const base = (x, y, z) => x + y + z;
 *
 * const composed = compose(powX, sqrtX, sqrtX, powX, base);
 *
 * composed(1, 2, 3)
 */

const compose = function (...funcs: Array<Function>): Function {
    if (!funcs.length) {
        return arg => arg;
    }
    const last: Function = funcs[funcs.length - 1];
    const rest = funcs.slice(0, -1);
    return (...args: any[]) => rest.reduceRight((composed, f) => f(composed), last(...args));
};