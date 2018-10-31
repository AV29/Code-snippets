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
    [Symbol.iterator](): Iterator<T>
}

interface IRange<T> extends Iterable<T> {
    length: T,
    from: T,
    to: T,
}

function range(from: number, to: number): IRange<number> {
    return {
        length: to - from + 1,
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

const r = range(4, 9);

for (let num of r) {
    console.log(num);
}

console.log(Math.max(...r));