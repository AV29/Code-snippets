/**
 * @name measurePerformance
 * A wrapper to measure time spent for function execution
 * @example measurePerformance(1000, calculateSomethingBig, param_1, param_2, ..., param_N)
 * First parameter can be omitted, then function is called 1 time.
 * @example measurePerformance(calculateSomethingBig, param_1, param_2, ..., param_N)
 */
function measurePerformance(...args): void {
    let result;
    const isTimesOmitted = typeof args[0] === 'function';
    const times = isTimesOmitted ? 1 : args[0];
    const func = isTimesOmitted ? args[0] : args[1];
    const start = performance.now();
    for (let i = 0; i < times; i++) {
        result = func(...args.slice(isTimesOmitted ? 1 : 2))
    }
    const end = performance.now() - start;
    console.group(func.name);
    console.log("Result", result);
    console.log(`Time: ${parseFloat(end.toFixed(2))} ms`);
    console.groupEnd();
}