type sortPredicate = (a: number, b:number) => number

interface Array<T> {
    qSort: () => Array<T>,
    bubbleSort: (Function?: sortPredicate) => Array<T>
}

//const testArray = (new Array(1000)).fill(0).map(() => getRandom(1, 100));

Array.prototype.qSort = function quickSort() {
    if (!this.length) return [];
    const [head, ...tail] = this;
    const bigger = [];
    const smaller = [];
    tail.forEach(el => el > head ? bigger.push(el) : smaller.push(el));
    return smaller.qSort().concat(head).concat(bigger.qSort());
};

Array.prototype.bubbleSort = function bubbleSort(predicate = (a, b) => a - b) {
    let temp;
    for (let i = 0; i < this.length - 1; i++) {
        for (let j = i + 1; j < this.length; j++) {
            if (predicate(this[i], this[j]) > 0) {
                temp = this[i];
                this[i] = this[j];
                this[j] = temp;
            }
        }
    }
    return this;
};