type sortPredicate = (a: number, b: number) => number

interface Array<T> {
    qSort: () => Array<T>,
    qSort1: () => Array<T>,
    bubbleSort: (Function?: sortPredicate) => Array<T>
}

Array.prototype.qSort = function quickSort() {
    if (this.length <= 1) return this;
    const [pin, ...tail] = this;
    return [...tail.filter(v => v < pin).qSort(), pin, ...tail.filter(v => v >= pin).qSort()];
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

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (arr.length) {
        let pivot = arr[Math.floor((right + left) / 2)];
        let i = left;
        let j = right;
        let temp;
        while (i <= j) {

            while (arr[i] < pivot) {
                i++;
            }
            while (arr[j] > pivot) {
                j--;
            }

            if (i <= j) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                i++;
                j--;
            }
        }

        if (left < i - 1) {
            quickSort(arr, left, i - 1);
        }
        if (i < right) {
            quickSort(arr, i, right);
        }
    }
    return arr;
}


