
Object.prototype['antonsEach'] = function (func) {
    for (let prop in this) {
        if (this.hasOwnProperty(prop)) {
            const value = this[prop];
            func.call(this, prop, value);
        }
    }
};

Function.prototype['deferCall'] = function (time) {
    const func = this;
    return function (...args) {
        setTimeout(() => {
            func.apply(this, args);
        }, time)
    };
};