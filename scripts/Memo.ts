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
function memoize(func: Function): Function {
    const cache: Object = {};
    return function (...args: any[]): any {
        const key = args[0];
        const cashedArgs: any = cache.hasOwnProperty(key) && cache[key].args;
        if (!cashedArgs || cashedArgs.length !== args.length || cashedArgs.some((arg, i) => arg !== args[i])) {
            cache[key] = {
                args: [...args],
                result: func(...args)
            };
        }
        return cache[key].result;
    }
}