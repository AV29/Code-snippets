/**
 * @name measurePerformance
 * A wrapper to measure time spent for function execution
 * @example measurePerformance(1000, calculateSomethingBig, param_1, param_2, ..., param_N)
 */
function measurePerformance(times, func, ...args) {
    let result;
    const start = performance.now();
    for (let i = 0; i < times; i++) {
        result = func(...args);
    }
    return (performance.now() - start).toFixed(2);
}
