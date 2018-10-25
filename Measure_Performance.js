/**
 * @name measurePerformance
 * A wrapper to measure time spent for function execution
 * @example measurePerformance(1000, calculateSomethingBig, param_1, param_2, ..., param_N)
 */
function measurePerformance(times, func) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var result;
    var start = performance.now();
    for (var i = 0; i < times; i++) {
        result = func.apply(void 0, args);
    }
    return (performance.now() - start).toFixed(2);
}
