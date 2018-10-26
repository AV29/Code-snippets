const compose = function (...funcs: Array<Function>): Function {
    if (!funcs.length) {
        return arg => arg;
    }
    const last: Function = funcs[funcs.length - 1];
    const rest = funcs.slice(0, -1);
    return (...args: any[]) => rest.reduceRight((composed, f) => f(composed), last(...args));
};

const log = color => (...args) => {
    const first = args[0];
    const rest = args.slice(1);
    console.log(`%c${first}`, `color: ${color}`, ...rest);
};

const chalkLog = {
    success: log('#00ff00'),
    failure: log('#ff0000'),
    processing: log('#0000ff')
};

const sqrtX = x => (chalkLog.failure('x ->', x), Math.sqrt(x));

const powX = x => (chalkLog.processing('x ->', x), x * x);

const base = (x, y, z) => (chalkLog.success('last function arguments ->', x, y, z), x + y + z);

const middlewares = [powX, sqrtX, sqrtX, powX, powX, powX, sqrtX, sqrtX, powX, powX, base];

// const compose = function (a, b, c, d, e) {
//     return function(x) {
//         return a(b(c(d(e(x, v,b)))));
//     }
//}

const applied = compose(...middlewares);

console.log(applied(1, 2, 3));
