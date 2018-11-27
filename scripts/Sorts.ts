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


function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function quicksort1() {

    function partition(arr, left, right, pivot = right) {
        let pivotValue = arr[pivot],
            partitionIndex = left;

        for (let i = left; i < pivot; i++) {
            if (arr[i] < pivotValue) {
                swap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }
        swap(arr, pivot, partitionIndex);
        return partitionIndex;
    }

    function quickSort(arr, left = 0, right = arr.length - 1) {
        if (left < right) {
            let partitionIndex = partition(arr, left, right);

            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
        }
        return arr;
    }

    window['quickSort'] = quickSort;
    window['partition'] = partition;
}


function quicksort2() {

    function partition(arr, left, right) {

        let pivot = arr[Math.floor((right + left) / 2)],
            i = left,
            j = right;

        while (i <= j) {
            while (arr[i] < pivot) {
                i++;
            }
            while (arr[j] > pivot) {
                j--;
            }
            if (i <= j) {
                swap(arr, i, j);
                i++;
                j--;
            }
        }

        return i;
    }

    function quickSort(items, left = 0, right = items.length - 1) {
        let index;
        if (items.length > 1) {
            index = partition(items, left, right);
            if (left < index - 1) {
                quickSort(items, left, index - 1);
            }
            if (index < right) {
                quickSort(items, index, right);
            }
        }
        return items;
    }


    window['quickSort'] = quickSort;
    window['partition'] = partition;
}

function quicksort3() {

    function partition(array, left, right) {
        let pivot = Math.floor((right + left) / 2);
        let i = left,
            j = right;

        while (i < j) {
            while (array[i] < array[pivot]) i++;
            while (array[j] > array[pivot]) j--;
            if (i < j) {
                //swap(array, i, j);
                array[i] !== array[j] ? swap(array, i, j) : j--;
            }
        }
        return j;
    }

    function quickSort(array, left = 0, right = array.length - 1) {
        if (array.length > 1) {
            const index = partition(array, left, right);
            if (index > left + 1) {
                quickSort(array, left, index - 1);
            }
            if (index < right - 1) {
                quickSort(array, index + 1, right);
            }
        }
    }

    window['partition'] = partition;
    window['quickSort'] = quickSort;
}

function quicksort4() {
    function partition(arr, left, right) {
        let pivot = arr[right];
        let i = left - 1;
        for (let j = left; j <= right - 1; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, right);
        return i + 1;
    }

    function quickSort(arr, left = 0, right = arr.length - 1) {
        if (left < right) {
            let index = partition(arr, left, right);
            quickSort(arr, left, index - 1);
            quickSort(arr, index + 1, right);
        }

        return arr;
    }

    window['partition'] = partition;
    window['quickSort'] = quickSort;
}


