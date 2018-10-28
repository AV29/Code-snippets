/**
 * @name throttle.
 * A throttle function wrapper. Passed function wont be called more often than ms time
 * @example
 * const throttled = throttle(console.log, 1000);
 * throttled(1);
 * throttled(2);
 * throttled(3);
 *
 * second call will be rejected
 */
function throttle(func: Function, ms: number): Function {

    let isThrottled = false,
        args = null,
        context = null;

    function wrapper(): void {

        if (isThrottled) {
            args = arguments;
            context = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function () {
            isThrottled = false;
            if (args) {
                wrapper.apply(context, args);
                args = context = null;
            }
        }, ms);
    }

    return wrapper;
}