/**
 * @name measurePerformance
 * A wrapper to measure time spent for function execution
 * @example measurePerformance(1000, calculateSomethingBig, param_1, param_2, ..., param_N)
 * First parameter can be omitted, then function is called 1 time.
 * @example measurePerformance(calculateSomethingBig, param_1, param_2, ..., param_N)
 */
function measurePerformance({func, times = 1, context = this, args = [], maxDisplayArgs = 4}) {
    let result;
    const start = performance.now();
    for (let i = 0; i < times; i++) {
        result = func.apply(context, args);
    }
    const end = performance.now() - start;
    console.group(`${func.name}(${args.length > maxDisplayArgs ? args.slice(maxDisplayArgs).join(', ') + '...' : args}) x ${times} times`);
    console.log("Result", result);
    console.log(`Time: ${parseFloat(end.toFixed(2))} ms`);
    console.groupEnd();
    return result;
}