/**
 * @name memoize
 * a simple implementation of memoization concept
 * @example
 * Lets create a function that executes for a long time
 * const test = number => {for (let i = 0, j = 0; i < number; i++) j++;};
 *
 * Now let's create a wrapper-memoizer
 * const memoized = memoize(test);
 *
 * Now we can call our function once:
 * memoized(10000000);
 * ...and twice
 * memoized(10000000);
 *
 * If argument didn't change precalculated result would return
 */
function memoize(func) {
    var cache = {};
    return function (param) {
        if (cache.hasOwnProperty(param)) {
            return cache[param];
        }
        else {
            cache[param] = func(param);
        }
    };
}
