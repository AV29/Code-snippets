const range = function (from, to) {
    return {
        from,
        to,
        [Symbol.iterator]: function () {
            let current = this.from;
            let last = this.to;

            return {
                next: () => current <= last
                    ? {done: false, value: current++}
                    : {done: true, value: undefined}
            }
        }
    };
};

for (let num of range(4, 9)) {
    console.log(num);
}