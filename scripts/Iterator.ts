interface IteratorResult<T> {
    done: boolean;
    value: T;
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
    from?: any,
    to?: any,
    [Symbol.iterator](): Iterator<T>
}

function range(from: number, to: number): Iterable<number> {
    return {
        from,
        to,
        [Symbol.iterator](): Iterator<number> {
            let current: number = this.from;
            let last: number = this.to;

            return {
                next(): IteratorResult<number> {
                    return current <= last
                        ? {done: false, value: current++}
                        : {done: true, value: undefined}
                }
            }
        }
    };
}

for (let num of range(4, 9)) {
    console.log(num);
}